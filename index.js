// import puppeteer from "puppeteer-extra";
// import StealthPlugin from "puppeteer-extra-plugin-stealth";

import * as cheerio from "cheerio";
import { getMangaList, saveToJsonFile } from "./file.js";
import { avoidUnneccessaryResources, connectBrowser, navigateToPage } from "./browser.js";
import { extractNumber, handleCommentText, sleep } from "./utils.js";
// Use stealth plugin to bypass detection
// puppeteer.use(StealthPlugin());

const url = "https://truyenqqto.com/truyen-moi-cap-nhat/trang-1.html?";

const DOMAIN = "https://truyenqqto.com";
const CRAW_PAGE = 3;

function getMangaPage(index = 1) {
  return `${DOMAIN}/truyen-moi-cap-nhat/trang-${index}.html?`;
}

function* getNextPageUrl() {
  let index = 1;
  while (true) {
    if (index > CRAW_PAGE) return null;
    console.log("GO TO PAGE", index);
    yield getMangaPage(index++);
  }
}

let mangaList = [];
function addMangaToList({ url, name, view, follow, types, lastChapter }) {
  mangaList.push({ url, name, view, follow, types, lastChapter });
}

/**
 * @param {import("puppeteer-real-browser").PageWithCursor} page - The ID of the book.
 */
async function crawManagaList(page) {
  const gen = getNextPageUrl();

  for (let nextUrl = gen.next().value; nextUrl; nextUrl = gen.next().value) {
    await navigateToPage(page, nextUrl);
    const pageContent = await page.content();
    collectManagasOnPage(pageContent);
    console.log(mangaList.length);
  }
}

function getTotalPage(str) {
  if (!str) return 1;
  const match = str.match(/loadComment\((\d+)\)/);
  return match ? parseInt(match[1], 10) : null;
}

/**
 * @param {import("puppeteer-real-browser").PageWithCursor} page - The ID of the book.
 */
async function crawManagaComment(page, { url }) {
  try {
    await navigateToPage(page, url);

    const pageContent = await page.content();
    const $ = cheerio.load(pageContent);
    const totalPage = getTotalPage($(".page_redirect [onclick]").last().attr("onclick"));

    const comments = await page.evaluate(
      async ({ totalPage }) => {
        const comments = [];
        const urlCommentLoad = `https://truyenqqto.com/frontend/comment/list`;

        function getCommentId(str) {
          const match = str.match(/loadReply\((\d+)\)/);
          return match ? parseInt(match[1], 10) : null;
        }

        async function getComment(html) {
          const itemComments = $(html).find(".item-comment").toArray();

          const comments = [];
          for (let itemComment of itemComments) {
            let comment = handleCommentText($(itemComment).find(".content-comment").text());

            if (!comment) continue;

            const haveReply = $(itemComment).find(".text-list-reply").length > 0;
            if (haveReply) {
              const commentId = getCommentId($(itemComment).find(".text-list-reply a").attr("href"));

              const repliedComments = await loadReply(commentId);

              if (repliedComments.length > 0) {
                comment += `\n\t${repliedComments.join("\n")}`;
              }
            }

            comments.push(comment);
          }

          return comments;
        }
        //from truyenqqto
        async function loadComment(page) {
          console.log("loadComment", page);
          var book_id = $("#book_id").val();
          var episode_id = $("#episode_id").val();
          var team_id = $("#team_id").val();

          return new Promise((resolve) => {
            $.ajax({
              method: "POST",
              url: urlCommentLoad,
              data: { book_id: book_id, parent_id: 0, page: page, episode_id: episode_id, team_id: team_id },
            }).done(async function (html) {
              resolve(await getComment(html));
            });
          });
        }

        async function loadReply(id) {
          console.log("loadReply", id);
          var book_id = $("#book_id").val();
          var team_id = $("#team_id").val();
          return new Promise((resolve) => {
            $.ajax({
              method: "POST",
              url: urlCommentLoad,
              data: { book_id: book_id, parent_id: id, team_id: team_id },
            }).done(async function (html) {
              resolve(await getComment(html));
            });
          });
        }

        const BATCH_SIZE = 10;

        for (let i = 1; i <= totalPage; i += BATCH_SIZE) {
          const batch = [];

          for (let j = i; j < i + BATCH_SIZE && j <= totalPage; j++) {
            batch.push(loadComment(j));
          }

          const results = await Promise.all(batch);

          for (const commentHtmls of results) {
            if (commentHtmls.length === 0) {
              return comments; // Stop loading more pages if empty
            }

            console.log(commentHtmls);
            comments.push(...commentHtmls);
          }
        }

        // for (let i = 1; i <= totalPage; i++) {
        //   const commentHtmls = await loadComment(i);

        //   if (commentHtmls.length === 0) {
        //     break;
        //   }

        //   console.log(commentHtmls);
        //   comments.push(...commentHtmls);
        // }

        return [...new Set(comments)];
      },
      { totalPage }
    );
    return comments;
  } catch (error) {
    // console.log(error);
    console.trace("Retry:", error);
    return crawManagaComment(page, { url });
  }
}

function collectManagasOnPage(pageContent) {
  const $ = cheerio.load(pageContent);

  $(".list_grid.grid li").each((index, element) => {
    try {
      const mangaHref = $(element).find(".book_info .book_name a").attr("href");
      const mangaName = $(element).find(".book_info .book_name a").attr("title");
      const lastChapter = extractNumber($(element).find(".book_info .last_chapter").text().trim());

      const [, view, follow] = $(element)
        .find(".book_info .more-info .info")
        .toArray()
        .map((info) => extractNumber($(info).text()));

      const types = $(element)
        .find(".book_info .more-info .list-tags")
        .children()
        .toArray()
        .map((tag) => $(tag).text());

      // console.log(mangaName, view);
      addMangaToList({
        url: mangaHref,
        name: mangaName,
        types,
        view,
        follow,
        lastChapter,
      });
    } catch (error) {
      console.error(error);
    }
  });
}

async function scrapeTitle() {
  const { browser, page } = await connectBrowser();

  console.time("scrape Manga");

  // mangaList = await getMangaList();

  // console.log(mangaList?.length);
  // if (!mangaList) {
  //   console.log("No manga list found");
  //   mangaList = [];
  // }

  if (mangaList.length === 0) {
    await crawManagaList(page);
  }

  console.timeEnd("scrape Manga");

  console.time("scrape Manga Comment");

  const pages = [page, await browser.newPage(), await browser.newPage(), await browser.newPage(), await browser.newPage()];

  for (const page of pages) {
    await page.setRequestInterception(true);

    page.on("request", (req) => {
      const url = req.url();
      if (
        url.includes("ads") ||
        url.includes("doubleclick") ||
        url.includes("googlesyndication") ||
        url.includes("taboola") ||
        url.includes("facebook") // iframes quảng cáo
      ) {
        req.abort();
      } else {
        req.continue();
      }
    });
  }
  const pageCount = pages.length;

  // Tạo mảng con: mỗi page nhận manga theo index phân phối
  const mangaGroups = Array.from({ length: pageCount }, () => []);

  for (let i = 0; i < mangaList.length; i++) {
    const groupIndex = i % pageCount;
    mangaGroups[groupIndex].push({ ...mangaList[i], index: i }); // lưu index nếu cần gán lại
  }

  await Promise.all(
    mangaGroups.map((group, groupIndex) =>
      (async () => {
        const page = pages[groupIndex];
        for (const manga of group) {
          console.log(`Page ${groupIndex} craw comment`, manga.index, manga.name);
          const comments = await crawManagaComment(page, {
            url: DOMAIN + manga.url,
          });
          console.log(`Page ${groupIndex} crawed comment`, manga.name, comments.length);
          mangaList[manga.index].comments = comments; // gán đúng chỗ
        }
      })()
    )
  );

  saveToJsonFile(mangaList);

  console.timeEnd("scrape Manga Comment");

  return "Done";
}

scrapeTitle(url).then(console.log);

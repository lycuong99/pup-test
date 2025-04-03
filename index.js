// import puppeteer from "puppeteer";
import axios from "axios";
import antibotbrowser from "antibotbrowser";

import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { connect } from "puppeteer-real-browser";
import { writeFile } from "fs/promises";
import * as cheerio from "cheerio";
// Use stealth plugin to bypass detection
puppeteer.use(StealthPlugin());

const url = "https://truyenqqto.com/truyen-moi-cap-nhat/trang-1.html?";

const DOMAIN = "https://truyenqqto.com";

function getMangaPage(index = 1) {
  return `${DOMAIN}/truyen-moi-cap-nhat/trang-${index}.html?`;
}

function* getNextPageUrl() {
  let index = 1;
  while (true) {
    if (index > 20) return null;
    console.log("GO TO PAGE", index);
    yield getMangaPage(index++);
  }
}

async function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

const mangaList = [];
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

/**
 * @param {import("puppeteer-real-browser").PageWithCursor} page - The ID of the book.
 */
async function crawManagaComment(page, { url }) {
  await navigateToPage(page, DOMAIN + url);
  const pageContent = await page.content(); 
}

async function navigateToPage(page, url) {
  await page.goto(url, { waitUntil: "domcontentloaded" });
  const title = await page.title();
  console.log(title);

  if (title.includes("moment")) {
    console.log("Waiting for Cloudflare challenge to complete...");
    await sleep(2000);
    await page.waitForNavigation({ timeout: 25000, waitUntil: "domcontentloaded" });
  }
}

function collectManagasOnPage(pageContent) {
  const $ = cheerio.load(pageContent);

  $(".list_grid.grid li").each((index, element) => {
    try {
      const mangaHref = $(element).find(".book_info .book_name a").attr("href");
      const mangaName = $(element).find(".book_info .book_name a").attr("title");
      const lastChapter = $(element).find(".book_info .last_chapter").text().trim();
      const [, view, follow] = $(element)
        .find(".book_info .more-info .info")
        .toArray()
        .map((info) => $(info).text());
      // const follow = moreInfos[4];
      // const view = moreInfos[3];
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

function saveToJsonFile(data) {
  writeFile("mangaList.json", JSON.stringify(data, null, 2), "utf-8").then(() => {
    console.log("Saved to mangaList.json");
  });
}

async function scrapeTitle() {
  // const antibrowser = await antibotbrowser.startbrowser(9222);
  // const browser = await puppeteer.connect({browserWSEndpoint: antibrowser.websokcet});

  // const browser = await puppeteer.launch();
  // const page = await browser.newPage();
  const { browser, page } = await connect({
    headless: false,

    args: [],

    customConfig: {},

    turnstile: true,

    connectOption: {},

    disableXvfb: false,
    ignoreAllFlags: false,
    plugins: [(await import("puppeteer-extra-plugin-click-and-wait")).default()], // proxy:{
    //     host:'<proxy-host>',
    //     port:'<proxy-port>',
    //     username:'<proxy-username>',
    //     password:'<proxy-password>'
    // }
  });

  // Fake User-Agent
  await page.setUserAgent(
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
  );

  // Fake Headers
  await page.setExtraHTTPHeaders({
    "Accept-Language": "en-US,en;q=0.9",
    Referer: "https://www.google.com/",
  });

  crawManagaList(page);

  saveToJsonFile(mangaList);

  return "Done";
}
scrapeTitle(url).then(console.log);

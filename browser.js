import { connect } from "puppeteer-real-browser";
import { sleep } from "./utils.js";

export async function connectBrowser() {
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

  return { browser, page };
}

const pageQueue = [];
let isRunning = false;

async function handleQueue() {
  try {
    while (pageQueue.length > 0) {
      const { page, callback } = pageQueue.shift();
      await page.bringToFront();
      await callback();
    }
  } catch (error) {
    console.trace(error);
  }
}
async function bringPageToFront(page, callback) {
  pageQueue.push({
    page,
    callback,
  });

  if (!isRunning) {
    isRunning = true;
    await handleQueue();
    isRunning = false;
  }
}

export async function navigateToPage(page, url) {
  return new Promise(async (resolve, reject) => {
    try {
      await page.goto(url, { waitUntil: "domcontentloaded" });
      let title = await page.title();
      console.log(title);
      while (title.includes("moment")) {
        try {
          console.log("Waiting for Cloudflare challenge to complete...");
          //   await sleep(2000);
          await page.waitForNavigation({ timeout: 5000, waitUntil: "domcontentloaded" });
          title = await page.title();
          console.log("Cloudflare challenge completed", title);
        } catch (error) {
          bringPageToFront(page, async () => {
            console.log("bringPageToFront challenge completed");
            // await sleep(2000);
            await page.waitForNavigation({ timeout: 5000, waitUntil: "domcontentloaded" });
            resolve();
          });
        }
      }
      resolve();
    } catch (error) {
      console.error("navigateToPage to ", url, error);
    }
  });
}

export async function avoidUnneccessaryResources(page) {
  await page.setRequestInterception(true);
  page.on("request", (req) => {
    const resourceType = req.resourceType();
    if (["image", "stylesheet", "font"].includes(resourceType)) {
      req.abort();
    } else {
      req.continue();
    }
  });
}

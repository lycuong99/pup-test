import { readFileSync } from "fs";
import { writeFile, readFile } from "fs/promises";
// import mangaList from "./mangaList.json" assert { type: "json" };

export function saveToJsonFile(data) {
  writeFile("mangaList.json", JSON.stringify(data, null, 2), "utf-8").then(() => {
    console.log("Saved to mangaList.json");
  });
}

export async function getMangaList() {
  return JSON.parse(readFileSync("mangaList.json", "utf-8"));
}

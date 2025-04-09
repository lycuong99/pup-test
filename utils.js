export async function sleep(duration) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

export function extractNumber(str) {
  const match = str.match(/[\d,]+/); // Tìm chuỗi chứa số và dấu phẩy
  if (!match) return null;
  return parseInt(match[0].replace(/,/g, ""), 10); // Bỏ dấu phẩy rồi parse
}

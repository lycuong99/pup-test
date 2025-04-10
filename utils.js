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

export function handleCommentText(commentText = "") {
  //clean
  commentText = commentText.trim();
  //check <= 1 char
  if (commentText.length <= 1) return null;
  if (commentText.length >= 1200) return null;
  //check all special charactor
  const specialChar = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/;
  if (specialChar.test(commentText)) return null;
  return commentText;
}

export function extractJsonString(input) {
  const firstCurly = input.indexOf("{");
  const firstSquare = input.indexOf("[");
  const start = firstCurly === -1 ? firstSquare : firstSquare === -1 ? firstCurly : Math.min(firstCurly, firstSquare);

  const lastCurly = input.lastIndexOf("}");
  const lastSquare = input.lastIndexOf("]");
  const end = lastCurly === -1 ? lastSquare : lastSquare === -1 ? lastCurly : Math.max(lastCurly, lastSquare);

  if (start === -1 || end === -1 || end <= start) return null;

  return input.slice(start, end + 1);
}

export function cleanSensitiveWords(text) {
  const sensitiveWords = [
    /đụ/i,
    /chịch/i,
    /nứng/i,
    /dâm/i,
    /cc/i,
    /vl/i,
    /vkl/i,
    /loz/i,
    /lồn/i,
    /cak/i,
    /cl/i,
    /đéo/i,
    /cặc/i,
    /má nó/i,
    /sủa/i,
    /phịch/i,
    /fuck/i,
    /shit/i,
    /fap/i,
    /rape/i,
    /xxx/i,
    /tinh trùng/i,
    /dương vật/i,
    /âm đạo/i,
    /cak/i,
    /cc/i,
  ];

  return sensitiveWords.reduce((acc, pattern) => {
    return acc.replace(pattern, "***");
  }, text);
}

export function chunkArray(array, chunkSize) {
  const chunks = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize));
  }
  return chunks;
}

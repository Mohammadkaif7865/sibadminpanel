// utils/youtube.js
export function extractYouTubeId(url) {
  const regExp = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/;
  const match = url.match(regExp);
  return match && match[1] ? match[1] : "";
}
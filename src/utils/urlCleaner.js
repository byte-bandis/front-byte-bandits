export default function urlCleaner(url, splitter = "-") {
  return url.split(splitter).pop();
}

export function trimDate(date = "0000-00-00", outputFormat = "en") {
  const trimmer = new RegExp("^\\d{4}-\\d{2}-\\d{2}");
  const trimmedDateEN = date.match(trimmer)[0];
  const [year, month, day] = trimmedDateEN.split("-");
  const trimmedDateES = `${day}-${month}-${year}`;
  if (outputFormat === "en") {
    return trimmedDateEN;
  } else if (outputFormat === "es") {
    return trimmedDateES;
  } else {
    return date;
  }
}

export function formatDateEnToEs(date) {
  const [year, month, day] = date.split("-");
  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
}

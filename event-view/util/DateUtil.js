// 日付の検索条件を取得するAPI
export function dateKeyFormattedStr(date) {
  return date
    .toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
    .split("/")
    .join("-");
}

// 日付の表示を取得するAPI
export function dateDisplayFormattedStr(date) {
  return date.toLocaleDateString("ja-JP", {
    month: "numeric",
    day: "numeric",
    weekday: "short",
  });
}

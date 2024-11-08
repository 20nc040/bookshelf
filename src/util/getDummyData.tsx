import { fetchBookWithGoogleBooksAPI } from "../net/GoogleAPI";

export const getDummyData = async () => {
  const dummy = [
    // await fetchBookWithGoogleBooksAPI("9784297129163"),
    await fetchBookWithGoogleBooksAPI("9784422311074"),
    // await fetchBookWithGoogleBooksAPI("9784000801317"),
    // await fetchBookWithGoogleBooksAPI("9784641104846"),
    await fetchBookWithGoogleBooksAPI("9784103549512"),
    await fetchBookWithGoogleBooksAPI("9784480020727"),
    await fetchBookWithGoogleBooksAPI("9784088518312"),
    // await fetchBookWithGoogleBooksAPI("406145840X"),
    await fetchBookWithGoogleBooksAPI("9780735811669"),
    await fetchBookWithGoogleBooksAPI("9784781603476"),
  ];
  const res = dummy.filter((book) => book != null);
  return res;
};
//   { id: "1000", isbn: "9784297129163", title: "TypeScriptとReact/Next.jsでつくる実践Webアプリケーション開発", coverPath: "https://ndlsearch.ndl.go.jp/thumbnail/9784297129163.jpg" },
//   { id: "2000", isbn: "9784422311074", title: "世界図書館遺産 : 壮麗なるクラシックライブラリー23選", coverPath: "https://ndlsearch.ndl.go.jp/thumbnail/9784422311074.jpg" },
//   { id: "3000", isbn: "9784000801317", title: "広辞苑第7版", coverPath: "https://ndlsearch.ndl.go.jp/thumbnail/9784000801317.jpg" },
//   { id: "4000", isbn: "9784641104846", title: "六法全書 令和6年版", coverPath: "https://ndlsearch.ndl.go.jp/thumbnail/9784641104846.jpg" },
//   { id: "5000", isbn: "9784103549512", title: "成瀬は天下を取りにいく", coverPath: "http://books.google.com/books/content?id=JbqizwEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api" },
//   { id: "6000", isbn: "9784480020727", title: "梶井基次郎全集", coverPath: "http://books.google.com/books/content?id=GYwqAQAAIAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api" },
//   { id: "7000", isbn: "9784088518312", title: "DRAGON BALL 1 (ジャンプコミックス)", coverPath: "http://books.google.com/books/content?id=SL39GgAACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api" },
//   { id: "8000", isbn: "406145840X", title: "窓際のトットちゃん" },
//   { id: "9000", isbn: "9780735811669", title: "Alice in Wonderland", coverPath: "http://books.google.com/books/content?id=taF1PwAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api" },

import { Book } from "../Book";


export const exportData = (bookData: Book[], shelfData: Set<string>, fileName: string = "BookshelfData.json") => {
  const json = JSON.stringify([bookData, Array.from(shelfData)], null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const importData = (callback: (bookData: Book[], shelfData: Set<string>) => void) => {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "application/json";
  input.onchange = (e) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const json = JSON.parse(reader.result as string);
          const bookData: Book[] = json[0];
          const shelfData: Set<string> = new Set(json[1]);
          callback(bookData, shelfData);
        } catch (error) {
          console.error("有効なJSONファイルとして読み込めませんでした");
        }
      };
      reader.readAsText(file);
    }
  };
  input.click();
}
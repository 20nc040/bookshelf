import axios from "axios";
import { Book } from "../Book";
import { generateId } from "../util/generateId";


// Google Books APIのURL
const GOOGLE_BOOKS_API_URL = "https://www.googleapis.com/books/v1/volumes";
export const fetchBookWithGoogleBooksAPI = async (isbn: string): Promise<Book | null> => {
  try {
    const response = await axios.get(`${GOOGLE_BOOKS_API_URL}`, {
      params: {
        q: `isbn:${isbn}`,
      },
    });
    const bookData = response.data.items?.[0].volumeInfo;
    if (!bookData) {
      console.warn(`Google Books APIにはISBN:${isbn}のデータが見つかりませんでした`);
      return null;
    }

    // APIのレスポンスからBook型を生成
    const book: Book = {
      id: generateId(),
      isbn: isbn,
      title: bookData.title || "タイトル取得失敗",
      coverPath: bookData.imageLinks?.smallThumbnail || bookData.imageLinks?.thumbnail || undefined,
      authors: bookData.authors?.join(",") || undefined,
      publishedDate: bookData.publishedDate || undefined,
      note: bookData.description || "",
    };

    return book;
  } catch (error) {
    console.error("Error fetching book with Google Books API", error);
    return null;
  }
};
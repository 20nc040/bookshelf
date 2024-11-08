export type Book = {
  readonly id: string;
  isbn: string;
  title: string;
  coverPath?: string;
  authors?: string;
  publisher?: string;
  publishedDate?: string;
  note?: string;
  tags?: string;
  tags_set?: Set<string>;
};

export function getTaggedBook(book: Book, addShelf: (tag: string) => void): Book {
  if (book.tags != null) {
    const tags_list = book.tags.trim().split(",");
    tags_list.forEach((tag) => tag.trim());
    book.tags_set = new Set(tags_list);
    tags_list.forEach((tag) => addShelf(tag));
  }
  return book;
}
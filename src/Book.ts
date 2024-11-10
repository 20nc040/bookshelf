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

export function getTaggedBook(book: Book, taggingAuthors: boolean, taggingPublisher: boolean, addShelf: (tag: string) => void): Book {
  if (book.tags == null) { book.tags = ""; }
  const tagsList = book.tags.trim().split(",");
  if (taggingAuthors && book.authors != null) {
    tagsList.push(...book.authors.trim().split(","));
  }
  if (taggingPublisher && book.publisher != null) {
    tagsList.push(...book.publisher.trim().split(","));
  }
  tagsList.forEach((tag) => tag.trim());
  book.tags_set = new Set(tagsList);
  book.tags = tagsList.join(",")
  tagsList.forEach((tag) => {
    if (tag !== "") {
      addShelf(tag);
    }
  });

  return book;
}
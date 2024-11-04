export type Book = {
  readonly id: string;
  isbn: string;
  title: string;
  coverPath?: string;
  authors?: string;
  publisher?: string;
  publishedDate?: string;
  note?: string;
  tags?: string[];
};
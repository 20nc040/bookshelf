import { fetchBookWithGoogleBooksAPI } from "../net/GoogleAPI";

export const getDummyData = async () => {
  const dummy = [
    await fetchBookWithGoogleBooksAPI("9780735811669"),
    await fetchBookWithGoogleBooksAPI("9784041055106"),
    await fetchBookWithGoogleBooksAPI("9784167910105"),
    await fetchBookWithGoogleBooksAPI("9784344030039"),
    await fetchBookWithGoogleBooksAPI("9784591153321"),
    await fetchBookWithGoogleBooksAPI("9784488803018"),
    await fetchBookWithGoogleBooksAPI("9784120052989"),
    await fetchBookWithGoogleBooksAPI("9784152100641"),
    await fetchBookWithGoogleBooksAPI("9784065375709"),
    await fetchBookWithGoogleBooksAPI("9784103549512"),
  ];
  const res = dummy.filter((book) => book != null);
  return res;
};
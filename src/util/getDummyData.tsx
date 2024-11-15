import { fetchBookWithAPIs } from "../net/fetchBookWithAPIs";

export const getDummyData = async () => {
  const dummy = [
    await fetchBookWithAPIs("9780735811669"),
    await fetchBookWithAPIs("9784041055106"),
    await fetchBookWithAPIs("9784167910105"),
    await fetchBookWithAPIs("9784344030039"),
    await fetchBookWithAPIs("9784591153321"),
    await fetchBookWithAPIs("9784488803018"),
    await fetchBookWithAPIs("9784120052989"),
    await fetchBookWithAPIs("9784152100641"),
    await fetchBookWithAPIs("9784065375709"),
    await fetchBookWithAPIs("9784103549512"),
  ];
  const res = dummy.filter((book) => book != null);
  return res;
};
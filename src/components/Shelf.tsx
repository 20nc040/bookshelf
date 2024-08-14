import { Card, CardContent, CardMedia, Container, styled, Typography } from "@mui/material";
import { Book } from "../Book";

type Props = {
  books: Book[];
};

const BookCard = styled(Card)({
  margin: "4px",
  display: "flex",
  background: "rgb(250,250,250)"
});

const BookCover = styled(CardMedia)({
  width: "25%",
  height: "auto,"
}) as typeof CardMedia;

const BookInfo = styled(CardContent)({
  flexGrow: 1,
  "&:last-child": {
    paddingBottom: "0px"
  },
  padding: "8px",
  display: "flex",
  flexDirection: "column",
});

const BookTitle = styled(Typography)({
  lineHeight: "110%",
  flexGrow: 1,
  // 一定行で省略
  display: "-webkit-box",
  overflow: "hidden",
  "-webkit-line-clamp": "3",
  "-webkit-box-orient": "vertical"
}) as typeof Typography;

const BookAuthor = styled(Typography)({
  textAlign: "right",
});


export const Shelf = ({ books }: Props) => {

  return (
    <Container sx={{
      marginTop: "12px",
    }}>
      {books.map((book) => {
        return (
          <BookCard>
            <BookCover
              component="img"
              src={book.coverPath}
              alt="表紙"
            />
            <BookInfo>
              <BookTitle variant="subtitle1" gutterBottom>{book.title}</BookTitle>
              <BookAuthor variant="subtitle2">作者, 出版社, 発行年</BookAuthor>
            </BookInfo>
          </BookCard>
        );
      })}
    </Container>
  );
};
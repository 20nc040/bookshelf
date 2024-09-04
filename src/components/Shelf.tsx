import { Card, CardContent, CardMedia, Container, Grid, styled, Typography } from "@mui/material";
import { Book } from "../Book";
import { Layout } from "../Layout";

type Props = {
  books: Book[];
  layout: Layout;
};

const BookCard = styled(Card)({
  margin: "4px",
  display: "flex",
  background: "rgb(250,250,250)"
});

const BookCover = styled(CardMedia)({
  width: "25%",
  height: "auto",
}) as typeof CardMedia;

const BookCoverFull = styled(CardMedia)({
  width: "100%",
  height: "auto",
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


export const Shelf = ({ books, layout }: Props) => {
  layout = "cover"
  return layout === "cover" ? (
    <Grid container alignItems="center" justifyContent="center" spacing={1} marginTop="12px" padding="2px">
      {books.map((book) => {
        return (
          <Grid item xs={6} sm={3} md={2} xl={1}>
            <Card>
              <BookCoverFull
                component="img"
                src={book.coverPath}
                alt="表紙"
              />
            </Card>
          </Grid>
        )
      })}
    </Grid>
  ) : (
    <Container sx={{
      marginTop: "12px",
    }}>
      {books.map((book) => {
        return layout === "cover&info" ? (
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
        ) : (
          <BookCard>
            <BookInfo>
              <BookTitle variant="subtitle1" gutterBottom>{book.title}</BookTitle>
              <BookAuthor variant="subtitle2">作者, 出版社, 発行年</BookAuthor>
            </BookInfo>
          </BookCard>
        )
      })}
    </Container>
  );
};
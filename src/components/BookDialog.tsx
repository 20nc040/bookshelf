import { Alert, Box, Button, Dialog, DialogActions, DialogTitle, } from "@mui/material";
import { Book } from "../Book";
import { SubmitHandler, useForm } from "react-hook-form";
import { InputBox } from "./InputBox";

type Props = {
  book: Book;
  updateBook: (editedBook: Book) => void;
  deleteBook: (deletingBookId: string) => void;
  open: boolean;
  onClose: () => void;
};

export const BookDialog = ({ book, updateBook, deleteBook, open, onClose }: Props) => {

  const { register, handleSubmit, reset, formState: { errors }, } = useForm<Book>({ defaultValues: book });
  const onDelete = () => {
    deleteBook(book.id);
    onClose();
  };
  const onSubmit: SubmitHandler<Book> = (editedBook: Book) => {
    updateBook(editedBook);
  };

  return (
    <Dialog open={open} onClose={onClose} >
      <DialogTitle>{book.title}</DialogTitle>
      <form>
        <Box
          textAlign="center"
          paddingTop="4px"
          sx={{ background: "rgb(240,240,240)" }}
        >
          <img src={book.coverPath} alt={`${book.title}の表紙`} />
        </Box>
        <InputBox
          label="ISBN"
          formRegisterReturn={register("isbn", { required: "ISBNを入力してください" })}
          errorsDiv={
            errors.isbn && (<Alert severity="error">
              {errors.isbn.message}
            </Alert>)
          }
          scannable
        />
        <InputBox
          label="本のタイトル"
          formRegisterReturn={register("title", { required: "本のタイトルを入力してください" })}
          errorsDiv={
            errors.title && (<Alert severity="error">
              {errors.title.message}
            </Alert>
            )
          }
        />
        <InputBox
          label="著者(「,」区切り)"
          formRegisterReturn={register("authors")}
        />
        <InputBox
          label="出版社"
          formRegisterReturn={register("publisher")}
        />
        <InputBox
          label="出版日"
          formRegisterReturn={register("publishedDate")}
        />
        <InputBox
          label="メモ"
          formRegisterReturn={register("note")}
        />
        <InputBox
          label="タグ"
          formRegisterReturn={register("tags")}
        />
      </form>
      <DialogActions>
        <Button onClick={() => onDelete()}>
          削除
        </Button>
        <Button onClick={() => reset()}>
          初期化
        </Button>
        <Button onClick={handleSubmit(onSubmit)}>
          保存
        </Button>
      </DialogActions>
      {/* <DialogContent>
        <img src={book.coverPath} alt={`${book.title}の表紙`} />
        <TextField
          label="著者"
          // value={}
          onChange={handleSubmit(onSubmit)}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button>
          削除
        </Button>
        <Button onClick={() => reset()}>
          初期化
        </Button>
        <Button >
          保存
        </Button>
      </DialogActions> */}
    </Dialog >
  )
} 

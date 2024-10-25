import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { Book } from "../Book";
import { SubmitHandler, useForm } from "react-hook-form";

type Props = {
  book: Book;
  updateBook: (editedBook: Book) => void;
  deleteBook: (deletingBookId: number) => void;
  open: boolean;
  onClose: () => void;
};

export const BookDialog = ({ book, updateBook, deleteBook, open, onClose }: Props) => {

  const { register, handleSubmit, reset, formState: { errors }, } = useForm<Book>({ defaultValues: book });
  const onSubmit: SubmitHandler<Book> = (editedBook: Book) => {
    updateBook(editedBook);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{book.title}</DialogTitle>
      <DialogContent>
        <img src={book.coverPath} alt={`${book.title}の表紙`} />
        <TextField
          label="タイトル"
          value={book.title}
          onChange={ }
        />
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
      </DialogActions>
    </Dialog >
  )
} 

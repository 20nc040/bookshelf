import { Alert, Box, Button, Dialog, DialogActions, DialogTitle, } from "@mui/material";
import { Book, getTaggedBook } from "../Book";
import { SubmitHandler, useForm } from "react-hook-form";
import { InputBox } from "./InputBox";
import { useAsyncFn } from "react-use";
import { fetchBookWithAPIs } from "../net/fetchBookWithAPIs";
import { useState } from "react";
import { BarcodeScanner } from "react-barcode-scanner";
import "react-barcode-scanner/polyfill"

type Props = {
  book: Book;
  updateBook: (editedBook: Book) => void;
  deleteBook: (deletingBookId: string) => void;
  autoTaggingAuthors: boolean;
  autoTaggingPublisher: boolean;
  addShelf: (newTag: string) => void;
  open: boolean;
  onClose: () => void;
};

export const BookDialog = ({ book, updateBook, deleteBook, autoTaggingAuthors, autoTaggingPublisher, addShelf, open, onClose }: Props) => {

  const { register, handleSubmit, setValue, getValues, reset, formState: { errors }, } = useForm<Book>({ defaultValues: book });
  const onDelete = () => {
    deleteBook(book.id);
    onClose();
  };
  const onSubmit: SubmitHandler<Book> = (editedBook: Book) => {
    editedBook = getTaggedBook(editedBook, autoTaggingAuthors, autoTaggingPublisher, addShelf);
    updateBook(editedBook);
    onClose();
  };
  const [fetchState, fetchBook] = useAsyncFn(async () => {
    const isbn = getValues("isbn");
    const data = await fetchBookWithAPIs(isbn);
    if (data == null) {
      return;
    }
    if (getValues("title") === "新しい本" || getValues("title") === "") {
      setValue("title", data.title);
    }
    if (data.coverPath) {
      setValue("coverPath", data.coverPath);
    }
    if (getValues("authors") === "" && data.authors) {
      setValue("authors", data.authors);
    }
    if (getValues("publisher") === "" && data.publisher) {
      setValue("publisher", data.publisher);
    }
    if (getValues("publishedDate") === "" && data.publishedDate) {
      setValue("publishedDate", data.publishedDate);
    }
    if (getValues("note") === "" && data.note) {
      setValue("note", data.note);
    }
  }, [])

  // ISBNスキャナー
  const [scannerOpen, setScannerOpen] = useState<boolean>(false);
  const handleScannerOpen = () => {
    setScannerOpen((isOpen) => !isOpen);
  }

  if (scannerOpen) {
    return (
      <Dialog open={scannerOpen} onClose={handleScannerOpen}>
        <DialogTitle>{"ISBN13(EAN-13)バーコード読み取り"}</DialogTitle>
        <BarcodeScanner
          options={{ formats: ["ean_13"] }}
          onCapture={(barcode) => {
            console.log(barcode);
            setValue("isbn", barcode.rawValue);
            handleScannerOpen();
          }}
        />
      </Dialog>
    )
  }
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
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
          fieldName="isbn"
          setValue={setValue}
          errorsDiv={
            errors.isbn && (<Alert severity="error">
              {errors.isbn.message}
            </Alert>)
          }
          scannable
          scan={handleScannerOpen}
          actionable
          actionDisable={fetchState.loading}
          action={fetchBook}
        />
        <InputBox
          label="本のタイトル"
          formRegisterReturn={register("title", { required: "本のタイトルを入力してください" })}
          fieldName="title"
          setValue={setValue}
          errorsDiv={
            errors.title && (<Alert severity="error">
              {errors.title.message}
            </Alert>
            )
          }
          multiline
        />
        <InputBox
          label="著者 カンマ区切り( , )"
          formRegisterReturn={register("authors")}
          fieldName="authors"
          setValue={setValue}
          multiline
        />
        <InputBox
          label="出版社"
          formRegisterReturn={register("publisher")}
          fieldName="publisher"
          setValue={setValue}
        />
        <InputBox
          label="出版日"
          formRegisterReturn={register("publishedDate")}
          fieldName="publishedDate"
          setValue={setValue}
        />
        <InputBox
          label="メモ"
          formRegisterReturn={register("note")}
          fieldName="note"
          setValue={setValue}
          multiline
        />
        <InputBox
          label="タグ カンマ区切り( , )"
          formRegisterReturn={register("tags")}
          fieldName="tags"
          setValue={setValue}
          multiline
        />
      </form>
      <DialogActions>
        <Button onClick={() => onDelete()}>
          削除
        </Button>
        <div style={{ flexGrow: 1 }} />
        <Button onClick={() => reset()}>
          編集取消
        </Button>
        <div style={{ flexGrow: 1 }} />
        <Button onClick={handleSubmit(onSubmit)}>
          保存
        </Button>
      </DialogActions>
    </Dialog >
  )
} 

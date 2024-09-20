import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { Book } from "../Book";
import React, { useState } from "react";

type Props = {
  book: Book;
  open: boolean;
  onClose: () => void;
}

export const BookDialog = ({ book, open, onClose }: Props) => {

  const [editingBook, setEditingBook] = useState<Book>(book);
  const handleEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditingBook((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{book.title}</DialogTitle>
      <DialogContent>
        <img src={book.coverPath} alt={`${book.title}の表紙`} />
        <TextField
          label="著者"
          // value={}
          onChange={handleEdit}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button>
          削除
        </Button>
        <Button>
          初期化
        </Button>
        <Button>
          取消
        </Button>
        <Button>
          保存
        </Button>
      </DialogActions>
    </Dialog>
  )
} 

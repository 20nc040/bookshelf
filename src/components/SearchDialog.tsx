import Fuse from "fuse.js";
import React, { useMemo, useState } from "react";
import { Book } from "../Book";
import { Avatar, Dialog, DialogContent, DialogTitle, Icon, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, TextField } from "@mui/material";

type Props = {
  open: boolean;
  onClose: () => void;
  books: Book[];
  onSelect: (book: Book) => void;
};


export const SearchDialog = ({ open, onClose, books, onSelect }: Props) => {
  const [query, setQuery] = useState<string>("");

  // 検索オプション設定
  const fuse = useMemo(() => new Fuse(books, {
    keys: ["title", "authors", "publisher", "publishedDate", "note", "tags"],
    threshold: 0.3,
  }), [books]);

  // 検索して結果を取得
  const searchResults = useMemo(() => {
    return query ? fuse.search(query) : books;
  }, [fuse, query, books]);

  // 検索クエリをセット
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  }

  // 本を選択時
  const handleSelect = (book: Book) => {
    onSelect(book);
  };


  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>本を検索</DialogTitle>
      <DialogContent>
        <TextField
          value={query}
          onChange={handleSearchChange}
          fullWidth
          InputProps={{ endAdornment: <Icon>search</Icon> }}
        />
        <List>
          {searchResults.map((result) => {
            const book = "id" in result ? result : result.item;
            return (
              <ListItem key={book.id} style={{ padding: "4px" }}>
                <ListItemButton onClick={() => handleSelect(book)} style={{ padding: "0" }}>
                  <ListItemAvatar>
                    <Avatar
                      src={book.coverPath}
                      variant="rounded"
                    />
                  </ListItemAvatar>
                  <ListItemText primary={book.title} secondary={book.authors} />
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>
      </DialogContent>
    </Dialog>
  )
};

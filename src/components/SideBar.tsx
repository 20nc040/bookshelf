import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Drawer, Icon, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Switch } from "@mui/material";
import { useState } from "react";

type Props = {
  sideBarOpen: boolean;
  onCloseSideBar: () => void;
  autoTaggingAuthors: boolean;
  handleAutoTaggingAuthors: () => void;
  autoTaggingPublisher: boolean;
  handleAutoTaggingPublisher: () => void;
  deleteCurrentShelf: () => void;
};

export const SideBar = ({
  sideBarOpen,
  onCloseSideBar,
  autoTaggingAuthors,
  handleAutoTaggingAuthors,
  autoTaggingPublisher,
  handleAutoTaggingPublisher,
  deleteCurrentShelf,
}: Props) => {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

  const handleDeleteDialogOpen = () => {
    setDeleteDialogOpen((isOpen) => !isOpen);
  }

  const handleDeleteCurrentShelf = () => {
    deleteCurrentShelf();
    handleDeleteDialogOpen();
  }

  return (
    <>
      <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogOpen}>
        <DialogTitle>現在の本棚を削除しますか？</DialogTitle>
        <DialogContent>
          <DialogContentText>
            削除すると本のタグも自動で編集され、戻せません。「全ての本」は削除できません。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleDeleteDialogOpen}>キャンセル</Button>
          <Button onClick={handleDeleteCurrentShelf}>削除</Button>
        </DialogActions>
      </Dialog>
      <Drawer
        open={sideBarOpen}
        onClose={onCloseSideBar}
      >
        <div>
          bookshelf
        </div>
        <Divider />
        <List >
          <ListItem>
            <ListItemIcon style={{ minWidth: "30px" }}>
              <Icon>person</Icon>
            </ListItemIcon>
            <ListItemText primary="著者を自動タグ付け" />
            <Switch
              edge="end"
              onChange={handleAutoTaggingAuthors}
              checked={autoTaggingAuthors}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon style={{ minWidth: "30px" }}>
              <Icon>business</Icon>
            </ListItemIcon>
            <ListItemText primary="出版社を自動タグ付け" />
            <Switch
              edge="end"
              onChange={handleAutoTaggingPublisher}
              checked={autoTaggingPublisher}
            />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemButton onClick={handleDeleteDialogOpen} style={{ padding: "0" }}>
              <ListItemIcon style={{ minWidth: "30px" }}>
                <Icon>delete</Icon>
              </ListItemIcon>
              <ListItemText primary="現在の本棚を削除" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer >
    </>
  );
};
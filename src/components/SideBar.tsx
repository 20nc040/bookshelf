import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Drawer, Icon, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Switch } from "@mui/material";
import { useState } from "react";

type Props = {
  sideBarOpen: boolean;
  onCloseSideBar: () => void;
  autoTaggingAuthors: boolean;
  handleAutoTaggingAuthors: () => void;
  autoTaggingPublisher: boolean;
  handleAutoTaggingPublisher: () => void;
  handleImportData: () => void;
  handleExportData: () => void;
  trialDataLoading: boolean;
  fetchTrialData: () => void;
  deleteCurrentShelf: () => void;
};

export const SideBar = ({
  sideBarOpen,
  onCloseSideBar,
  autoTaggingAuthors,
  handleAutoTaggingAuthors,
  autoTaggingPublisher,
  handleAutoTaggingPublisher,
  handleImportData,
  handleExportData,
  trialDataLoading,
  fetchTrialData,
  deleteCurrentShelf,
}: Props) => {
  const [trialDataDialogOpen, setTrialDataDialogOpen] = useState<boolean>(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

  // お試しデータ追加確認ダイアログを管理
  const handleTrialDataDialogOpen = () => {
    setTrialDataDialogOpen((isOpen) => !isOpen);
  };
  // お試しデータ追加
  const onFetchTrialData = () => {
    fetchTrialData();
    handleTrialDataDialogOpen();
  }
  // 現在の本棚削除ダイアログを管理
  const handleDeleteDialogOpen = () => {
    setDeleteDialogOpen((isOpen) => !isOpen);
  }
  // 削除実行
  const onDeleteCurrentShelf = () => {
    deleteCurrentShelf();
    handleDeleteDialogOpen();
  }

  return (
    <>
      <Dialog open={trialDataDialogOpen} onClose={handleTrialDataDialogOpen}>
        <DialogTitle>お試しデータを追加しますか？</DialogTitle>
        <DialogContent>
          <DialogContentText>
            この操作は取り消せません。10冊程度追加されます。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleTrialDataDialogOpen}>キャンセル</Button>
          <Button onClick={onFetchTrialData}>追加</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={deleteDialogOpen} onClose={handleDeleteDialogOpen}>
        <DialogTitle>現在の本棚を削除しますか？</DialogTitle>
        <DialogContent>
          <DialogContentText>
            削除すると本のタグも自動で編集され、戻せません。「全ての本」は削除できません。
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleDeleteDialogOpen}>キャンセル</Button>
          <Button onClick={onDeleteCurrentShelf}>削除</Button>
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
            <ListItemButton onClick={handleExportData} style={{ padding: 0 }}>
              <ListItemIcon style={{ minWidth: "30px" }}>
                <Icon>file_download</Icon>
              </ListItemIcon>
              <ListItemText primary="データをダウンロード" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={handleImportData} style={{ padding: 0 }}>
              <ListItemIcon style={{ minWidth: "30px" }}>
                <Icon>file_upload</Icon>
              </ListItemIcon>
              <ListItemText primary="データをアップロード" />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemButton onClick={handleTrialDataDialogOpen} style={{ padding: "0" }} disabled={trialDataLoading}>
              <ListItemIcon style={{ minWidth: "30px" }}>
                <Icon>add</Icon>
              </ListItemIcon>
              <ListItemText primary="お試しデータを追加" />
            </ListItemButton>
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
import { Divider, Drawer, Icon, List, ListItem, ListItemIcon, ListItemText, Switch } from "@mui/material";

type Props = {
  sideBarOpen: boolean;
  onCloseSideBar: () => void;
  autoTaggingAuthors: boolean;
  handleAutoTaggingAuthors: () => void;
  autoTaggingPublisher: boolean;
  handleAutoTaggingPublisher: () => void;
};

export const SideBar = ({ sideBarOpen, onCloseSideBar, autoTaggingAuthors, handleAutoTaggingAuthors, autoTaggingPublisher, handleAutoTaggingPublisher }: Props) => {
  return (
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
      </List>
    </Drawer >
  );
};
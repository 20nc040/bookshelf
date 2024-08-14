import { Drawer, List, ListItem } from "@mui/material";

type Props = {
  sideBarOpen: boolean;
  onCloseSideBar: () => void;
};

export const SideBar = ({ sideBarOpen, onCloseSideBar }: Props) => {
  return (
    <Drawer
      open={sideBarOpen}
      onClose={onCloseSideBar}
    >
      <div>
        bookshelf
      </div>
      <List>
        <ListItem>
          test
        </ListItem>
      </List>
    </Drawer>
  );
};
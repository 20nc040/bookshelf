import { Divider, Icon, Menu, MenuItem, styled, Typography } from "@mui/material"
import { RefObject } from "react";
import { Layout } from "../Layout";

type Props = {
  open: boolean;
  onClose: () => void;
  anchorEl: RefObject<HTMLButtonElement>;
  sort: "new" | "old" | "abc" | "zyx";
  handleSort: (newSort: string) => void;
  handleLayout: (newLayout: Layout) => void;
}

const BoldDivider = styled(Divider)(() => ({
  "&::before, &::after": {
    borderColor: "grey"
  }
}));

export const MoreTool = ({ open, onClose, anchorEl, sort, handleSort, handleLayout }: Props) => {

  const onClickSort = (newSort: string) => {
    handleSort(newSort);
  };

  const onClickCoverView = () => {
    handleLayout("cover");
  };
  const onClickCoverAndInfoView = () => {
    handleLayout("cover&info");
  };
  const onClickInfoView = () => {
    handleLayout("info");
  };

  return (
    <Menu
      open={open}
      onClose={onClose}
      anchorEl={anchorEl.current}
    >
      <BoldDivider><Typography>並べ替え</Typography></BoldDivider>
      {sort === "new" ?
        <MenuItem onClick={() => onClickSort("old")}><Icon>arrow_downward</Icon>登録順</MenuItem> :
        <MenuItem onClick={() => onClickSort("new")}><Icon>arrow_upward</Icon>登録逆順</MenuItem>}
      {sort === "abc" ?
        <MenuItem onClick={() => onClickSort("zyx")}><Icon>arrow_upward</Icon>文字種逆順</MenuItem> :
        <MenuItem onClick={() => onClickSort("abc")}><Icon>arrow_downward</Icon>文字種順</MenuItem>}
      <BoldDivider><Typography>表示</Typography></BoldDivider>
      <MenuItem
        onClick={onClickCoverView}
      >
        <Icon>apps</Icon>
        表紙のみ
      </MenuItem>
      <MenuItem
        onClick={onClickCoverAndInfoView}
      >
        <Icon>list</Icon>
        表紙と情報
      </MenuItem>
      <MenuItem
        onClick={onClickInfoView}
      >
        <Icon>dehaze</Icon>
        情報のみ
      </MenuItem>
    </Menu>
  );
};
import { Divider, Icon, Menu, MenuItem, styled } from "@mui/material"
import { RefObject } from "react";
import { Layout } from "../Layout";

type Props = {
  open: boolean;
  onClose: () => void;
  anchorEl: RefObject<HTMLButtonElement>;
  handleLayout: (newLayout: Layout) => void;
}

const BoldDivider = styled(Divider)(() => ({
  "&::before, &::after": {
    borderColor: "grey"
  }
}));

export const MoreTool = ({ open, onClose, anchorEl, handleLayout }: Props) => {
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
      <BoldDivider>選択</BoldDivider>
      <MenuItem>
        <Icon>done_all</Icon>
        全てを選択
      </MenuItem>
      <MenuItem>
        <Icon>check_box_outline_blank</Icon>
        全選択解除
      </MenuItem>
      <BoldDivider>表示</BoldDivider>
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
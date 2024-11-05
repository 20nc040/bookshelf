import { AppBar, IconButton, Toolbar } from "@mui/material";
import Icon from "@mui/material/Icon";
import { RefObject } from "react";

type Props = {
  onClickSideBar: () => void;
  onClickMoreTool: () => void;
  buttonRef: RefObject<HTMLButtonElement>;
}

export const ToolBar = ({ onClickSideBar, onClickMoreTool, buttonRef }: Props) => (
  <AppBar position="sticky">
    <Toolbar>

      {/* サイドバー用ボタン */}
      <IconButton
        size="large"
        edge="start"
        sx={{ mr: 2 }}
        onClick={onClickSideBar}
      >
        <Icon>menu</Icon>
      </IconButton>

      {/* 本棚名 */}
      test

      {/* ダミースペース */}
      <div style={{ flexGrow: 1 }} />

      {/* 検索ボタン */}
      <IconButton
        size="large"
        edge="start"
        sx={{ mr: 2 }}
      >
        <Icon>search</Icon>
      </IconButton>

      {/* 他ツールボタン */}
      <IconButton
        size="large"
        edge="start"
        sx={{ mr: -1 }}
        onClick={onClickMoreTool}
        ref={buttonRef}
      >
        <Icon>more_horiz</Icon>
      </IconButton>
    </Toolbar>
  </AppBar >
);
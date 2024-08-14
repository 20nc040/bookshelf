import { AppBar, IconButton, Toolbar } from "@mui/material";
import Icon from "@mui/material/Icon";

type Props = {
  onClickSideBar: () => void;
}

export const ToolBar = ({ onClickSideBar, }: Props) => (
  <AppBar position="static">
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
      >
        <Icon>more_horiz</Icon>
      </IconButton>
    </Toolbar>
  </AppBar >
);
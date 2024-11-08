import { AppBar, FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, Toolbar } from "@mui/material";
import Icon from "@mui/material/Icon";
import { RefObject } from "react";

type Props = {
  shelves: Set<string>;
  currentShelf: string;
  setCurrentShelf: (newShelf: string) => void;
  onClickSideBar: () => void;
  onClickMoreTool: () => void;
  buttonRef: RefObject<HTMLButtonElement>;
}

export const ToolBar = ({ shelves, currentShelf, setCurrentShelf, onClickSideBar, onClickMoreTool, buttonRef }: Props) => {

  const onChange = (e: SelectChangeEvent) => {
    setCurrentShelf(e.target.value as string);
  };

  return (
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
        <FormControl variant="standard">
          <InputLabel>
            本棚
          </InputLabel>
          <Select
            value={currentShelf}
            onChange={onChange}
            autoWidth
          >{Array.from(shelves).map((shelf) => {
            return (
              <MenuItem key={shelf} value={shelf}>
                {shelf}
              </MenuItem>
            )
          })}
          </Select>
        </FormControl>

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
};
import { useRef, useState } from "react";
import { GlobalStyles } from "@mui/material";

import { ToolBar } from "./components/ToolBar";
import { MainFAB } from "./components/MainFAB";
import { Shelf } from "./components/Shelf";
import { SideBar } from "./components/SideBar";
import { Book } from "./Book";
import { Layout } from "./Layout";
import { MoreTool } from "./components/MoreTool";
import { BookDialog } from "./components/BookDialog";
import { generateId } from "./util/generateId";
import { getDummyData } from "./util/getDummyData";
import { useAsync } from "react-use";

export const App = () => {

  // データ管理用React変数
  const [books, setBooks] = useState<Book[]>([]); // 本の一覧
  const [shelves, setShelves] = useState<Set<string>>(new Set(["全ての本", "dummy"]));  // 本棚の一覧

  // 保存済みデータの読み込み
  const dummyDataState = useAsync(async () => {
    // const data = await getDummyData();
    // setBooks(data);
  }, []);
  if (dummyDataState.error) {
    return (
      <div>{dummyDataState.error.message}</div>
    )
  }


  // 状態管理用React変数
  const [sideBarOpen, setSideBarOpen] = useState<boolean>(false); // サイドバーが開いているか
  // const [searchOpen, setSearchOpen] = useState<boolean>(false); // 検索フォームが開いているか
  const [moreToolOpen, setMoreToolOpen] = useState<boolean>(false); // さらなるツールが開いているか
  const anchorEl = useRef<HTMLButtonElement>(null);
  const [layout, setLayout] = useState<Layout>("cover&info"); // 本のレイアウトの種類
  const [currentBook, setCurrentBook] = useState<Book | null>();  // 現在開いている本
  const [currentShelf, setCurrentShelf] = useState<string>("全ての本");  // 現在開いている本棚
  // const [selectedBook, setSelectedBook] = useState<Map>([]); // 選択中の本

  // ハンドリング関数
  // サイドバーをトグル
  const handleToggleSideBar = () => {
    setSideBarOpen((isOpen) => !isOpen);
  };
  // さらなるツールをトグル
  const handleMoreToolOpen = () => {
    setMoreToolOpen((isOpen) => !isOpen)
  };
  // 登録ダイアログをトグル
  const handleToggleNewBookDialog = () => {
    // setNewBookDialogOpen((isOpen) => !isOpen);
    setCurrentBook({ id: generateId(), isbn: "", title: "新しい本" })
  };
  // レイアウトを変更
  const handleChangeLayout = (newLayout: Layout) => {
    setLayout(newLayout);
  };
  // 現在の本を管理
  const handleCurrentBook = (newBook: Book) => {
    setCurrentBook(newBook); // newBookがundefinedだったらnullを与えたい
  };
  // 現在の本をnullに変更
  // handleCurrentBookをBookDialogのonCloseとして渡してもうまくいかなかったので。
  const unsetCurrentBook = () => {
    setCurrentBook(null);
  }

  // 本の更新
  const updateBook = (editedBook: Book) => {
    let count = 0;
    setBooks((books) => {
      const updatedBooks = books.map((book) => {
        if (book.id === editedBook.id) {
          count++;
          return editedBook;
        } else {
          return book;
        }
      });
      return updatedBooks;
    });
    if (count === 0) {
      console.log(`新しい本${editedBook}を追加`)
      setBooks((books) => [editedBook, ...books])
    }
  };
  // 本の削除
  const deleteBook = (deletingBookId: string) => {
    setBooks((books) => {
      const updatedBooks = books.filter((book) => book.id !== deletingBookId);
      return updatedBooks;
    });
    console.log(`ID:${deletingBookId}の本を削除`);
  };
  // 本棚の追加
  const addShelf = (newTag: string) => {
    setShelves((shelves) => {
      shelves.add(newTag);
      return shelves;
    });
  };


  console.log(books.filter((book) => book.id !== "1000"));


  return (
    <>
      <GlobalStyles styles={{
        body: {
          margin: 0,
          padding: 0,
          background: "rgb(240,240,240)",
        }
      }} />
      <ToolBar
        shelves={shelves}
        currentShelf={currentShelf}
        setCurrentShelf={setCurrentShelf}
        onClickSideBar={handleToggleSideBar}
        onClickMoreTool={handleMoreToolOpen}
        buttonRef={anchorEl}
      />
      <SideBar
        sideBarOpen={sideBarOpen}
        onCloseSideBar={handleToggleSideBar}
      />
      <MoreTool
        open={moreToolOpen}
        onClose={handleMoreToolOpen}
        anchorEl={anchorEl}
        handleLayout={handleChangeLayout}
      />
      {currentBook != null && (
        <BookDialog
          book={currentBook}
          updateBook={updateBook}
          deleteBook={deleteBook}
          addShelf={addShelf}
          open={Boolean(currentBook)}
          onClose={unsetCurrentBook}
        />
      )}
      <MainFAB
        onClick={handleToggleNewBookDialog}
      />
      <Shelf
        books={books}
        layout={layout}
        handleCurrentBook={handleCurrentBook}
        currentShelf={currentShelf}
      />
      <p style={{ overflowWrap: "break-word" }}>
        {layout + "\n"}
        {currentShelf + ":"}{shelves}{"\n"}
        {JSON.stringify(books)}
      </p>
    </>
  );
};
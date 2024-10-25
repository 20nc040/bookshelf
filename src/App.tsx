import { useRef, useState } from "react";
import { GlobalStyles } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form"

import { FormDialog } from "./components/FormDialog";
import { ToolBar } from "./components/ToolBar";
import { MainFAB } from "./components/MainFAB";
import { Shelf } from "./components/Shelf";
import { SideBar } from "./components/SideBar";
import { Book } from "./Book";
import { Layout } from "./Layout";
import { MoreTool } from "./components/MoreTool";
import { BookDialog } from "./components/BookDialog";

export const App = () => {

  // ダミーデータ
  const dummyBooks: Book[] = [
    { id: 1000, isbn: "9784297129163", title: "TypeScriptとReact/Next.jsでつくる実践Webアプリケーション開発", coverPath: "https://ndlsearch.ndl.go.jp/thumbnail/9784297129163.jpg" },
    { id: 2000, isbn: "9784422311074", title: "世界図書館遺産 : 壮麗なるクラシックライブラリー23選", coverPath: "https://ndlsearch.ndl.go.jp/thumbnail/9784422311074.jpg" },
    { id: 3000, isbn: "9784000801317", title: "広辞苑　第7版", coverPath: "https://ndlsearch.ndl.go.jp/thumbnail/9784000801317.jpg" },
    { id: 4000, isbn: "9784641104846", title: "六法全書 令和6年版", coverPath: "https://ndlsearch.ndl.go.jp/thumbnail/9784641104846.jpg" },
    { id: 5000, isbn: "9784103549512", title: "成瀬は天下を取りにいく", coverPath: "http://books.google.com/books/content?id=JbqizwEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api" },
    { id: 6000, isbn: "9784480020727", title: "梶井基次郎全集", coverPath: "http://books.google.com/books/content?id=GYwqAQAAIAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api" },
    { id: 7000, isbn: "9784088518312", title: "DRAGON BALL 1 (ジャンプコミックス)", coverPath: "http://books.google.com/books/content?id=SL39GgAACAAJ&printsec=frontcover&img=1&zoom=5&source=gbs_api" },
    // { id: 8000, isbn: "406145840X", title: "窓際のトットちゃん" },
    { id: 9000, isbn: "9780735811669", title: "Alice in Wonderland", coverPath: "http://books.google.com/books/content?id=taF1PwAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api" },
  ];

  // データ管理用React変数
  const [books, setBooks] = useState<Book[]>(dummyBooks); // 本の一覧
  // const [shelf, setShelf] = useState

  // 保存済みデータの読み込み

  // 状態管理用React変数
  const [sideBarOpen, setSideBarOpen] = useState<boolean>(false); // サイドバーが開いているか
  // const [searchOpen, setSearchOpen] = useState<boolean>(false); // 検索フォームが開いているか
  const [moreToolOpen, setMoreToolOpen] = useState<boolean>(false); // さらなるツールが開いているか
  const anchorEl = useRef<HTMLButtonElement>(null);
  const [newBookDialogOpen, setNewBookDialogOpen] = useState<boolean>(false); // 本の登録ダイアログが開いているか
  const [layout, setLayout] = useState<Layout>("cover&info"); // 本のレイアウトの種類
  const [currentBook, setCurrentBook] = useState<Book | null>(null);  // 現在開いている本
  // const [selectedBook, setSelectedBook] = useState<Map>([]); // 選択中の本

  // 入力フォーム管理用react-hook-form変数
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },// 他にも便利そうなのがある
  } = useForm<Book>({
    defaultValues: {},
  });
  const onSubmit: SubmitHandler<Book> = (newBook) => {
    console.log("submitted " + JSON.stringify(newBook));
    setBooks((books) => [newBook, ...books]);
  };

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
    setNewBookDialogOpen((isOpen) => !isOpen);
  };
  // レイアウトを変更
  const handleChangeLayout = (newLayout: Layout) => {
    setLayout(newLayout);
  };
  // 現在の本を管理
  const handleCurrentBook = (newBook?: Book) => {
    setCurrentBook(newBook ? newBook : null); // newBookがundefinedだったらnullを与えたい
  };

  // 本の更新
  const updateBook = (editedBook: Book) => {
    setBooks((books) => {
      const updatedBooks = books.map((book) => {
        if (book.id === editedBook.id) {
          return editedBook;
        } else {
          return book;
        }
      });
      return updatedBooks;
    });
  };
  // 本の削除
  const deleteBook = (deletingBookId: number) => {
    setBooks((books) => {
      const updatedBooks = books.filter((book) => book.id !== deletingBookId);
      return updatedBooks;
    });
  }


  console.log(watch("title" as "id"))


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
      <FormDialog
        dialogOpen={newBookDialogOpen}
        onDialogClose={handleToggleNewBookDialog}
        register={register}
        handleSubmit={handleSubmit}
        errors={errors}
        onSubmit={onSubmit}
      />
      {currentBook && (
        <BookDialog
          book={currentBook}
          updateBook={updateBook}
          deleteBook={deleteBook}
          open={Boolean(currentBook)}
          onClose={handleCurrentBook}
        />
      )}
      <MainFAB
        onClick={handleToggleNewBookDialog}
      />
      <Shelf
        books={books}
        layout={layout}
      />
      <p style={{ overflowWrap: "break-word" }}>
        {layout + "\n"}
        {JSON.stringify(books)}
      </p>
    </>
  );
};
import { useEffect, useRef, useState } from "react";
import { createTheme, GlobalStyles, ThemeProvider } from "@mui/material";
import { useAsyncFn } from "react-use";

import { Book, getTaggedBook } from "./Book";
import { Layout } from "./Layout";
import { ToolBar } from "./components/ToolBar";
import { MainFAB } from "./components/MainFAB";
import { Shelf } from "./components/Shelf";
import { SideBar } from "./components/SideBar";
import { MoreTool } from "./components/MoreTool";
import { BookDialog } from "./components/BookDialog";
import { generateId } from "./util/generateId";
import { SearchDialog } from "./components/SearchDialog";
import { getDummyData } from "./util/getDummyData";
import localforage from "localforage";
import { exportData, importData } from "./util/ImportExportData";
import { amber, green } from "@mui/material/colors";

export const App = () => {

  const theme = createTheme({
    palette: {
      primary: {
        main: green[700],
      },
      secondary: {
        main: amber[300],
      }
    }
  });

  // データ管理用React変数
  const [books, setBooks] = useState<Book[]>([]); // 本の一覧
  const [shelves, setShelves] = useState<Set<string>>(new Set(["全ての本"]));  // 本棚の一覧

  // 保存済みデータの読み込み
  useEffect(() => {
    localforage.getItem("books").then((data) => setBooks(data as Book[]));
    localforage.getItem("shelves").then((data) => setShelves((data) as Set<string>));
  }, []);
  // データをindexedDBに同期
  useEffect(() => {
    localforage.setItem("books", books);
  }, [books]);
  useEffect(() => {
    localforage.setItem("shelves", shelves);
  }, [shelves]);

  // インポート機能
  const handleImportData = () => {
    importData((bookData, shelfData) => {
      setBooks(bookData);
      setShelves(shelfData.add("全ての本"));
      console.log("データを読み込みました");
    });
  }
  // エクスポート機能
  const handleExportData = () => {
    exportData(books, shelves);
    console.log("データを書き出しました");
    console.log(shelves);
  }

  // 状態管理用React変数
  const [sideBarOpen, setSideBarOpen] = useState<boolean>(false); // サイドバーが開いているか
  const [searchOpen, setSearchOpen] = useState<boolean>(false); // 検索フォームが開いているか
  const [moreToolOpen, setMoreToolOpen] = useState<boolean>(false); // さらなるツールが開いているか
  const anchorEl = useRef<HTMLButtonElement>(null); // さらなるツール用アンカー
  const [sort, setSort] = useState<"new" | "old" | "abc" | "zyx">("new");  // 並べ替え順
  const [layout, setLayout] = useState<Layout>("cover&info"); // 本のレイアウトの種類
  const [currentBook, setCurrentBook] = useState<Book | null>();  // 現在開いている本
  const [currentShelf, setCurrentShelf] = useState<string>("全ての本");  // 現在開いている本棚
  const [autoTaggingAuthors, setAutoTaggingAuthors] = useState<boolean>(false);  // 本登録時に著者を自動でタグ付けするか
  const [autoTaggingPublisher, setAutoTaggingPublisher] = useState<boolean>(false);  // 本登録時に発行社を自動でタグ付けするか

  // 保存済み設定の読込
  useEffect(() => {
    localforage.getItem("layout").then((value) => setLayout(value as Layout));
    localforage.getItem("autoTaggingAuthors").then((value) => setAutoTaggingAuthors(value as boolean));
    localforage.getItem("autoTaggingPublisher").then((value) => setAutoTaggingPublisher(value as boolean));
  }, []);
  // 設定を同期
  useEffect(() => {
    localforage.setItem("layout", layout);
  }, [layout]);
  useEffect(() => {
    localforage.setItem("autoTaggingAuthors", autoTaggingAuthors);
  }, [autoTaggingAuthors]);
  useEffect(() => {
    localforage.setItem("autoTaggingPublisher", autoTaggingPublisher);
  }, [autoTaggingPublisher]);

  // ハンドリング関数
  // サイドバーをトグル
  const handleToggleSideBar = () => {
    setSideBarOpen((isOpen) => !isOpen);
  };
  // 検索ダイアログをトグル
  const handleToggleSearchDialog = () => {
    setSearchOpen((isOpen) => !isOpen);
  };
  // さらなるツールをトグル
  const handleMoreToolOpen = () => {
    setMoreToolOpen((isOpen) => !isOpen);
  };
  // 登録ダイアログをトグル
  const handleToggleNewBookDialog = () => {
    setCurrentBook({ id: generateId(), isbn: "", title: "新しい本" })
  };
  // 並べ替え順を変更
  const handleSort = (newSort: string) => {
    if (newSort === "new") {
      setBooks((books) => {
        books.sort((a, b) => a.id < b.id ? 1 : -1);
        return books;
      });
      setSort("new");
    } else if (newSort === "old") {
      setBooks((books) => {
        books.sort((a, b) => a.id < b.id ? -1 : 1);
        return books;
      });
      setSort("old");
    } else if (newSort === "abc") {
      setBooks((books) => {
        books.sort((a, b) => a.title < b.title ? -1 : 1);
        return books;
      });
      setSort("abc");
    } else if (newSort === "zyx") {
      setBooks((books) => {
        books.sort((a, b) => a.title < b.title ? 1 : -1);
        return books;
      });
      setSort("zyx");
    }
  }
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
  };
  // 著者の自動タグ付けをトグル
  const handleAutoTaggingAuthors = () => {
    setAutoTaggingAuthors((current) => !current);
  };
  // 発行社の自動タグ付けをトグル
  const handleAutoTaggingPublisher = () => {
    setAutoTaggingPublisher((current) => !current);
  };

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
  // 現在の本棚の削除
  const deleteCurrentShelf = () => {
    // 全ての本は削除できない
    if (currentShelf === "全ての本") {
      return;
    }
    // 現在の本棚を削除
    setShelves((shelves) => {
      shelves.delete(currentShelf);
      return shelves;
    });
    // すべての本からタグを削除
    setBooks((books) => {
      const newBooks = books.map((book) => {
        if (book.tags_set == null) {
          return book;
        }
        book.tags_set.delete(currentShelf);
        book.tags = Array.from(book.tags_set).join(",");
        return book;
      });
      return newBooks;
    })
    // 本棚を変更
    setCurrentShelf("全ての本");
  }

  // お試しデータ読み込み関数
  const [trialDataState, fetchTrialData] = useAsyncFn(async () => {
    const data = await getDummyData();
    const taggedData = data.filter((book): book is NonNullable<typeof book> => book != null).map((book: Book) => {
      return getTaggedBook(book, autoTaggingAuthors, autoTaggingPublisher, addShelf);
    })
    setBooks((books) => [...taggedData, ...books]);
  }, [autoTaggingAuthors, autoTaggingPublisher]);


  return (
    <>
      <ThemeProvider theme={theme}>
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
          onClickSearch={handleToggleSearchDialog}
          onClickMoreTool={handleMoreToolOpen}
          buttonRef={anchorEl}
        />
        <SideBar
          sideBarOpen={sideBarOpen}
          onCloseSideBar={handleToggleSideBar}
          autoTaggingAuthors={autoTaggingAuthors}
          handleAutoTaggingAuthors={handleAutoTaggingAuthors}
          autoTaggingPublisher={autoTaggingPublisher}
          handleAutoTaggingPublisher={handleAutoTaggingPublisher}
          handleImportData={handleImportData}
          handleExportData={handleExportData}
          trialDataLoading={trialDataState.loading}
          fetchTrialData={fetchTrialData}
          deleteCurrentShelf={deleteCurrentShelf}
        />
        <MoreTool
          open={moreToolOpen}
          onClose={handleMoreToolOpen}
          anchorEl={anchorEl}
          sort={sort}
          handleSort={handleSort}
          handleLayout={handleChangeLayout}
        />
        {currentBook != null && (
          <BookDialog
            book={currentBook}
            updateBook={updateBook}
            deleteBook={deleteBook}
            autoTaggingAuthors={autoTaggingAuthors}
            autoTaggingPublisher={autoTaggingPublisher}
            addShelf={addShelf}
            open={Boolean(currentBook)}
            onClose={unsetCurrentBook}
          />
        )}
        <SearchDialog
          open={searchOpen}
          onClose={handleToggleSearchDialog}
          books={books}
          onSelect={handleCurrentBook}
        />
        <MainFAB
          onClick={handleToggleNewBookDialog}
        />
        <Shelf
          books={books}
          layout={layout}
          handleCurrentBook={handleCurrentBook}
          currentShelf={currentShelf}
        />
      </ThemeProvider>
    </>
  );
};
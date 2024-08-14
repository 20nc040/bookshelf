import { Alert, createTheme, Dialog, ThemeProvider, Typography } from "@mui/material";
import { UseFormRegister, UseFormHandleSubmit, SubmitHandler, FieldErrors } from "react-hook-form";
import { InputBox } from "./InputBox";
import { Book } from "./Book";

type Props = {
  dialogOpen: boolean;
  onDialogClose: () => void;
  register: UseFormRegister<Book>;
  handleSubmit: UseFormHandleSubmit<Book, undefined>;
  errors: FieldErrors<Book>;
  onSubmit: SubmitHandler<Book>;
};

// const ErrorMessage = styled(Alert)({ severity: "warning", padding: 0, });
const compressedAlert = createTheme({
  components: {
    MuiAlert: {
      styleOverrides: {
        root: {
          padding: 0
        },
        icon: {
          padding: 0
        },
        message: {
          padding: 0
        }
      }
    }
  }
});

export const FormDialog = ({ dialogOpen, onDialogClose, register, handleSubmit, errors, onSubmit }: Props) => {
  return (
    <Dialog open={dialogOpen} onClose={onDialogClose}>
      <Typography align="center">新しい本を登録</Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ThemeProvider theme={compressedAlert}>
          <InputBox
            label="ISBN"
            formRegisterReturn={register("isbn", { required: "ISBNを入力してください" })}
            errorsDiv={
              errors.isbn && (<Alert severity="error">
                {errors.isbn.message}
              </Alert>)
            }
            scannable
          />
          <InputBox
            label="本のタイトル"
            formRegisterReturn={register("title", { required: "本のタイトルを入力してください" })}
            errorsDiv={
              errors.title && (<Alert severity="error">
                {errors.title.message}
              </Alert>
              )
            }
          />
          <input type="submit" />
        </ThemeProvider>
      </form>
    </Dialog>
  );
};
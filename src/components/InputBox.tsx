import { Box, createTheme, IconButton, InputAdornment, TextField, ThemeProvider } from "@mui/material";
import Icon from "@mui/material/Icon";
import { UseFormRegisterReturn, UseFormSetValue } from "react-hook-form";
import { Book } from "../Book";

type Props = {
  label: string;
  formRegisterReturn: UseFormRegisterReturn;
  fieldName: keyof Book;
  setValue: UseFormSetValue<Book>;
  errorsDiv?: JSX.Element | undefined;
  multiline?: boolean;
  scannable?: boolean;
  actionable?: boolean;
  actionDisable?: boolean;
  action?: () => void;
};

const compressedTextField = createTheme({
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          transform: "translate(14px,4px)",
          "&.MuiInputLabel-shrink": {
            transform: "translate(14px,-8px) scale(0.75)",
          },
        },
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          paddingRight: 0,
          paddingTop: 4,
          paddingBottom: 4,
        },
        input: {
          paddingTop: 4,
          paddingBottom: 4,
        }
      }
    },
  }
});

export const InputBox = ({ label, formRegisterReturn, fieldName, setValue, errorsDiv, multiline, scannable, actionable, actionDisable, action }: Props) => {

  const onClickAction = () => {
    !actionDisable && action != undefined && action();
  };

  return (
    <Box>
      <Box
        padding="4px"
        paddingBottom="0"
        sx={{ display: "flex" }}
      >
        <ThemeProvider theme={compressedTextField}>
          <TextField
            label={label}
            {...formRegisterReturn}
            InputProps={{
              endAdornment:
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setValue(fieldName, "")}
                    sx={{
                      padding: 0.25
                    }}
                  >
                    <Icon>clear</Icon>
                  </IconButton>
                </InputAdornment>
            }}
            {...(multiline && { multiline })}
            maxRows="3"
            sx={{ flexGrow: 1 }}
          />
        </ThemeProvider >
        {scannable && (
          <IconButton
            color="info"
            sx={{
              padding: 0.25,
            }}
          >
            <Icon>qr_code_scanner</Icon>
          </IconButton>
        )}
        {actionable && (
          <IconButton
            color={actionDisable ? "warning" : "info"}
            sx={{
              padding: 0.25,
            }}
            onClick={onClickAction}
          >
            <Icon>subdirectory_arrow_left</Icon>
          </IconButton>
        )}
      </Box>
      <Box
        paddingTop="1px"
        paddingBottom="3px"
      >
        {errorsDiv}
      </Box>
    </Box>
  );
};
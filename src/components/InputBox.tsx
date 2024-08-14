import { Box, createTheme, IconButton, InputAdornment, TextField, ThemeProvider } from "@mui/material";
import Icon from "@mui/material/Icon";
import { UseFormRegisterReturn } from "react-hook-form";

type Props = {
  label: string;
  formRegisterReturn: UseFormRegisterReturn;
  errorsDiv?: JSX.Element | undefined;
  scannable?: boolean;
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
          paddingRight: 0
        },
        input: {
          paddingTop: 4,
          paddingBottom: 4,
        }
      }
    }
  }
});

export const InputBox = ({ label, formRegisterReturn, errorsDiv, scannable }: Props) => {
  return (
    <>
      <Box
        display="flex"
        padding="4px"
        paddingBottom="0"
      >
        <ThemeProvider theme={compressedTextField}>
          <TextField
            label={label}
            {...formRegisterReturn}
            InputProps={{
              endAdornment:
                <InputAdornment position="end">
                  <IconButton
                    sx={{
                      padding: 0.25
                    }}
                  >
                    <Icon>clear</Icon>
                  </IconButton>
                </InputAdornment>
            }}
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
      </Box>
      <Box
        paddingTop="1px"
        paddingBottom="3px"
      >
        {errorsDiv}
      </Box>
    </>
  );
};
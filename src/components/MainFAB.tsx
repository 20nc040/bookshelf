import { Fab, styled } from "@mui/material";
import Icon from "@mui/material/Icon";

type Props = {
  onClick: () => void;
};

const FAB = styled(Fab)({
  position: "fixed",
  right: 15,
  bottom: 15,
});

export const MainFAB = ({ onClick }: Props) => {
  return (
    <>
      <FAB onClick={onClick}>
        <Icon>auto_stories</Icon>
      </FAB>
    </>
  );
};
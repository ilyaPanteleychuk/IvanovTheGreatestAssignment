import TableRowMui from "@mui/material/TableRow"
import {createUseStyles} from "react-jss";
import useTheme from "../../misc/hooks/useTheme";
import classNames from "classnames";

const getClasses = createUseStyles((theme) => ({
  container: {
    '&:hover .rowAction': {
      visibility: "visible",
    },
  },
}));

function TableRow({
  key,
  hover,
  children
}) {
  const { theme } = useTheme();
  const classes = getClasses({ theme });
  return (
    <TableRowMui
      key={key}
      hover={hover}
      className={classNames(classes.container)}
    >
      {children}
    </TableRowMui>
  );
}

export default TableRow
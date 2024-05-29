import {createUseStyles} from "react-jss";
import useTheme from "../../misc/hooks/useTheme";
import TableCellMui from "@mui/material/TableCell";
import classNames from "classnames";

const getClasses = createUseStyles((theme) => ({
  tableCell: {
    padding: "8px !important",
  }
}));

function TableCell({
  children,
  onClick,
}) {
  const { theme } = useTheme();
  const classes = getClasses({ theme });
  return (
    <TableCellMui
      className={classNames(
        classes.tableCell,
      )}
      onClick={onClick}
    >
      {children}
    </TableCellMui>
  );
}

export default TableCell
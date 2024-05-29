import {createUseStyles} from "react-jss";
import useTheme from "../../misc/hooks/useTheme";
import TableCellMui from "@mui/material/TableCell";
import classNames from "classnames";

const getClasses = createUseStyles((theme) => ({
  actionContainer: {
    visibility: "hidden"
  }
}));

function TableCellAction({
  children,
}) {
  const { theme } = useTheme();
  const classes = getClasses({ theme });
  return (
    <TableCellMui
      className={classNames(
        classes.actionContainer,
        "rowAction"
      )}
    >
      {children}
    </TableCellMui>
  );
}

export default TableCellAction
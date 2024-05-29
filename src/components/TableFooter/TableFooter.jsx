import TableFooterMui from "@mui/material/TableFooter";

function TableFooter({
  children,
}) {
  return (
    <TableFooterMui>
      {children}
    </TableFooterMui>
  );
}

export default TableFooter
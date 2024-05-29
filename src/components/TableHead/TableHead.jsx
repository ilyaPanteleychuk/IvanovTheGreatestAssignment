import TableHeadMui from "@mui/material/TableHead"

function TableHead({
  children
}) {
  return (
    <TableHeadMui>
      {children}
    </TableHeadMui>
  );
}

export default TableHead
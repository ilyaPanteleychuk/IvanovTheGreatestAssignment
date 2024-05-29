import TableMui from "@mui/material/Table";

function Table({
  children
}) {
  return (
    <TableMui>
      {children}
    </TableMui>
  );
}

export default Table
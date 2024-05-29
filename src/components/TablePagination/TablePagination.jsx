import TablePaginationMui from '@mui/material/TablePagination';

function TablePagination ({
  count,
  page,
  onPageChange,
  onRowsPerPageChange,
  rowsPerPage,
  labelRowsPerPage
}) {
  return (
    <TablePaginationMui
      count={count}
      labelRowsPerPage={labelRowsPerPage}
      onPageChange={onPageChange}
      onRowsPerPageChange={onRowsPerPageChange}
      page={page}
      rowsPerPage={rowsPerPage}
    />
  );
}

export default TablePagination
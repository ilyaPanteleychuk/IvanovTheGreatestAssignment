import SnackbarMui from '@mui/material/Snackbar';

function Snackbar ({
  autoHide,
  onClose,
  open,
  children
}) {
  return (
    <SnackbarMui
      autoHideDuration={autoHide ? 2000 : null}
      onClose={onClose}
      open={open}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      {children}
    </SnackbarMui>
  );
}

export default Snackbar
export default theme => ({
  root: {
    borderTop: [1, 'solid', theme.palette.divider],
  },
  container: {
    padding: [theme.spacing.unit * 7, 0],
  },
  copyright: {
    textAlign: 'center',
  },
  [theme.breakpoints.down('sm')]: {
    container: {
      padding: [theme.spacing.unit * 3, 0],
    },
  },
});

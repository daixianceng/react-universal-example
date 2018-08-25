export default theme => ({
  container: {
    margin: [theme.spacing.unit * 8, 0],
  },
  [theme.breakpoints.down('sm')]: {
    container: {
      margin: [theme.spacing.unit * 2, 0],
    },
  },
});

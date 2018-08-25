export default theme => ({
  post: {
    marginBottom: theme.spacing.unit * 5,
  },
  [theme.breakpoints.down('sm')]: {
    post: {
      marginBottom: theme.spacing.unit * 2,
    },
  },
});

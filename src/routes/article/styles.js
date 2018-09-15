export default theme => ({
  card: {
    marginBottom: theme.spacing.unit * 5,
  },
  [theme.breakpoints.down('sm')]: {
    card: {
      marginBottom: theme.spacing.unit * 2,
    },
  },
});

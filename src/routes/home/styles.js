export default theme => ({
  post: {
    marginBottom: theme.spacing.unit * 5,
    transition: ['box-shadow', '500ms', 'ease-out'],

    '&:hover': {
      boxShadow: [0, 5, theme.spacing.unit * 3, 'rgba(0, 0, 0, 0.3)'],
    },
  },
  pagination: {
    marginBottom: theme.spacing.unit * 5,
  },
  [theme.breakpoints.down('sm')]: {
    post: {
      marginBottom: theme.spacing.unit * 2,
    },
    pagination: {
      marginBottom: theme.spacing.unit * 2,
    },
  },
});

export default theme => ({
  title: {
    overflow: 'hidden',
    fontSize: '2.2rem',
  },
  content: {
    overflow: 'hidden',
    color: theme.palette.text.primary,

    '& a': {
      color: theme.palette.primary.main,
    },

    '& a:hover': {
      color: theme.palette.primary.light,
    },
  },
  [theme.breakpoints.down('sm')]: {
    title: {
      fontSize: '1.8rem',
    },
  },
});

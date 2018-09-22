export default theme => ({
  title: {
    fontSize: '1.8rem',
    overflow: 'hidden',
  },
  titleLink: {
    color: theme.palette.text.primary,
    textDecoration: 'none',

    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  content: {
    color: theme.palette.text.secondary,
    overflow: 'hidden',
    lineHeight: '1.5rem',
  },
});

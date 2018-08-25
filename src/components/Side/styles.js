export default theme => ({
  root: {},
  card: {
    marginBottom: theme.spacing.unit * 5,

    '&:last-of-type': {
      marginBottom: 0,
    },
  },
  avatarContainer: {
    margin: theme.spacing.unit * 3,
  },
  avatar: {
    width: '100%',
    height: '100%',
    filter: theme.palette.type === 'dark' ? 'sepia(100%)' : 'none',
  },
  aboutContent: {
    '& a': {
      color: theme.palette.primary.main,
    },

    '& a:hover': {
      color: theme.palette.primary.light,
    },
  },
  [theme.breakpoints.down('sm')]: {
    card: {
      marginBottom: theme.spacing.unit * 2,
    },
    avatarContainer: {
      margin: [theme.spacing.unit * 3, theme.spacing.unit * 8],
    },
    categoryCard: {
      display: 'none',
    },
  },
});

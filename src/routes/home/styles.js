export default theme => ({
  post: {
    marginBottom: theme.spacing.unit * 5,
    transition: ['box-shadow', '500ms', 'ease-out'],

    '&:hover': {
      boxShadow: [0, 5, theme.spacing.unit * 3, 'rgba(0, 0, 0, 0.3)'],
    },
  },
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
  intro: {
    color: theme.palette.text.secondary,
    overflow: 'hidden',
    lineHeight: '1.5rem',
  },
  actionLeft: {
    display: 'flex',
    flexGrow: 1,
  },
  actionRight: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'flex-end',
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

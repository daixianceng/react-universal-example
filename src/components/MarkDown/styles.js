export default theme => ({
  markdown: {
    backgroundColor: theme.palette.common.white,
    border: '1px solid #d1d5da',
    borderRadius: 3,
    lineHeight: 1.25,
    minWidth: 200,
    maxWidth: 980,
    margin: '0 auto',
  },
  markdownHeader: {
    margin: [-1, -1, 0, -1],
    padding: [theme.spacing.unit, theme.spacing.unit * 2],
    backgroundColor: '#f6f8fa',
    borderColor: '#d1d5da',
    borderStyle: 'solid',
    borderWidth: 1,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    fontSize: '1.2rem',
  },
  markdownBody: {
    boxSizing: 'border-box',
    padding: theme.spacing.unit * 5,
  },
  [theme.breakpoints.down('xs')]: {
    markdownBody: {
      padding: theme.spacing.unit * 2,
    },
  },
});

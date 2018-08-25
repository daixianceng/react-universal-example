export default theme => ({
  root: {
    padding: [0, theme.spacing.unit],
  },
  current: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  currentButton: {
    cursor: 'default',
    fontSize: theme.spacing.unit * 2,
  },
});

export default theme => ({
  media: {
    paddingBottom: 'calc(2 / 3 * 100%)',
    filter: theme.palette.type === 'dark' ? 'sepia(100%)' : 'none',
  },
  date: {
    display: 'flex',
    alignItems: 'center',
  },
  tags: {
    display: 'flex',
    flexWrap: 'nowrap',
    overflow: 'hidden',
  },
  tag: {
    marginRight: theme.spacing.unit,
  },
});

export default theme => ({
  toolbar: {
    alignItems: 'center',
    color: theme.palette.common.white,
  },
  navs: {
    display: 'flex',
    flexGrow: 1,
  },
  flex: {
    display: 'flex',
  },
  [theme.breakpoints.up('md')]: {
    menuButton: {
      display: 'none',
    },
  },
  [theme.breakpoints.down('sm')]: {
    hiddenDownSm: {
      display: 'none',
    },
  },
});

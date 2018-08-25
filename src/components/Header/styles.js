import bgImage from './bg.jpg';

export default theme => ({
  root: {
    height: 460,
    position: 'relative',
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.primary.A400
        : theme.palette.primary.main,
  },
  background: {
    background: {
      image: `url(${bgImage})`,
      position: 'bottom center',
      repeat: 'repeat-x',
    },
    height: '100%',
    opacity: 1,
    filter: theme.palette.type === 'dark' ? 'grayscale(100%)' : 'none',
  },
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  containerFixed: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor:
      theme.palette.type === 'dark'
        ? theme.palette.primary.A400
        : theme.palette.primary.main,
    zIndex: theme.zIndex.appBar,

    '& $appBar': {
      backgroundColor: 'unset',
    },
  },
  appBar: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  [theme.breakpoints.down('sm')]: {
    root: {
      height: 260,
    },
  },
});

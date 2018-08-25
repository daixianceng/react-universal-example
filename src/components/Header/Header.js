import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import cx from 'classnames';
import { fromEvent } from 'rxjs/observable/fromEvent';

import AppBar from '@material-ui/core/AppBar';
import Grid from '@material-ui/core/Grid';
import withWidth, { isWidthDown } from '@material-ui/core/withWidth';
import { withStyles } from '@material-ui/core/styles';

import Navigation from '../Navigation';
import s from './styles';

class Header extends React.Component {
  static propTypes = {
    width: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  constructor(props) {
    super(props);
    this.state = {
      opacity: 1,
      width: props.width,
    };
    this.generateRootHeight(props.width);
    this.container = React.createRef();
  }

  componentDidMount() {
    this.generateContainerHeight();
    this.handleWindowScroll();
    this.scrollSubscription = fromEvent(window, 'scroll').subscribe(
      this.handleWindowScroll,
    );
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.width !== nextProps.width) {
      return {
        width: nextProps.width,
      };
    }
    return null;
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (prevState.width !== this.state.width) {
      return 'shouldGenerateHeight';
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot === 'shouldGenerateHeight') {
      this.generateRootHeight(this.state.width);
      this.generateContainerHeight();
    }
  }

  componentWillUnmount() {
    this.scrollSubscription.unsubscribe();
  }

  generateRootHeight = width => {
    this.rootHeight = isWidthDown('sm', width) ? 260 : 460;
  };

  generateContainerHeight = () => {
    this.containerHeight = this.container.current.offsetHeight;
  };

  handleWindowScroll = () => {
    const y = window.scrollY;
    const opacity = 1 - Math.min(y / (this.rootHeight - this.containerHeight), 1);
    if (opacity !== this.state.opacity) {
      this.setState({
        opacity,
      });
    }
  };

  render() {
    const { opacity } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div
          className={cx('theme-transition', classes.background)}
          style={{ opacity }}
        />
        <div
          className={opacity === 0 ? classes.containerFixed : classes.container}
          ref={this.container}
        >
          <AppBar className={classes.appBar} position="static" color="primary">
            <Grid container justify="center">
              <Grid item lg={8} md={10} xs>
                <Navigation />
              </Grid>
            </Grid>
          </AppBar>
        </div>
      </div>
    );
  }
}

export default compose(
  withStyles(s),
  withWidth(),
)(Header);

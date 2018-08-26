import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cx from 'classnames';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { open as openNavDrawer } from 'actions/navDrawer';
import Link from '../Link';
import { toUrl } from '../../router';
import CategoryMenu from './CategoryMenu';
import ThemeMenu from './ThemeMenu';
import s from './styles';

class Navigation extends React.Component {
  static propTypes = {
    openNavDrawer: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  handleOpenNavDrawer = () => {
    this.props.openNavDrawer();
  };

  render() {
    const { classes } = this.props;

    return (
      <Toolbar className={classes.toolbar}>
        <IconButton
          className={classes.menuButton}
          onClick={this.handleOpenNavDrawer}
          color="inherit"
          aria-label="Menu"
        >
          <MenuIcon />
        </IconButton>
        <div className={classes.navs}>
          <Button
            component={Link}
            to={toUrl('home')}
            color="inherit"
            title="Home"
          >
            <Typography variant="title" color="inherit">
              {process.env.APP_NAME}
            </Typography>
          </Button>
          <CategoryMenu className={cx(classes.flex, classes.hiddenDownSm)} />
          <Button
            component={Link}
            to={toUrl('contact')}
            color="inherit"
            className={classes.hiddenDownSm}
          >
            Contact
          </Button>
          <Button
            component={Link}
            to={toUrl('about')}
            color="inherit"
            className={classes.hiddenDownSm}
          >
            About
          </Button>
        </div>
        <ThemeMenu className={classes.flex} />
      </Toolbar>
    );
  }
}

const mapState = () => ({});

const mapDispatch = {
  openNavDrawer,
};

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(Navigation));

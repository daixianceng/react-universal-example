import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';

import Header from '../Header';
import Footer from '../Footer';
import NavDrawer from '../NavDrawer';
import s from './styles';

class LayoutBase extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    error: PropTypes.node,
    errorCounter: PropTypes.number, // eslint-disable-line react/no-unused-prop-types
    classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  static defaultProps = {
    error: '',
    errorCounter: 0,
  };

  constructor(...props) {
    super(...props);
    this.state = {
      open: false,
      errorCounter: 0,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.errorCounter !== nextProps.errorCounter) {
      return {
        open: true,
        errorCounter: nextProps.errorCounter,
      };
    }
    return null;
  }

  handleClose = () => {
    this.setState({
      open: false,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <>
        <CssBaseline />
        <Header />
        <div className={classes.container}>
          <Grid container justify="center">
            <Grid item lg={8} sm={10} xs>
              {this.props.children}
            </Grid>
          </Grid>
        </div>
        <NavDrawer />
        <Snackbar
          open={this.state.open}
          onClose={this.handleClose}
          autoHideDuration={5000}
          message={this.props.error}
          disableWindowBlurListener
        />
        <Footer />
      </>
    );
  }
}

const mapState = state => ({
  error: state.notification.error,
  errorCounter: state.notification.errorCounter,
});

const mapDispatch = {};

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(LayoutBase));

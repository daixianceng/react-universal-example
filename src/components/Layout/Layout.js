import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import Side from '../Side';
import s from './styles';

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Grid container wrap="wrap">
          <Grid item lg={8} md={7} sm={6} xs={12}>
            {this.props.children}
          </Grid>
          <Grid className={classes.divider} item xs />
          <Grid item lg={3} md={4} sm={5} xs={12}>
            <Side />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(s)(Layout);

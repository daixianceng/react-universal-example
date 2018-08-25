import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import s from './styles';

class Footer extends React.Component {
  static propTypes = {
    classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid className={classes.container} container justify="center">
          <Grid item lg={8} md={10} xs>
            <div className={classes.copyright}>
              <Typography>
                Copyright © {dayjs().year()} {process.env.APP_NAME}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(s)(Footer);

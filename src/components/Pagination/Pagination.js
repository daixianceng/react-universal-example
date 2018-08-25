import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import Link from '../Link';
import s from './styles';

class Pagination extends React.Component {
  static propTypes = {
    baseUrl: PropTypes.string,
    current: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired, // Total number of pages
    classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  static defaultProps = {
    baseUrl: '',
  };

  render() {
    const { baseUrl, current, total, classes } = this.props;

    return total <= 1 ? null : (
      <div className={classes.root}>
        <Grid container justify="center" spacing={16}>
          <Grid item>
            <Button
              component={Link}
              to={`${baseUrl}?page=${current - 1}`}
              variant="fab"
              color="primary"
              disabled={current <= 1}
              aria-label="previous"
              mini
            >
              <NavigateBeforeIcon />
            </Button>
          </Grid>
          <Grid className={classes.current} item>
            <Button
              className={classes.currentButton}
              component="span"
              variant="fab"
              color="secondary"
              aria-label="current"
              mini
            >
              {current}
            </Button>
          </Grid>
          <Grid item>
            <Button
              component={Link}
              to={`${baseUrl}?page=${current + 1}`}
              variant="fab"
              color="primary"
              disabled={current >= total}
              aria-label="next"
              mini
            >
              <NavigateNextIcon />
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default withStyles(s)(Pagination);

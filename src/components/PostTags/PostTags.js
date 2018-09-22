import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import s from './styles';

class PostTags extends React.Component {
  static propTypes = {
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    date: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  renderDate = date => {
    if (typeof date === 'string') {
      return date;
    }
    return dayjs(date).format('MMMM DD, YYYY');
  };

  render() {
    const { tags, date, classes } = this.props;

    return (
      <CardContent>
        <Grid container spacing={16}>
          <Grid className={classes.tags} item xs>
            {tags.map(tag => (
              <Chip
                className={classes.tag}
                label={tag}
                color="default"
                key={tag}
              />
            ))}
          </Grid>
          <Grid className={classes.date} item>
            <Typography variant="caption" align="right" noWrap>
              {this.renderDate(date)}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    );
  }
}

export default withStyles(s)(PostTags);

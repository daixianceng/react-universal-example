import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import cx from 'classnames';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import s from './styles';

class Post extends React.Component {
  static propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    date: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    children: PropTypes.node.isRequired,
    classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  renderDate = date => {
    if (typeof date === 'string') {
      return date;
    }
    return dayjs(date).format('MMMM DD, YYYY');
  };

  render() {
    const {
      image,
      title,
      tags,
      date,
      children,
      classes,
      ...props
    } = this.props;

    return (
      <div {...props}>
        <Card className="theme-transition">
          <CardMedia
            className={cx('theme-transition', classes.media)}
            image={image}
            title={title}
          />
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
          <Divider />
          {children}
        </Card>
      </div>
    );
  }
}

export default withStyles(s)(Post);

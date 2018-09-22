import React from 'react';
import PropTypes from 'prop-types';

import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import Link from 'components/Link';
import s from './styles';

class PostIntro extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  render() {
    const { title, url, content, classes } = this.props;

    return (
      <CardContent>
        <Typography className={classes.title} variant="headline" gutterBottom>
          <Link className={classes.titleLink} to={url}>
            {title}
          </Link>
        </Typography>
        <Typography className={classes.content}>{content}</Typography>
      </CardContent>
    );
  }
}

export default withStyles(s)(PostIntro);

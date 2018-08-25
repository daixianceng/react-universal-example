import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import s from './styles';

class PostContent extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  render() {
    const { title, content, classes } = this.props;

    return (
      <CardContent>
        <Typography className={classes.title} variant="headline" gutterBottom>
          {title}
        </Typography>
        <div
          className={cx('typesetting', classes.content)}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </CardContent>
    );
  }
}

export default withStyles(s)(PostContent);

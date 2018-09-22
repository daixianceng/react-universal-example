import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import CardMedia from '@material-ui/core/CardMedia';
import { withStyles } from '@material-ui/core/styles';

import s from './styles';

class PostCover extends React.Component {
  static propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string,
    classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  static defaultProps = {
    title: undefined,
  };

  render() {
    const { image, title, classes } = this.props;

    return (
      <CardMedia
        className={cx('theme-transition', classes.media)}
        image={image}
        title={title}
      />
    );
  }
}

export default withStyles(s)(PostCover);

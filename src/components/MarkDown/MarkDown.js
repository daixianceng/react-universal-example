import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import s from './styles';

class MarkDown extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    html: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  render() {
    const { title, html, classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.markdown}>
          <div className={classes.markdownHeader}>{title}</div>
          <div
            className={cx('markdown-body', classes.markdownBody)}
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(s)(MarkDown);

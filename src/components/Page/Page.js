import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import s from './styles';

class Page extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  render() {
    const { title, classes } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <Typography gutterBottom variant="headline">
            {title}
          </Typography>
          <div className={classes.content}>{this.props.children}</div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Page);

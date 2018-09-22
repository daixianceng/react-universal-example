import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

import Link from 'components/Link';
import CommentCount from 'components/CommentCount';
import s from './styles';

class PostActions extends React.Component {
  static propTypes = {
    postId: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  render() {
    const { postId, url, classes } = this.props;

    return (
      <CardActions>
        <Grid container>
          <Grid className={classes.actionLeft} item>
            {process.env.BROWSER &&
              process.env.DISQUS_ENABLE === '1' && (
                <Button
                  component={Link}
                  to={`${url}#comment-${postId}`}
                  size="small"
                  color="primary"
                >
                  <CommentCount identifier={postId} />
                </Button>
              )}
          </Grid>
          <Grid className={classes.actionRight} item>
            <Button component={Link} to={url} size="small" color="primary">
              Read More
            </Button>
          </Grid>
        </Grid>
      </CardActions>
    );
  }
}

export default withStyles(s)(PostActions);

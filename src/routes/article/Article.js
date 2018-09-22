import React from 'react';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';

import PostCover from 'components/PostCover';
import PostTags from 'components/PostTags';
import PostContent from 'components/PostContent';
import Discussion from 'components/Discussion';
import s from './styles';

class Article extends React.Component {
  static propTypes = {
    post: PropTypes.shape({
      id: PropTypes.string.isRequired,
      categoryId: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      tagCollection: PropTypes.arrayOf(PropTypes.string).isRequired,
      coverURL: PropTypes.string,
      content: PropTypes.string.isRequired,
      authorId: PropTypes.number.isRequired,
      createdAt: PropTypes.number.isRequired,
      updatedAt: PropTypes.number.isRequired,
    }).isRequired,
    classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  render() {
    const { post, classes } = this.props;
    return (
      <>
        <div className={classes.card}>
          <Card className="theme-transition">
            {post.coverURL && (
              <>
                <PostCover image={post.coverURL} title={post.title} />
                <PostTags
                  tags={post.tagCollection}
                  date={post.createdAt * 1000}
                />
                <Divider />
              </>
            )}
            <PostContent title={post.title} content={post.content} />
          </Card>
        </div>
        <Discussion
          id={`comment-${post.id}`}
          className={classes.card}
          post={post}
        />
      </>
    );
  }
}

export default withStyles(s)(Article);

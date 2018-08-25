import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Post from '../../components/Post';
import PostContent from '../../components/PostContent';
import s from './styles';

class Article extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      id: PropTypes.string.isRequired,
      categoryId: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
      tagCollection: PropTypes.arrayOf(PropTypes.string).isRequired,
      coverURL: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
      authorId: PropTypes.number.isRequired,
      createdAt: PropTypes.number.isRequired,
      updatedAt: PropTypes.number.isRequired,
    }).isRequired,
    classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  render() {
    const { data, classes } = this.props;
    return (
      <Post
        className={classes.post}
        image={data.coverURL}
        title={data.title}
        tags={data.tagCollection}
        date={data.createdAt * 1000}
      >
        <PostContent title={data.title} content={data.content} />
      </Post>
    );
  }
}

export default withStyles(s)(Article);

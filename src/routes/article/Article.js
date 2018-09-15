import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import Post from 'components/Post';
import PostContent from 'components/PostContent';
import { toUrl } from 'utils';
import s from './styles';

let Disqus;
if (process.env.BROWSER && process.env.DISQUS_ENABLE === '1') {
  Disqus = require('disqus-react'); // eslint-disable-line global-require
}

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
    const disqusConfig = {
      url: toUrl('article', { articleKey: data.key }, true),
      identifier: data.id,
      title: data.title,
      category_id: data.categoryId,
    };
    return (
      <>
        <Post
          className={classes.post}
          image={data.coverURL}
          title={data.title}
          tags={data.tagCollection}
          date={data.createdAt * 1000}
        >
          <PostContent title={data.title} content={data.content} />
        </Post>
        {Disqus && (
          <Disqus.DiscussionEmbed
            shortname={process.env.DISQUS_SHORTNAME}
            config={disqusConfig}
          />
        )}
      </>
    );
  }
}

export default withStyles(s)(Article);

import React from 'react';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';

import PostActions from 'components/PostActions';
import PostCover from 'components/PostCover';
import PostIntro from 'components/PostIntro';
import PostTags from 'components/PostTags';
import Pagination from 'components/Pagination';
import { toUrl } from '../../router';
import s from './styles';

class Home extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      items: PropTypes.arrayOf(PropTypes.object).isRequired,
      pagination: PropTypes.object.isRequired,
    }).isRequired,
    classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  render() {
    const {
      data: { items, pagination },
      classes,
    } = this.props;

    return (
      <>
        {items.map(item => {
          const url = toUrl('article', { articleKey: item.key });
          return (
            <div className={classes.post} key={item.id}>
              <Card className="theme-transition">
                {item.coverURL ? (
                  <>
                    <PostCover image={item.coverURL} title={item.title} />
                    <PostTags
                      tags={item.tagCollection}
                      date={item.createdAt * 1000}
                    />
                    <Divider />
                    <PostIntro
                      title={item.title}
                      url={url}
                      content={item.intro}
                    />
                  </>
                ) : (
                  <>
                    <PostIntro
                      title={item.title}
                      url={url}
                      content={item.intro}
                    />
                    <Divider />
                  </>
                )}

                <PostActions postId={item.id} url={url} />
              </Card>
            </div>
          );
        })}
        <div className={classes.pagination}>
          <Pagination
            current={pagination.currentPage}
            total={pagination.pageCount}
          />
        </div>
      </>
    );
  }
}

export default withStyles(s)(Home);

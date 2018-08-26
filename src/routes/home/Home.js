import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import Link from 'components/Link';
import Post from 'components/Post';
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
        {items.map(item => (
          <Post
            image={item.coverURL}
            title={item.title}
            tags={item.tagCollection}
            date={item.createdAt * 1000}
            className={classes.post}
            key={item.id}
          >
            <CardContent>
              <Typography
                className={classes.title}
                variant="headline"
                gutterBottom
              >
                <Link
                  className={classes.titleLink}
                  to={toUrl('article', { articleKey: item.key })}
                >
                  {item.title}
                </Link>
              </Typography>
              <Typography className={classes.intro}>{item.intro}</Typography>
            </CardContent>
            <CardActions className={classes.actions}>
              <Button
                component={Link}
                to={toUrl('article', { articleKey: item.key })}
                size="small"
                color="primary"
              >
                Read More
              </Button>
            </CardActions>
          </Post>
        ))}
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

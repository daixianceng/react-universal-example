import React from 'react';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { withStyles } from '@material-ui/core/styles';

import { toUrl } from 'utils';
import s from './styles';

let Disqus;
if (process.env.BROWSER && process.env.DISQUS_ENABLE === '1') {
  Disqus = require('disqus-react'); // eslint-disable-line global-require
}

class Discussion extends React.Component {
  static propTypes = {
    post: PropTypes.shape({
      id: PropTypes.string.isRequired,
      categoryId: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      key: PropTypes.string.isRequired,
    }).isRequired,
    classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  render() {
    const { post, classes, ...props } = this.props;

    return Disqus ? (
      <div {...props}>
        <Card className={classes.card}>
          <CardContent>
            <Disqus.DiscussionEmbed
              shortname={process.env.DISQUS_SHORTNAME}
              config={{
                url: toUrl('article', { articleKey: post.key }, true),
                identifier: post.id,
                title: post.title,
                category_id: post.categoryId,
              }}
            />
          </CardContent>
        </Card>
      </div>
    ) : null;
  }
}

export default withStyles(s)(Discussion);

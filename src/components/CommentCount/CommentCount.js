import React from 'react';
import PropTypes from 'prop-types';

let Disqus;
if (process.env.BROWSER && process.env.DISQUS_ENABLE === '1') {
  Disqus = require('disqus-react'); // eslint-disable-line global-require
}

class CommentCount extends React.Component {
  static propTypes = {
    identifier: PropTypes.string.isRequired,
  };

  render() {
    const { identifier, ...props } = this.props;

    return Disqus ? (
      <span {...props}>
        <Disqus.CommentCount
          shortname={process.env.DISQUS_SHORTNAME}
          config={{
            identifier,
          }}
        >
          Comments
        </Disqus.CommentCount>
      </span>
    ) : null;
  }
}

export default CommentCount;

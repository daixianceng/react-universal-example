import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Page from 'components/Page';

class NotFound extends React.Component {
  static propTypes = {
    title: PropTypes.string,
  };
  static defaultProps = {
    title: 'Page Not Found (404)',
  };

  render() {
    return (
      <Page title={this.props.title}>
        <Typography>
          Sorry, the page you were trying to view does not exist.
        </Typography>
      </Page>
    );
  }
}

export default NotFound;

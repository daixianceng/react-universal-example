import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import Page from 'components/Page';

class ErrorPage extends React.Component {
  static propTypes = {
    error: PropTypes.shape({
      name: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
      stack: PropTypes.string.isRequired,
    }),
  };

  static defaultProps = {
    error: null,
  };

  render() {
    if (__DEV__ && this.props.error) {
      return (
        <Page title={this.props.error.name}>
          <Typography component="pre">{this.props.error.stack}</Typography>
        </Page>
      );
    }

    return (
      <Page title="Error">
        <Typography>Sorry, a critical error occurred on this page.</Typography>
      </Page>
    );
  }
}

export default ErrorPage;

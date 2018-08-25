import React from 'react';
import PropTypes from 'prop-types';
import Chip from '@material-ui/core/Chip';
import Typography from '@material-ui/core/Typography';
import Page from 'components/Page';

class Contact extends React.Component {
  static propTypes = {
    title: PropTypes.string,
  };
  static defaultProps = {
    title: 'Contact',
  };

  render() {
    return (
      <Page title={this.props.title}>
        <Typography>
          Please email me at &nbsp;&nbsp;
          <Chip
            label={process.env.ADMIN_EMAIL}
            color="default"
            component="a"
            href={`mailto:${process.env.ADMIN_EMAIL}`}
            clickable
          />
        </Typography>
      </Page>
    );
  }
}

export default Contact;

import React from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';

import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { withTheme } from '@material-ui/core/styles';
import ColorLensIcon from '@material-ui/icons/ColorLens';

import { themes } from 'getTheme';

class ThemeMenu extends React.Component {
  static propTypes = {
    theme: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  static contextTypes = {
    cookies: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    };
  }

  handleOpen = event => {
    this.setState({
      anchorEl: event.currentTarget,
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
    });
  };

  handleSwitch = key => {
    this.context.cookies.set('theme', key, {
      path: process.env.APP_BASE_URL,
      expires: dayjs()
        .add(6, 'month')
        .toDate(),
    });
    window.rerender();
    this.handleClose();
  };

  render() {
    // eslint-disable-next-line no-shadow
    const { theme, ...props } = this.props;
    const { anchorEl } = this.state;

    return (
      <div {...props}>
        <IconButton
          aria-haspopup="true"
          aria-label="Menu"
          color="inherit"
          onClick={this.handleOpen}
          title="Switch theme"
        >
          <ColorLensIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          disableAutoFocusItem
        >
          {[...themes.entries()].map(([key, item]) => (
            <MenuItem
              onClick={
                item.source === theme ? undefined : () => this.handleSwitch(key)
              }
              selected={item.source === theme}
              key={key}
            >
              {item.name}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

export default withTheme()(ThemeMenu);

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import HomeIcon from '@material-ui/icons/Home';
import MessageIcon from '@material-ui/icons/Message';
import ViewListIcon from '@material-ui/icons/ViewList';
import DomainIcon from '@material-ui/icons/DomainOutlined';

import {
  close as closeNavDrawer,
  open as openNavDrawer,
} from 'actions/navDrawer';
import { getAllCategoriesIfNeeded } from 'actions/category';
import Link from '../Link';
import { toUrl } from '../../router';
import s from './styles';

class NavDrawer extends React.Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
    closeNavDrawer: PropTypes.func.isRequired,
    openNavDrawer: PropTypes.func.isRequired,
    getAllCategoriesIfNeeded: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  componentDidMount() {
    this.props.getAllCategoriesIfNeeded();
  }

  handleClose = () => {
    this.props.closeNavDrawer();
  };

  handleOpen = () => {
    this.props.openNavDrawer();
  };

  render() {
    const { open, categories, classes } = this.props;

    return (
      <SwipeableDrawer
        open={open}
        onClose={this.handleClose}
        onOpen={this.handleOpen}
      >
        <div className={classes.container}>
          <List>
            <ListItem
              button
              component={Link}
              to={toUrl('home')}
              onClick={this.handleClose}
            >
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
          </List>
          <Divider />
          <List component="nav">
            <ListItem>
              <ListItemIcon>
                <ViewListIcon />
              </ListItemIcon>
              <ListItemText primary="Categories" />
            </ListItem>
            {categories.map(category => (
              <ListItem
                button
                component={Link}
                to={toUrl('category', { categoryKey: category.key })}
                onClick={this.handleClose}
                key={category.id}
              >
                <ListItemText inset primary={category.name} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            <ListItem
              button
              component={Link}
              to={toUrl('contact')}
              onClick={this.handleClose}
            >
              <ListItemIcon>
                <MessageIcon />
              </ListItemIcon>
              <ListItemText primary="Contact" />
            </ListItem>
            <ListItem
              button
              component={Link}
              to={toUrl('about')}
              onClick={this.handleClose}
            >
              <ListItemIcon>
                <DomainIcon />
              </ListItemIcon>
              <ListItemText primary="About" />
            </ListItem>
          </List>
        </div>
      </SwipeableDrawer>
    );
  }
}

const mapState = state => ({
  open: state.navDrawer.open,
  categories: state.category.all || [],
});

const mapDispatch = {
  closeNavDrawer,
  openNavDrawer,
  getAllCategoriesIfNeeded,
};

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(NavDrawer));

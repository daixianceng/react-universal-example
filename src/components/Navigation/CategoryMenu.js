import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { getAllCategoriesIfNeeded } from 'actions/category';
import Link from '../Link';
import { toUrl } from '../../router';

class CategoryMenu extends React.Component {
  static propTypes = {
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
    getAllCategoriesIfNeeded: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
    };
  }

  componentDidMount() {
    this.props.getAllCategoriesIfNeeded();
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

  render() {
    // eslint-disable-next-line no-shadow
    const { categories, getAllCategoriesIfNeeded, ...props } = this.props;
    const { anchorEl } = this.state;

    return (
      <div {...props}>
        <Button aria-haspopup="true" color="inherit" onClick={this.handleOpen}>
          Categories
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
          disableAutoFocusItem
        >
          {categories.map(category => (
            <MenuItem
              component={Link}
              to={toUrl('category', { categoryKey: category.key })}
              onClick={this.handleClose}
              key={category.id}
            >
              {category.name}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
}

const mapState = state => ({
  categories: state.category.all || [],
});

const mapDispatch = {
  getAllCategoriesIfNeeded,
};

export default connect(
  mapState,
  mapDispatch,
)(CategoryMenu);

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import cx from 'classnames';

import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import { getAllCategoriesIfNeeded } from 'actions/category';
import Link from '../Link';
import { toUrl } from '../../router';
import s from './styles';

class Side extends React.Component {
  static propTypes = {
    categories: PropTypes.arrayOf(PropTypes.object).isRequired,
    getAllCategoriesIfNeeded: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  };

  componentDidMount() {
    this.props.getAllCategoriesIfNeeded();
  }

  render() {
    const { categories, classes } = this.props;

    return (
      <div className={classes.root}>
        <Card className={cx('theme-transition', classes.card)}>
          <CardContent>
            <Typography gutterBottom variant="headline">
              About Me
            </Typography>
            <div className={classes.avatarContainer}>
              <Avatar
                alt="Avatar"
                src="avatar.png"
                className={cx('theme-transition', classes.avatar)}
              />
            </div>
            <Typography
              className={classes.aboutContent}
              dangerouslySetInnerHTML={{ __html: process.env.ABOUT_ME }}
            />
          </CardContent>
        </Card>
        <Card
          className={cx('theme-transition', classes.card, classes.categoryCard)}
        >
          <CardContent>
            <Typography gutterBottom variant="headline">
              Categories
            </Typography>
            <List>
              {categories.map(category => (
                <CategoryItem category={category} key={category.id} />
              ))}
            </List>
          </CardContent>
        </Card>
        <Card className={cx('theme-transition', classes.card)}>
          <CardContent>
            <Typography gutterBottom variant="headline">
              Links
            </Typography>
          </CardContent>
          <List component="nav">
            <ListItem
              button
              component="a"
              href="https://github.com/daixianceng"
              target="_blank"
            >
              <ListItemText primary="Github" />
            </ListItem>
            <ListItem
              button
              component="a"
              href="https://fsb.zhaidongxi.com/"
              target="_blank"
            >
              <ListItemText primary="FSB License" />
            </ListItem>
          </List>
        </Card>
      </div>
    );
  }
}

const CategoryItem = ({ category }) => {
  const path = toUrl('category', { categoryKey: category.key });
  return (
    <ListItem disableGutters>
      <Chip
        label={category.name}
        color="default"
        component={Link}
        to={path}
        clickable
      />
      <ListItemSecondaryAction>
        <Chip label={category.posts} color="default" />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

CategoryItem.propTypes = {
  category: PropTypes.shape({
    key: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    posts: PropTypes.string.isRequired,
  }).isRequired,
};

const mapState = state => ({
  categories: state.category.all || [],
});

const mapDispatch = {
  getAllCategoriesIfNeeded,
};

export default connect(
  mapState,
  mapDispatch,
)(withStyles(s)(Side));

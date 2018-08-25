import { merge } from 'lodash';
import { createMuiTheme } from '@material-ui/core/styles';

// Theme options
import elegantBlack from './themes/elegant-black';
import romanticPurple from './themes/romantic-purple';

function createTheme(theme) {
  const themeOptions = merge(
    {
      props: {
        MuiWithWidth: {
          // Initial width property
          initialWidth: process.env.BROWSER
            ? undefined
            : global.muiInitialWidth,
        },
      },
    },
    theme,
  );

  return createMuiTheme(themeOptions);
}

const themes = new Map();

if (process.env.BROWSER) {
  themes.set('Elegant Black', createTheme(elegantBlack));
  themes.set('Romantic Purple', createTheme(romanticPurple));
}

function getTheme(key) {
  if (process.env.BROWSER) {
    return themes.get(key) || themes.get('Romantic Purple');
  }
  switch (key) {
    case 'Elegant Black':
      return createTheme(elegantBlack);
    case 'Romantic Purple':
    default:
      return createTheme(romanticPurple);
  }
}

export { themes };
export default getTheme;

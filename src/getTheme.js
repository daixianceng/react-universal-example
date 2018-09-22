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
  themes.set('elegant-black', {
    name: 'Elegant Black',
    source: createTheme(elegantBlack),
  });
  themes.set('romantic-purple', {
    name: 'Romantic Purple',
    source: createTheme(romanticPurple),
  });
}

function getTheme(key) {
  if (process.env.BROWSER) {
    return themes.get(key) || themes.get('romantic-purple');
  }
  switch (key) {
    case 'elegant-black':
      return {
        name: 'Elegant Black',
        source: createTheme(elegantBlack),
      };
    case 'romantic-purple':
    default:
      return {
        name: 'Romantic Purple',
        source: createTheme(romanticPurple),
      };
  }
}

export { themes };
export default getTheme;

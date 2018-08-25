import React from 'react';
import NotFound from './NotFound';

const title = 'Page Not Found';

function action() {
  return {
    title,
    component: <NotFound title={title} />,
    status: 404,
  };
}

export default action;

import React from 'react';
import Contact from './Contact';

const title = 'Contact';

function action() {
  return {
    title,
    component: <Contact title={title} />,
  };
}

export default action;

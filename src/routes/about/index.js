import React from 'react';
import MarkDown from '../../components/MarkDown';
import about from './about.md';

function action() {
  return {
    title: about.title,
    component: <MarkDown {...about} />,
  };
}

export default action;

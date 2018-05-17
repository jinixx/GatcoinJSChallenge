import React from 'react';
import PropTypes from 'prop-types';

const Titlebar = ({ title }) => (
  <div className="app__pagetitle">
    <div className="app__container">
      {
        title
      }
    </div>
  </div>
);

Titlebar.propTypes = {
  title: PropTypes.string,
};

Titlebar.defaultProps = {
  title: '',
};

export default Titlebar;

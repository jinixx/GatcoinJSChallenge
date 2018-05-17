import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProgramType = ({ to, title, label }) => (
  <Link to={to} className="programtype">
    <div className="cover">
      <div className="coverlabel">
        { label }
      </div>
    </div>
    <span className="title">{ title }</span>
  </Link>
);

ProgramType.propTypes = {
  label: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default ProgramType;

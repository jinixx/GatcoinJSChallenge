import React from 'react';
import PropTypes from 'prop-types';

const Video = ({ title, cover, onClick }) => (
  <div className="video" onClick={onClick}>
    <div className="cover" style={{ backgroundImage: `url(${cover})` }}>&nbsp;</div>
    <span className="title">{ title }</span>
  </div>
);

Video.propTypes = {
  cover: PropTypes.string,
  onClick: PropTypes.func,
  title: PropTypes.string,
};

Video.defaultProps = {
  cover: 'http://bookzart.com/desktop/images/default-book-cover.png',
  onClick: () => {},
  title: 'Title Unavailable',
};

export default Video;

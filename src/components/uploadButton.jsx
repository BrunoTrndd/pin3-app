import React from 'react';
import PropTypes from 'prop-types';

const UploadButton = ({ onClick }) => {
  return (
    <button onClick={onClick}>
      Upload
    </button>
  );
};

UploadButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default UploadButton;

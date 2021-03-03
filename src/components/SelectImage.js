import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box } from '@chakra-ui/core';

const Checkmark = ({ selected }) => (
  <div
    style={
      selected
        ? { right: "20px", bottom: "20px", position: "absolute", zIndex: "1" }
        : { display: "none" }
    }
  >
    <svg
      style={{ fill: "#fff", position: "absolute" }}
      width="24px"
      height="24px"
    >
      <circle cx="12.5" cy="12.2" r="8.292" />
    </svg>
    <svg
      style={{ fill: "#0D8700", position: "absolute" }}
      width="40px"
      height="40px"
    >
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
  </div>
);

const imgStyle = {
    transition: "transform .135s cubic-bezier(0.0,0.0,0.2,1),opacity linear .15s",
    borderRadius: "20px",
    maxWidth: "250px",
    maxHeight: "250px"
};
const selectedImgStyle = {
  transform: "translateZ(0px) scale3d(0.9, 0.9, 1)",
  transition: "transform .135s cubic-bezier(0.0,0.0,0.2,1),opacity linear .15s"
};

const cont = {
  backgroundColor: "#eee",
  cursor: "pointer",
  overflow: "hidden",
  position: "relative"
};

const SelectedImage = ({
  index,
  photo,
  margin,
  selected
}) => {
  const [isSelected, setIsSelected] = useState(selected);


  const handleOnClick = e => {
    setIsSelected(!isSelected);
  };

  useEffect(() => {
    setIsSelected(selected);
  }, [selected]);

  return (
      <Box
          m={5}
          className={!isSelected ? "not-selected" : ""}
    >
      <Checkmark selected={isSelected ? true : false} />
      <img
        alt={photo.title}
        style={
          isSelected ? { ...imgStyle, ...selectedImgStyle } : { ...imgStyle }
        }
        {...photo}
        onClick={handleOnClick}
      />
      <style>{`.not-selected:hover{outline:2px solid #06befa}`}</style>
    </Box>
  );
};

Checkmark.propTypes = {
    selected: PropTypes.bool
}

SelectedImage.propTypes = {
    photo: PropTypes.objectOf(PropTypes.string), 
    index: PropTypes.string,
    selected: PropTypes.bool, 
}

export default SelectedImage;


import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, useDisclosure } from '@chakra-ui/core';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/core";

const Checkmark = ({ selected, select }) => (
  <div
        style={
            !select ?
                { display: 'none' }
                : { right: "50px", bottom: "50px", position: "absolute", zIndex: "1" }

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
            style={
                selected ?  
                    { fill: "#0D8700", position: "absolute" }
                    : { fill: "#1D1F23", position: "absolute" }
            }
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

const cont = {
  cursor: "pointer",
  overflow: "hidden",
  position: "relative"
};


const SelectedImage = ({
  index,
  photo,
  margin,
  select,
  selected,
  handleSelected,
}) => {
  const [isSelected, setIsSelected] = useState(selected);
  const [selection, setSelection] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef()
  

  const handleOnClick = () => {
    if (select) {
      if (selected) handleSelected(photo.src, 'add');
      if (!selection) {
        handleSelected(photo, 'remove');
        setIsSelected(!isSelected);
        setSelection(true);
      } else {
        handleSelected(photo, 'add');
        setIsSelected(!isSelected);
        setSelection(false);
      }
    } 
  };

  useEffect(() => {
    setIsSelected(selected);
  }, [selected]);

  return (
    <>
      <Box
        style={{ margin, height: photo.height, width: photo.width, ...cont }}
        onClick={select ? handleOnClick : onOpen}
        ref={finalRef}
        tabIndex={-1}
        aria-label="Focus moved to this box"
      >
      <Checkmark selected={isSelected ? true : false} select={select ? true : false} />
      <img
        alt={photo.title}
        style={
          isSelected ? { ...imgStyle } : { ...imgStyle }
        }
        {...photo}
      />
      <style>{`.not-selected:hover{outline:2px solid #06befa}`}</style>
      </Box>
      <Modal isCentered inalFocusRef={finalRef} isOpen={isOpen} onClose={onClose} colorScheme='whiteAlpha' size='lg'>
        <ModalOverlay />
        <ModalContent justifyContent='center' alignContent='center' flexDirection='column' borderRadius={20}>
            <ModalCloseButton/>
            <ModalBody mt={ 10 } alignSelf='center'>
              <img alt={photo.title} {...photo} />
            </ModalBody>
            <ModalFooter display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
            <Button colorScheme="blue" mb={2.5} w={140} h={45} onClick={handleOnClick}>Approve</Button>
              <Button colorScheme="blue"onClick={onClose} mb={2.5} w={140} h={45} bg="#F2D0D0">
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
      </Modal>

    </>
  );
};


Checkmark.propTypes = {
    selected: PropTypes.bool
}

SelectedImage.propTypes = {
    photo: PropTypes.objectOf(PropTypes.string), 
    index: PropTypes.string,
    selected: PropTypes.bool, 
    select: PropTypes.bool
}

export default SelectedImage;


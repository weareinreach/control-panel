import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
import {Box, Button, Flex, Text, useDisclosure} from '@chakra-ui/react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';
import Checkmark from '../components/icons/Checkmark';

// Still needs the following features
// send single approved photo to db
// remove approved photos from db

const imgStyle = {
  transition: 'transform .135s cubic-bezier(0.0,0.0,0.2,1),opacity linear .15s',
  borderRadius: '20px',
};

const cont = {
  cursor: 'pointer',
  overflow: 'hidden',
  position: 'relative',
  maxWidth: 250,
  maxHeight: 250,
  outline: 'none',
};

const SelectedImage = ({
  index,
  view,
  photo,
  margin,
  editSelection,
  selectAll,
  handleSelected,
  approvePhoto,
  confirmAction,
}) => {
  const [isSelected, setIsSelected] = useState(selectAll);
  const {isOpen, onOpen, onClose} = useDisclosure();
  const finalRef = useRef();

  useEffect(() => {
    setIsSelected(selectAll);
  }, [selectAll]);

  const handleOnClick = () => {
    if (view === 'approved') {
      handleSelected(photo, 'add');
      confirmAction();
      return;
    }
    if (selectAll || editSelection) {
      handleSelected(photo, isSelected ? 'remove' : 'add');
      setIsSelected(!isSelected);
      return;
    } else {
      approvePhoto(photo);
    }
    onClose();
  };

  return (
    <>
      <Box
        style={{margin, ...cont}}
        onClick={editSelection ? handleOnClick : onOpen}
        ref={finalRef}
        tabIndex={-1}
        aria-label="Focus moved to this box"
      >
        <Checkmark isSelected={isSelected} editSelection={editSelection} />
        <img
          alt={photo.title}
          style={selectAll ? {...imgStyle} : {...imgStyle}}
          width={'250'}
          height={'250'}
          {...photo}
        />
        <style>{`.not-selected:hover{outline:2px solid #06befa}`}</style>
      </Box>
      <ActionModal
        finalRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
        photo={photo}
        view={view}
        handleOnClick={handleOnClick}
      />
    </>
  );
};

const ActionModal = ({
  finalRef,
  isOpen,
  onClose,
  photo,
  handleOnClick,
  view,
}) => (
  <Modal
    isCentered
    inalFocusRef={finalRef}
    isOpen={isOpen}
    onClose={onClose}
    colorScheme="whiteAlpha"
    size="lg"
  >
    <ModalOverlay />
    <ModalContent
      justifyContent="center"
      alignContent="center"
      flexDirection="column"
      borderRadius={20}
    >
      <ModalCloseButton style={{outline: 'none'}} />
      <ModalBody mt={10} alignSelf="center">
        <img alt={photo.title} {...photo} />
      </ModalBody>
      <ModalFooter
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
      >
        <Button
          colorScheme="blue"
          mb={2.5}
          w={140}
          h={45}
          onClick={handleOnClick}
          _active={{backgroundColor: '#3A81C9', color: '#fff'}}
          _hover={{backgroundColor: '#3A81C9', color: '#fff'}}
        >
          {view !== 'approved' ? 'Approve' : 'Unapprove'}
        </Button>
        <Button
          colorScheme="blue"
          onClick={onClose}
          mb={2.5}
          w={140}
          h={45}
          bg="#F2D0D0"
        >
          Cancel
        </Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);

Checkmark.propTypes = {
  selected: PropTypes.bool,
  select: PropTypes.bool,
};

SelectedImage.propTypes = {
  photo: PropTypes.shape({
    src: PropTypes.string,
    foursquare_vendor_id: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number,
  }),
  index: PropTypes.number,
  selected: PropTypes.bool,
  select: PropTypes.bool,
  margin: PropTypes.number,
  handleSelected: PropTypes.func,
};

export default SelectedImage;

import React, {useState, useEffect, useCallback, useRef} from 'react';
import PropTypes from 'prop-types';
import axios, {get, patch, post, put} from 'axios';
import {Box, Button, Flex, useDisclosure, Link, Text} from '@chakra-ui/react';
import {createStandaloneToast} from '@chakra-ui/react';
import {SectionTitle} from '../components/styles';
import Gallery from 'react-photo-gallery';
import {includes, difference} from 'ramda'
import SelectedImage from '../components/SelectImage';
import {CATALOG_API_URL} from '../utils';
import {ReactComponent as Tada} from '../assets/vectors/tada.svg';
import {ReactComponent as Caution} from '../assets/vectors/warning-question.svg';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react';

//Needs to be done
//Refactor delete functionality
//add React Router to links in Modals for approved and unapproved Galleries

const fourSquarePhotosApiURL = process.env.REACT_APP_FOUR_SQUARE_PHOTOS_URL;
const fourSquareVenuesApiURL = process.env.REACT_APP_FOUR_SQUARE_VENUES_URL;
const clientID = process.env.REACT_APP_FOUR_SQUARE_CLIENT_ID;
const clientSecret = process.env.REACT_APP_FOUR_SQUARE_CLIENT_SECRET;
const size = 300;
const buttonStyles = {
  boxShadow: 'none',
};
const FormPhotos = ({photos, name, location, organizationId, venue_id}) => {
  const toast = createStandaloneToast();
  const lat = location?.lat;
  const long = location?.long;
  const city = location?.city;
  const [selectAll, setSelectAll] = useState(false);
  const [editSelection, setEditSelection] = useState(false);
  const [fourSquarePhotos, setFourSquarePhotos] = useState([]);
  const [approvedPhotos, setApprovedPhotos] = useState(photos ?? null);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [venueId, setVenueId] = useState(venue_id ?? null);

  const [view, setView] = useState(
    photos && photos.length > 0 ? 'approved' : 'fourSquarePhotos'
  );

  const {onOpen, isOpen, onClose} = useDisclosure();
  const approvedRef = useRef();
  const disApprovedRef = useRef();
  const url = `${CATALOG_API_URL}/organizations/${organizationId}`;

  useEffect(() => {
    if (!venueId) {
      getVendorId();
      return;
    }
    fetchPhotos(venueId);
  }, [venueId]);

  useEffect(() => {
    if (selectAll) {
      if (selectedPhotos.length > 0) setSelectedPhotos([]);
      if (view === 'fourSquarePhotos') {
        setSelectedPhotos(selectedPhotos.concat(fourSquarePhotos));
      } else {
        setSelectedPhotos(selectedPhotos.concat(photos));
      }
      setSelectAll(true);
    }
  }, [selectAll]);

  const toggleSelectAll = () => {
    if (selectAll) {
      setSelectedPhotos([]);
    }
    setSelectAll(!selectAll);
  };

  const toggleEditSelection = () => {
    setEditSelection(!editSelection);
  };

  const handleCancel = () => {
    if (editSelection) {
      setSelectAll(false);
      setEditSelection(false);
      setSelectedPhotos([]);
    }
  };

  const handleError = () =>{
    toast({
      title: 'An error occurred',
      description: 'We ran into an error processing your request',
      status: 'error',
      duration: 4000,
      position: "top",
      isClosable: true,
    });
  }

  const photoAlreadyApproved = () =>{
    toast({
      title: 'Cannot perform action',
      description: 'Selected photo(s) are already approved',
      status: 'warning',
      duration: 4000,
      position: "top",
      isClosable: true,
    });
  }

  const getVendorId = async function () {
    try {
      const response =
        lat && long
          ? await get(
              `${fourSquareVenuesApiURL}?name=${name}&ll=${lat},${long}&client_id=${clientID}&client_secret=${clientSecret}&v=20200101&intent=match`
            )
          : city
          ? await get(
              `${fourSquareVenuesApiURL}?query=${name}&near=${city}&client_id=${clientID}&client_secret=${clientSecret}&v=20200101&intent=browse&radius=10000`
            )
          : null;
      if (!response) {
        return setView('no-fourSquarePhotos-found');
      }
      const {venues} = response?.data?.response || null;
      if (venues && venues.length > 0) {
        const target =
          venues.find(
            (venue) =>
              venue.name.toLowerCase().trim().includes(name.toLowerCase().trim())
          ) ?? null;
        if (target) {
          await patch(url, {venue_id: target.id});
          setVenueId(target.id);
        }
      } else {
        return setView('no-fourSquarePhotos-found');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const fetchPhotos = async () => {
    try {
      if (fourSquarePhotos.length > 0) {
        return setView('fourSquarePhotos');
      }
      const response = await get(
        `${fourSquarePhotosApiURL}${venueId}/photos?client_id=${clientID}&client_secret=${clientSecret}&v=20200101&group=venue&limit=25`
      );
      const {
        photos: {items: photos},
      } = response?.data?.response ?? null;
      if (!photos || photos.length < 1) {
        return setView('no-fourSquarePhotos-found');
      }
      const retrievedPhotos = photos.map((image) => {
        return {
          src: `${image.prefix}${size}x${size}${image.suffix}`,
          suffix: `${image.suffix}`,
          foursquare_vendor_id: venueId,
          width: size,
          height: size,
        };
      });
      setFourSquarePhotos(fourSquarePhotos.concat(retrievedPhotos));
      return;
    } catch (error) {}
  };

  const handleSelectedPhotos = async (val, selection) => {
    if (selection === 'add') {
    if(includes(val,approvedPhotos)  && view !== 'approved') {
      photoAlreadyApproved()
      return
    }
      setSelectedPhotos((selectedPhotos) => [...selectedPhotos, val]);
      if (!editSelection && view !== 'approved') {
        handleApprovedPhotos();
      }
    } else {
      setSelectedPhotos((selectedPhotos) =>
        selectedPhotos.filter((photo) => photo.suffix !== val.suffix)
      );
    }
  };

 
  const handleApprovedPhotos = async (photo) => {
    if (!photo && selectedPhotos <= 0) return;
    if((includes(photo, approvedPhotos) || includes(selectedPhotos, approvedPhotos)) && view !== 'approved') {
      photoAlreadyApproved()
      return
    }
    try {
      const newPhotos = [...selectedPhotos, photo];
      await patch(url, {photos: [...photos.concat(newPhotos)]});
      setApprovedPhotos([...approvedPhotos.concat(newPhotos)]);
      onOpen();
      if(editSelection || selectAll) {
        setSelectAll(false)
        handleCancel()
      }
    } catch (e) {
      console.log(`Encountered error saving photo(s). ${e}`);
      handleError()
    }
  };

  const handleDeletePhotos = async (data) => {
    try {
      console.log('deleting');
      console.log(`data ${JSON.stringify(data)}`);
      if (!data) return;
      const newPhotos = selectAll
        ? []
        : difference(photos, data)
      console.log(newPhotos);
      await patch(url, {photos: newPhotos});
      setApprovedPhotos(newPhotos);
      onClose();
      if (approvedPhotos.length <= 0) {setView('fourSquarePhotos')}
      if(editSelection || selectAll) {
        setSelectAll(false)
        handleCancel()
      }
    } catch (e) {
      console.log(`Encountered error deleting photo(s). ${e}`);
      handleError()
    }
  };

  const renderPhotos = (param) => {
    switch (param) {
      case 'approved':
        return approvedPhotos.length > 0 ? <Gallery photos={approvedPhotos} renderImage={imageRenderer} /> : setView('no-approved-found');
      case 'fourSquarePhotos':
        return (
          <Gallery photos={fourSquarePhotos} renderImage={imageRenderer} />
        );
      case 'no-fourSquarePhotos-found':
        return (
          <Box>
            <Text textAlign="center">
              We weren't able to find any FourSquare photos for this venue.
            </Text>
          </Box>
        );
      case 'no-approved-found':
        return (
          <Box>
            <Text textAlign="center">
              There are no approved photos for this organization.
            </Text>
          </Box>
        );
      default:
        return renderPhotos('no-approved-found');
    }
  };

  const imageRenderer = useCallback(({index, key, photo}) => (
    <SelectedImage
      approvePhoto={(photo) => handleApprovedPhotos(photo)}
      unapprovePhoto={() => onOpen()}
      selectAll={selectAll}
      editSelection={editSelection}
      key={key}
      view={view}
      margin={20}
      width={`${size}`}
      height={`${size}`}
      index={index}
      photo={photo}
      setSelected={setSelectedPhotos}
      handleSelected={(val, selection) => handleSelectedPhotos(val, selection)}
    />
  ));

  return (
    <Box>
      <Box>
        <Flex align="start">
          <SectionTitle mr={25}>Photos</SectionTitle>
          <Button
            borderTopRightRadius="0"
            borderBottomRightRadius="0"
            _hover={{backgroundColor: '#3A81C9', color: '#fff'}}
            isActive={view === 'approved' ? true : false}
            onClick={() =>
              photos.length > 0
                ? setView('approved')
                : setView('no-approved-found')
            }
            style={buttonStyles}
            _active={{backgroundColor: '#3A81C9', color: '#fff'}}
          >
            Approved
          </Button>
          <Button
            borderTopLeftRadius="0"
            borderBottomLeftRadius="0"
            _hover={{backgroundColor: '#3A81C9', color: '#fff'}}
            onClick={() =>
              fourSquarePhotos.length > 0
                ? setView('fourSquarePhotos')
                : setView('no-fourSquarePhotos-found')
            }
            style={buttonStyles}
            isActive={view === 'fourSquarePhotos' ? true : false}
            _active={{backgroundColor: '#3A81C9', color: '#fff'}}
          >
            All
          </Button>
        </Flex>
        <Flex alignItems="flex-end" justifyContent="flex-end" mt={50} mb={50}>
          <Button
            bg="#F2D0D0"
            onClick={handleCancel}
            ml={3}
            style={!editSelection ? {display: 'none'} : buttonStyles}
          >
            Cancel
          </Button>
          {editSelection && fourSquarePhotos.length > 0 ? (
            <div style={{display: 'flex'}}>
              <Button
                onClick={toggleSelectAll}
                ml={3}
                style={!editSelection ? {display: 'none'} : buttonStyles}
              >
                {selectAll ? `Deselect All` : `Select All`}
              </Button>
              {view !== 'approved' ? (
                <Button
                  ml={3}
                  style={!editSelection ? {display: 'none'} : buttonStyles}
                  onClick={handleApprovedPhotos}
                  ref={approvedRef}
                  isDisabled={!(selectedPhotos.length > 0)}
                >
                  Approve Selected
                </Button>
              ) : (
                <Button
                  ml={3}
                  style={!editSelection ? {display: 'none'} : buttonStyles}
                  onClick={onOpen}
                  ref={disApprovedRef}
                  isDisabled={!(selectedPhotos.length > 0)}
                >
                  Unapprove
                </Button>
              )}
            </div>
          ) : (
            <Button onClick={toggleEditSelection} style={buttonStyles}>
              Select Photos
            </Button>
          )}
        </Flex>
      </Box>
      <Box style={{marginLeft: '5%'}}>{renderPhotos(view)}</Box>
      {view === 'approved' ? (
        <DisapprovedModal
          inalFocusRef={disApprovedRef}
          selectedPhotos={selectedPhotos}
          isOpen={isOpen}
          onClose={onClose}
          setView={setView}
          handleDelete={handleDeletePhotos}
        />
      ) : (
        <ApprovedModal
          inalFocusRef={approvedRef}
          selectedPhotos={selectedPhotos}
          setSelectedPhotos={setSelectedPhotos}
          isOpen={isOpen}
          onClose={onClose}
          setView={setView}
        />
      )}
    </Box>
  );
};

const ApprovedModal = ({
  approvedRef,
  selectedPhotos,
  setView,
  isOpen,
  onClose,
  setSelectedPhotos,
}) => {
  return (
    <Modal
      isCentered
      inalFocusRef={approvedRef}
      isOpen={isOpen}
      onClose={onClose}
      colorScheme="whiteAlpha"
      size="lg"
    >
      <ModalOverlay />
      <ModalContent
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        borderRadius={4}
      >
        <ModalCloseButton />
        <ModalBody mt={5} p={10}>
          <Flex direction="column" justify="center" alignItems="center" mb={10}>
            <Tada />
          </Flex>
          <Flex direction="column" justify="center" alignItems="center">
            {selectedPhotos.length > 1 ? (
              <Text>
               { `${selectedPhotos.length} photo(s) have been approved!`}
              </Text>
            ) : (
              <Text>Photo has been approved!</Text>
            )}
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const DisapprovedModal = ({
  disApprovedRef,
  selectedPhotos,
  handleDelete,
  setView,
  isOpen,
  onClose,
}) => {
  const footerButtons = Object.assign({
    ...buttonStyles,
    width: '100%',
    marginTop: '1px',
  });
  return (
    <Modal
      isCentered
      inalFocusRef={disApprovedRef}
      isOpen={isOpen}
      onClose={onClose}
      colorScheme="whiteAlpha"
      size="lg"
    >
      <ModalOverlay />
      <ModalContent
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        borderRadius={4}
      >
        <ModalCloseButton />
        <ModalBody mt={10} p={10}>
          <Flex direction="column" justify="center" alignItems="center" mb={10}>
            <Caution />
          </Flex>
          <Flex direction="column" justify="center" alignItems="center">
            <Text>{`Do you want to unapprove ${
              selectedPhotos.length > 1
                ? `${selectedPhotos.length} photo(s)`
                : `this photo`
            }?`}</Text>
          </Flex>
        </ModalBody>
        <ModalFooter
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Button
            onClick={() => {
              handleDelete(selectedPhotos);
              onClose();
            }}
            style={footerButtons}
          >
            Yes
          </Button>
          <Button bg="#F2D0D0" onClick={onClose} style={footerButtons}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

FormPhotos.propTypes = {
  photos: PropTypes.arrayOf(PropTypes.shape()),
  venueId: PropTypes.bool,
  name: PropTypes.string,
  location: PropTypes.object,
  organizationId: PropTypes.string,
};

ApprovedModal.propTypes = {
  approvedRef: PropTypes.element,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  selectedPhotos: PropTypes.array,
  setSelectedPhotos: PropTypes.func,
};

DisapprovedModal.propTypes = {
  disApprovedRef: PropTypes.element,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  selectedPhotos: PropTypes.array,
  handleDelete: PropTypes.func,
};
export default FormPhotos;

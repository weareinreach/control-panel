import React, { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import axios, { get, patch } from 'axios';
import { Box, Button, Flex, useDisclosure, Link , Text} from '@chakra-ui/core';
import { SectionTitle } from '../components/styles';
import Gallery from 'react-photo-gallery';
import SelectedImage from '../components/SelectImage';
import { CATALOG_API_URL } from '../utils';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/core";

const fourSquarePhotosApiURL = process.env.REACT_APP_FOUR_SQUARE_PHOTOS_URL;
const fourSquareVenuesApiURL =  process.env.REACT_APP_FOUR_SQUARE_VENUES_URL;
const clientID = process.env.REACT_APP_FOUR_SQUARE_CLIENT_ID;
const clientSecret = process.env.REACT_APP_FOUR_SQUARE_CLIENT_SECRET;

const FormPhotos = ({ photos, name, location, organizationId }) => {

    const [selectAll, setSelectAll] = useState(false);
    const [select, setSelect] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [unapprovedPhotos, setUnapprovedPhotos] = useState([]);

    const [approvedPhotos, setApprovedPhotos] = useState(photos === undefined || photos.length < 1 ? [] : [...photos])
    const [view, setView] = useState(approvedPhotos.length > 0 ? 'approved' : 'no-approved-found')
    const [selectedPhotos, setSelectedPhotos] = useState([])
    
    const { isOpen, onOpen, onClose } = useDisclosure();
    const approvedRef = useRef();
    const disApprovedRef = useRef();
    const url = `${CATALOG_API_URL}/organizations/${organizationId}`

    const buttonStyles = {
        boxShadow: 'none'
    }

    const toggleSelectAll = () => {
        if (unapprovedPhotos.length === selectedPhotos.length) return
        setSelectedPhotos(selectedPhotos.concat(unapprovedPhotos))
        setSelectAll(!selectAll);
    };

    const toggleSelect = () => {
        setSelect(!select);
    };

    const handleCancel = () => {
        if (select) {
            setSelectAll(false)
            setSelect(false)
            setSelectedPhotos([])
            setApprovedPhotos(photos)
        };
    }

    useEffect(function () {
        const fetchPhotos = async (name, lat, long, city) => {
            if (unapprovedPhotos.length > 0 || !(location[0].lat || !location[0].long)) return null
            await get(`${fourSquareVenuesApiURL}?query=${name}&&ll=${lat},${long}&near=${city}&limit=1000&client_id=${clientID}&client_secret=${clientSecret}&v=20200101`)
                .then((venueList) => {
                    return venueList.data.response.venues.find(ven => {
                        if (ven.name.toLowerCase() === name.toLowerCase()) return ven
                        return null
                    })
                })
                .then((vendorId) => {
                    if (!vendorId) return null
                    return get(`${fourSquarePhotosApiURL}/${vendorId.id}/photos?client_id=${clientID}&client_secret=${clientSecret}&v=20200101`)
                        .then((foundPhotos) => {
                            const imageList = foundPhotos.data.response.photos.items.map(image => {
                                return image = {
                                    src: `${image.prefix}250x250${image.suffix}`,
                                    foursquare_vendor_id: vendorId.id
                                }
                            })
                            setUnapprovedPhotos(imageList)
                            if (!isLoaded) setIsLoaded(true)
                            return imageList
                        })
                })
                .catch((err) => {
                    throw new Error(err)
                })
        }
        if(location.length === 0) return
        if (!isLoaded) {
            fetchPhotos(name, location[0].lat, location[0].long, location[0].city)
        }
    })

    const handlePreApproved = async () => {
        if (selectedPhotos.length > 0) {
            setApprovedPhotos(approvedPhotos.concat(selectedPhotos))
            await handleApprovedPhotos(selectedPhotos)
            setSelect(false)
            onOpen()
        }
    }

    const handleApprovedPhotos = (data) => {
        patch(url, { "photos": [...data] })
            .then(response => {
                console.log(response, "Photos have been added to the database")
            })
            .catch(err => {
                console.log(err)
            })
        }
    
    const disapprovedPhotos = async () => {
        if (selectedPhotos.length > 0) {
            await handleDelete(selectedPhotos)
            setSelect(false)
            onOpen()
        } 
    }
    
    const handleDelete = (data) => {
        const remaining = []
        photos.forEach(element => {
            data.forEach(obj => {
                if (obj._id !== element._id) {
                    remaining.push(element)
                }
            })
        })
        console.log(remaining, 'handle Delete ran')
        axios.patch(url, {"photos": [...remaining]})

    }

    const renderPhotos = (param) => {
        switch(param) {
            case 'approved':
                return <Gallery photos={approvedPhotos} renderImage={imageRenderer} />;
            case 'unapprovedPhotos':
                return <Gallery photos={unapprovedPhotos} renderImage={imageRenderer} />;
            case 'no-unapprovedPhotos-found':
                  return (
                    <Box>
                        <Text textAlign='center'>There is no verified photos for this organization.</Text>
                    </Box>
                  );
            case 'no-approved-found':
                return (
                    <Box>
                        <Text textAlign='center'>There are no approved photos for this organization.</Text>
                    </Box>
                )
            default:
                return photos.length > 0 ? renderPhotos('approved'): renderPhotos('no-approved-found');
        }
    }


    const imageRenderer = useCallback(
        ({ index, key, photo }) => (
            <SelectedImage
                selected={selectAll ? true : false}
                select={select ? true : false}
                key={key}
                view={view}
                margin={20}
                width={'250'}
                height={'250'}
                index={index}
                photo={photo}
                handleSelected={
                    (val, selection) => {
                        if (selection === 'add') {
                            setSelectedPhotos(selectedPhotos => [...selectedPhotos, val])
                        } else {
                            console.log('remove', selectedPhotos.splice(val, 1))
                            setSelectedPhotos(selectedPhotos => selectedPhotos.filter(photo => photo !== val))
                        }
                    }
                }
            />
        )
    );
    
    return (
        <Box>
            {console.log(photos)}
            <Box>
                <Flex align="start">
                    <SectionTitle mr={25}>Photos</SectionTitle>
                    <Button
                        borderTopRightRadius="0"
                        borderBottomRightRadius="0"
                        _hover={{ backgroundColor: "#3A81C9", color: "#fff" }}
                        onClick={() => unapprovedPhotos.length > 0 ? setView('unapprovedPhotos') : setView('no-unapprovedPhotos-found')}
                        style={buttonStyles}
                        isActive={view === 'unapprovedPhotos' ? true : false}
                        _active={{ backgroundColor: "#3A81C9", color: "#fff" } }
                    >
                        Unapproved
                    </Button>
                    <Button
                        borderTopLeftRadius="0"
                        borderBottomLeftRadius="0"
                        _hover={{ backgroundColor: "#3A81C9", color: "#fff" }}
                        isActive={ view === 'approved' ? true : false}
                        onClick={() => approvedPhotos.length > 0 ? setView('approved') : setView('no-approved-found')}
                        style={buttonStyles}
                        _active={{ backgroundColor: "#3A81C9", color: "#fff" } }
                    >
                       Approved
                    </Button>
                </Flex>
                <Flex alignItems="flex-end" justifyContent="flex-end" mt={50} mb={ 50 }>
                    <Button
                        bg="#F2D0D0"
                        onClick={handleCancel}
                        ml={3}
                        style={!select ? { display: 'none' } : buttonStyles}
                    >
                        Cancel
                    </Button>
                    {
                        select && unapprovedPhotos.length > 0 ?
                            <div style={{display: 'flex'} }>
                                <Button
                                    isDisabled={selectAll}
                                    onClick={toggleSelectAll}
                                    ml={3}
                                    style={!select ? { display: 'none' } : buttonStyles }
                                >
                                    Select All
                                </Button>
                                <Button
                                    ml={3}
                                    style={!select ? { display: 'none' } : buttonStyles }
                                    onClick={view !== 'approved' ? handlePreApproved : disapprovedPhotos }
                                    ref={view === 'approved' ? approvedRef: disApprovedRef}
                                >
                                    { view !== 'approved' ? 'Approve' : 'Disapprove' }
                                </Button>
                            </div>
                            : <Button
                                onClick={toggleSelect}
                                style={ buttonStyles }
                            >
                                Select
                            </Button>
                    }
                </Flex>
            </Box>
            <Box  style={{marginLeft: '5%'}}>
                {
                    renderPhotos(view)
                }
            </Box>
            { approvedModal(approvedRef, isOpen, onClose, selectedPhotos, setView)}
            { disapprovedModal(disApprovedRef, isOpen, onClose, selectedPhotos, disapprovedPhotos)}
        </Box>
    ) 
}
const approvedModal = (approvedRef, isOpen, onClose, selectedPhotos, setView) => {
    return (
         <Modal isCentered inalFocusRef={approvedRef} isOpen={isOpen} onClose={onClose} colorScheme='whiteAlpha' size='lg'>
            <ModalOverlay />
            <ModalContent justifyContent='center' alignItems='center' flexDirection='column' borderRadius={4}>
                <ModalCloseButton/>
                <ModalBody mt={10} p={10}>
                    <Box>
                        <svg style={{margin: '0 auto'}} width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.5323 8.63147C14.3923 8.77147 14.2861 8.94021 14.1973 9.1252L14.1873 9.1152L0.167774 40.6967L0.181524 40.7104C-0.0784678 41.2142 0.356518 42.2391 1.24774 43.1316C2.13896 44.0228 3.16393 44.4578 3.66766 44.1978L3.68016 44.2103L35.2617 30.1895L35.2517 30.1783C35.4354 30.0908 35.6041 29.9845 35.7454 29.842C37.6978 27.8896 34.5317 21.5586 28.6756 15.7012C22.8171 9.84393 16.486 6.67903 14.5323 8.63147Z" fill="#DD2E44"/>
                            <path d="M16.2498 14.2734L0.520263 39.9051L0.167774 40.6988L0.181524 40.7126C-0.0784678 41.2163 0.356518 42.2413 1.24774 43.1338C1.53773 43.4238 1.83897 43.6437 2.13396 43.83L21.2496 20.5232L16.2498 14.2734Z" fill="#EA596E"/>
                            <path d="M28.7642 15.6058C34.6016 21.4456 37.8427 27.6704 36.0003 29.5104C34.1591 31.3528 27.9343 28.1129 22.0932 22.2756C16.2546 16.4358 13.0148 10.2085 14.8559 8.36729C16.6984 6.5261 22.9232 9.766 28.7642 15.6058Z" fill="#A0041E"/>
                            <path d="M23.2365 16.2845C22.9878 16.4857 22.6628 16.5907 22.3191 16.5532C21.2341 16.4357 20.3216 16.0582 19.6829 15.462C19.0067 14.8308 18.6729 13.9833 18.7642 13.1346C18.9242 11.6446 20.4191 10.2772 22.9678 10.5522C23.959 10.6584 24.4015 10.3397 24.4165 10.1872C24.434 10.0359 24.0703 9.62969 23.079 9.52219C21.9941 9.4047 21.0816 9.02721 20.4416 8.43098C19.7654 7.79975 19.4304 6.95227 19.5229 6.10355C19.6854 4.6136 21.1791 3.24614 23.7253 3.52238C24.4478 3.59988 24.829 3.45114 24.9902 3.35489C25.119 3.27614 25.1702 3.20114 25.1752 3.1574C25.1902 3.00615 24.8315 2.59991 23.8378 2.49242C23.1515 2.41742 22.6541 1.80244 22.7303 1.11496C22.8041 0.428733 23.4178 -0.0675012 24.1065 0.00749644C26.6527 0.281238 27.8226 1.93493 27.6614 3.42614C27.4989 4.91859 26.0052 6.28355 23.4565 6.0098C22.7341 5.93106 22.3566 6.08105 22.1941 6.1773C22.0653 6.2548 22.0128 6.33104 22.0078 6.37354C21.9916 6.52604 22.3528 6.93103 23.3465 7.03852C25.8927 7.31351 27.0627 8.96596 26.9014 10.4572C26.7402 11.9471 25.2465 13.3146 22.6991 13.0383C21.9766 12.9608 21.5966 13.1108 21.4341 13.2058C21.3041 13.2858 21.2541 13.3608 21.2491 13.4033C21.2329 13.5546 21.5941 13.9608 22.5866 14.0683C23.2715 14.1433 23.7703 14.7595 23.694 15.4458C23.659 15.7882 23.4853 16.0845 23.2365 16.2845Z" fill="#AA8DD8"/>
                            <path d="M38.3252 27.8473C40.7913 27.151 42.4925 28.251 42.8975 29.6947C43.3025 31.1372 42.425 32.9634 39.9601 33.6571C38.9976 33.9271 38.7089 34.3871 38.7476 34.5333C38.7901 34.6808 39.2789 34.9233 40.2388 34.6521C42.7038 33.9583 44.405 35.0583 44.8099 36.5007C45.2174 37.9444 44.3375 39.7681 41.8713 40.4631C40.9101 40.7331 40.6201 41.1943 40.6626 41.3406C40.7038 41.4868 41.1913 41.7293 42.1525 41.4593C42.815 41.2731 43.5075 41.6593 43.6937 42.3231C43.8787 42.988 43.4925 43.678 42.8275 43.8655C40.3638 44.5592 38.6614 43.4618 38.2539 42.0168C37.8489 40.5744 38.7276 38.7507 41.1951 38.0557C42.1575 37.7845 42.4463 37.3257 42.4038 37.1782C42.3638 37.032 41.8763 36.7882 40.9163 37.0582C38.4489 37.7532 36.749 36.6557 36.3427 35.2095C35.9365 33.7671 36.8152 31.9434 39.2814 31.2472C40.2413 30.9784 40.5301 30.5159 40.4901 30.3709C40.4476 30.2234 39.9614 29.981 39.0001 30.2509C38.3352 30.4384 37.6464 30.0509 37.4589 29.3872C37.2727 28.7247 37.6602 28.0348 38.3252 27.8473Z" fill="#77B255"/>
                            <path d="M28.75 24.4753C28.3825 24.4753 28.0201 24.314 27.7726 24.0065C27.3413 23.4666 27.4301 22.6803 27.9676 22.2491C28.24 22.0304 34.7398 16.9255 43.9258 18.2392C44.6095 18.3367 45.0845 18.9692 44.987 19.6529C44.8895 20.3354 44.262 20.8154 43.5721 20.7129C35.4561 19.5604 29.5888 24.1553 29.5313 24.2015C29.2988 24.3865 29.0238 24.4753 28.75 24.4753Z" fill="#AA8DD8"/>
                            <path d="M7.19231 19.2688C7.07357 19.2688 6.95232 19.2513 6.83233 19.2163C6.1711 19.0176 5.79611 18.3213 5.99485 17.6601C7.41106 12.944 8.69477 5.41799 7.11732 3.45556C6.94107 3.23306 6.67483 3.01432 6.06485 3.06057C4.89239 3.15057 5.00363 5.62424 5.00488 5.64924C5.05738 6.33796 4.5399 6.93795 3.85242 6.98919C3.15369 7.03169 2.56371 6.52421 2.51246 5.83548C2.38372 4.11179 2.91995 0.791892 5.87736 0.56815C7.19731 0.468153 8.29353 0.926888 9.06725 1.88936C12.0309 5.57799 9.02225 16.2714 8.38978 18.3788C8.22728 18.9201 7.7298 19.2688 7.19231 19.2688Z" fill="#77B255"/>
                            <path d="M31.874 13.0233C32.9095 13.0233 33.7489 12.1839 33.7489 11.1484C33.7489 10.1129 32.9095 9.27344 31.874 9.27344C30.8385 9.27344 29.999 10.1129 29.999 11.1484C29.999 12.1839 30.8385 13.0233 31.874 13.0233Z" fill="#5C913B"/>
                            <path d="M2.49992 24.2733C3.88059 24.2733 4.99984 23.154 4.99984 21.7734C4.99984 20.3927 3.88059 19.2734 2.49992 19.2734C1.11925 19.2734 0 20.3927 0 21.7734C0 23.154 1.11925 24.2733 2.49992 24.2733Z" fill="#9266CC"/>
                            <path d="M40.6235 25.5233C41.659 25.5233 42.4984 24.6839 42.4984 23.6484C42.4984 22.6129 41.659 21.7734 40.6235 21.7734C39.588 21.7734 38.7485 22.6129 38.7485 23.6484C38.7485 24.6839 39.588 25.5233 40.6235 25.5233Z" fill="#5C913B"/>
                            <path d="M29.374 40.5194C30.4095 40.5194 31.2489 39.68 31.2489 38.6445C31.2489 37.609 30.4095 36.7695 29.374 36.7695C28.3385 36.7695 27.499 37.609 27.499 38.6445C27.499 39.68 28.3385 40.5194 29.374 40.5194Z" fill="#5C913B"/>
                            <path d="M34.9989 6.77328C36.3796 6.77328 37.4989 5.65403 37.4989 4.27336C37.4989 2.89269 36.3796 1.77344 34.9989 1.77344C33.6183 1.77344 32.499 2.89269 32.499 4.27336C32.499 5.65403 33.6183 6.77328 34.9989 6.77328Z" fill="#FFCC4D"/>
                            <path d="M40.6235 11.7733C41.659 11.7733 42.4984 10.9339 42.4984 9.89838C42.4984 8.86288 41.659 8.02344 40.6235 8.02344C39.588 8.02344 38.7485 8.86288 38.7485 9.89838C38.7485 10.9339 39.588 11.7733 40.6235 11.7733Z" fill="#FFCC4D"/>
                            <path d="M36.874 16.7733C37.9095 16.7733 38.7489 15.9339 38.7489 14.8984C38.7489 13.8629 37.9095 13.0234 36.874 13.0234C35.8385 13.0234 34.999 13.8629 34.999 14.8984C34.999 15.9339 35.8385 16.7733 36.874 16.7733Z" fill="#FFCC4D"/>
                            <path d="M9.37494 30.5233C10.4104 30.5233 11.2499 29.6839 11.2499 28.6484C11.2499 27.6129 10.4104 26.7734 9.37494 26.7734C8.33944 26.7734 7.5 27.6129 7.5 28.6484C7.5 29.6839 8.33944 30.5233 9.37494 30.5233Z" fill="#FFCC4D"/>
                        </svg>
                    </Box>
                    {
                        selectedPhotos.length > 1 ?
                            <p>{selectedPhotos.length} photos have been approved</p>
                            :
                            <p>{selectedPhotos.length} photo has been approved</p>
                    }
                
                </ModalBody>
                <ModalFooter display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                    <Box>
                        <Link color='#2F80ED' onClick={() => { setView('approved'); onClose()}}>See approved photos</Link>
                    </Box>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

const disapprovedModal = (disApprovedRef, isOpen, onClose, selectedPhotos, disapprovedPhotos ) => {
    return (
         <Modal isCentered inalFocusRef={disApprovedRef} isOpen={isOpen} onClose={onClose} colorScheme='whiteAlpha' size='lg'>
            <ModalOverlay />
            <ModalContent justifyContent='center' alignItems='center' flexDirection='column' borderRadius={4}>
                <ModalCloseButton/>
                <ModalBody mt={10} p={10}>
                    <Box>
                        <svg  style={{margin: '0 auto'}} width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M21 42C32.598 42 42 32.598 42 21C42 9.40202 32.598 0 21 0C9.40202 0 0 9.40202 0 21C0 32.598 9.40202 42 21 42ZM22.4336 25.7656H20.2959V28H22.4336V25.7656ZM17.9863 13.4336C17.1126 14.3717 16.6758 15.6143 16.6758 17.1611H18.5879C18.6237 16.2301 18.7705 15.5176 19.0283 15.0234C19.4867 14.1354 20.3138 13.6914 21.5098 13.6914C22.4766 13.6914 23.1676 13.9492 23.583 14.4648C24.0055 14.9805 24.2168 15.5892 24.2168 16.291C24.2168 16.7923 24.0736 17.2757 23.7871 17.7412C23.6296 18.0062 23.4219 18.2604 23.1641 18.5039L22.3047 19.3525C21.4811 20.1618 20.9476 20.8815 20.7041 21.5117C20.4606 22.1348 20.3389 22.9583 20.3389 23.9824H22.251C22.251 23.0801 22.3512 22.3997 22.5518 21.9414C22.7594 21.4759 23.207 20.9102 23.8945 20.2441C24.8398 19.3275 25.4665 18.6328 25.7744 18.1602C26.0895 17.6875 26.2471 17.0716 26.2471 16.3125C26.2471 15.0592 25.821 14.0316 24.9688 13.2295C24.1237 12.4202 22.9958 12.0156 21.585 12.0156C20.0596 12.0156 18.86 12.4883 17.9863 13.4336Z" fill="#EB5757"/>
                        </svg>
                    </Box>
                     <Text>Do you want to disapprove {selectedPhotos.length} photos?</Text>
                </ModalBody>
                <ModalFooter display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
                    <Button onClick={()=> {disapprovedPhotos()}}>Yes</Button>
                    <Button onClick={onClose}>Cancel</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

FormPhotos.propTypes = {
    photos: PropTypes.arrayOf(PropTypes.shape()), 
    venueId: PropTypes.bool,
    name: PropTypes.string,
    location: PropTypes.arrayOf(PropTypes.shape()),
    organizationId: PropTypes.string
}

export default FormPhotos

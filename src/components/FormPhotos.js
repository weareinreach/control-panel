import React, { useState, useEffect, useCallback, useContext } from 'react';
import PropTypes from 'prop-types';
import { get } from 'axios';
import { Box, Text, Button, Flex } from '@chakra-ui/core';
import { SectionTitle } from '../components/styles';
import Gallery from 'react-photo-gallery';
import SelectedImage from '../components/SelectImage';
import {ContextFormModal} from '../components/ContextFormModal';

//things to do 
    //fix chackra tab stylings -- done 
    //fix selectedPhotos push -- done
    //create on click modal 
    //show approved
    //save photos to db 
    //delete photos from db
    //clean up code 

const fourSquarePhotosApiURL = process.env.REACT_APP_FOUR_SQUARE_PHOTOS_URL;
const fourSquareVenuesApiURL =  process.env.REACT_APP_FOUR_SQUARE_VENUES_URL;
const clientID = process.env.REACT_APP_FOUR_SQUARE_CLIENT_ID;
const clientSecret = process.env.REACT_APP_FOUR_SQUARE_CLIENT_SECRET;

const FormPhotos = (props) => {
    const [selectAll, setSelectAll] = useState(false);
    const [select, setSelect] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [unapproved, setUnapproved] = useState([]);
    const [approved, setApproved] = useState([])
    const [selectedPhotos, setSelectedPhotos] = useState([])
    const { closeModal, openModal } = useContext(ContextFormModal);

    const toggleSelectAll = () => {
        if (unapproved.length === selectedPhotos.length) return
        setSelectedPhotos(selectedPhotos.concat(unapproved))
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
            setApproved([])
        };
    }

    useEffect(function () {
        const fetchPhotos = async (name, lat, long, city) => {
            if (unapproved.length > 0) return null
            await get(`${fourSquareVenuesApiURL}?query=${name}&&ll=${lat},${long}&near=${city}&limit=1000&client_id=${clientID}&client_secret=${clientSecret}&v=20200101`)
                .then((venueList) => {
                    return venueList.data.response.venues.find(ven => {
                        if (ven.name.toLowerCase() === name.toLowerCase()) return ven
                    })
                })
                .then((data) => {
                    if (!data) return null
                    return get(`${fourSquarePhotosApiURL}/${data.id}/photos?client_id=${clientID}&client_secret=${clientSecret}&v=20200101`)
                        .then((data) => {
                            const imageList = data.data.response.photos.items.map(image => {
                                return image = {
                                    title: name,
                                    prefix: image.prefix,
                                    suffix: image.suffix,
                                    src: `${image.prefix}250x250${image.suffix}`,
                                    width: "250px",
                                    height: "250px"
                                }
                            })
                            setUnapproved(imageList)
                            if (!isLoaded) setIsLoaded(true)
                            return imageList
                        })
                })
                .catch((err) => {
                    throw new Error(err)
                })
        }
        if (!isLoaded) fetchPhotos(props.name, props.location.locations[0].lat, props.location.locations[0].long, props.location.locations[0].city)
    })

    const showApproved = () => {
        if (selectedPhotos.length > 0) {
            setApproved(approved.concat(selectedPhotos))
        } else {
            setApproved([])
        }

        // <Gallery photos={approved} renderImage={imageRenderer} handleSelected={ handleSelected }/>
    }


    
    const imageRenderer = useCallback(
        ({ index, key, photo }) => (
            <SelectedImage
                selected={selectAll ? true : false}
                select={select ? true : false}
                key={key}
                margin={"20px"}
                index={index}
                photo={photo}
                handleSelected={
                    (val, selection) => {
                        console.log(val, selection)
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
            <Box>
                <Flex align="start">
                    <SectionTitle mr={25}>Photos</SectionTitle>
                    <Button borderTopRightRadius="0" borderBottomRightRadius="0" _hover={{backgroundColor: "#3A81C9", color: "#fff"}}>Unapproved</Button>
                    <Button borderTopLeftRadius="0" borderBottomLeftRadius="0" _hover={{backgroundColor: "#3A81C9", color: "#fff"}}>Approved</Button>
                </Flex>
                <Flex alignItems="flex-end" justifyContent="flex-end" mt={50} mb={ 50 }>
                    <Button bg="#F2D0D0" onClick={handleCancel} ml={ 3 } style={ !select  ? {display: 'none'}: null}>Cancel</Button>
                    {
                        select && unapproved.length > 0 ?
                            <div style={{display: 'flex'} }>
                                <Button onClick={toggleSelectAll} ml={ 3 } style={!select ? { display: 'none' } : { display: 'block' }} >Select All</Button>
                                <Button ml={ 3 } style={!select ? { display: 'none' } : { display: 'block' }} onClick={showApproved}>Approve</Button>
                            </div>
                            : <Button onClick={toggleSelect}>Select</Button>
                    }
                </Flex>
            </Box>
            <Box>
                {
                    isLoaded && unapproved.length === 0?
                        <Box>
                            There is no verified photo for this organization.
                        </Box>
                        : <Gallery photos={unapproved} renderImage={imageRenderer}/>
                }

            </Box>
        </Box>
    ) 
}

FormPhotos.propTypes = {
    photos: PropTypes.arrayOf(PropTypes.shape()), 
    venueId: PropTypes.bool,
    name: PropTypes.string,
    location: PropTypes.arrayOf(PropTypes.shape())
}

export default FormPhotos

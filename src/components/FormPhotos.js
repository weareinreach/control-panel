import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { get } from 'axios';
import { Box, Text, Button, Flex } from '@chakra-ui/core';
import { SectionTitle } from '../components/styles';
import Gallery from 'react-photo-gallery';
import SelectedImage from '../components/SelectImage';

const galleryStyles = {
    '.react-photo-gallery--gallery::firstChild': { 
        'jusitfy-content': 'center'
    }
}

const fourSquarePhotosApiURL = process.env.REACT_APP_FOUR_SQUARE_PHOTOS_URL;
const fourSquareVenuesApiURL =  process.env.REACT_APP_FOUR_SQUARE_VENUES_URL;
const clientID = process.env.REACT_APP_FOUR_SQUARE_CLIENT_ID;
const clientSecret = process.env.REACT_APP_FOUR_SQUARE_CLIENT_SECRET;

const FormPhotos = (props) => {
    const [selectAll, setSelectAll] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [images, setImages] = useState([]);

    useEffect(function () {
        if (props.location === undefined) return null
        if (images.length > 0) return null
        const fetchPhotos = async (name, lat, long) => {
            await get(`${fourSquareVenuesApiURL}?name=${name}&ll=${lat},${long}&client_id=${clientID}&client_secret=${clientSecret}&v=20200101`)
                .then((venueList) => {
                    return venueList.data.response.venues.find(ven => {
                        console.log(ven.name.toLowerCase(), name.toLowerCase())
                        if (ven.name.toLowerCase() === name.toLowerCase()) return ven
                        // if (props.location.length > 0) {
                        //     props.location.find(local => {
                        //         if (ven.name.toLowerCase() === name.toLowerCase()) { 
                        //                 return ven
                        //         }
                        //         console.log(parseFloat(local.lat).toFixed(4), ven.location.lat.toFixed(4))
                        //     })
                        // } 
                        // return 'Cant find Venue'
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
                                                width: 250,
                                                height: 250
                                            }
                            })
                            setImages(imageList)
                            console.log(imageList)
                            return imageList
                        })
                })
                .catch((err) => {
                    throw new Error(err)
                })
        }
        fetchPhotos(props.name, props.location.locations[0].lat, props.location.locations[0].long)
        if (!isLoaded) setIsLoaded(true)
    }, [isLoaded])

    const imageRenderer = useCallback(
        ({ index, key, photo }) => (
        <SelectedImage
            selected={selectAll ? true : false}
            key={key}
            margin={"2px"}
            index={index}
            photo={photo}
        />
    ),
    [selectAll]
    );
    
    return (
        <Box m={5}>
            <Box>
                <Flex align="start">
                    <SectionTitle mr={100}>Photos</SectionTitle>
                    <Button borderTopRightRadius="0" borderBottomRightRadius="0" _hover={{backgroundColor: "#3A81C9", color: "#fff"}}>Unapproved</Button>
                    <Button borderTopLeftRadius="0" borderBottomLeftRadius="0" _hover={{backgroundColor: "#3A81C9", color: "#fff"}}>Approves</Button>
                </Flex>

                <Flex align="center" justify="space-between">
                    <Button bg="#F2D0D0" ml={200} mt={ 10 }>Cancel</Button>
                    <Button>Select</Button>
                </Flex>
            </Box>
            <Box>
                <Gallery photos={images} renderImage={imageRenderer} style={{margin: '0 auto'}} />
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
            // {/* <Flex wrap="wrap" align="center" justify="space-between" >
            //     {
            //         images.map((url) => {
            //             const prefix = url.prefix
            //             const suffix = url.suffix
            //             const size = '250x250'
            
            //             return (
            //                 <Box borderRadius={ 20 }>
            //                         <img src={`${prefix}${size}${suffix}`} alt='test' />
            //                 </Box>
            //                 )
            //             })
            //     }
            // </Flex>  */}

        // <Flex align="center" justify="space-between">
        //     <Text> Add some photos for {props.name} to help asylum seeker locate your organization.</Text>
        //     <Button onClick={ handleAddPhotos }>Add Photos</Button>
        // </Flex>
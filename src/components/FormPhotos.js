import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { get } from 'axios';
import { Box, Text, Button, Flex } from '@chakra-ui/core';
import { SectionTitle } from '../components/styles';
import Table from '../components/Table';
import Loading from './Loading';

const fourSquarePhotosApiURL = process.env.REACT_APP_FOUR_SQUARE_PHOTOS_URL;
const fourSquareVenuesApiURL =  process.env.REACT_APP_FOUR_SQUARE_VENUES_URL;
const clientID = process.env.REACT_APP_FOUR_SQUARE_CLIENT_ID;
const clientSecret = process.env.REACT_APP_FOUR_SQUARE_CLIENT_SECRET;

const Photos = (props) => { 
    return (
        <Flex wrap='wrap'  align="center" justify="space-between" >
            {
                props.photos.length === 0 ? 
                    <Text>There are No Photos available for this venue on Four Square</Text>
                :
                props.photos.map((url) => {
                    const prefix = url.prefix
                    const suffix = url.suffix
                    const size = '300x500'
        
                    return (
                        <Box>
                            <img src={`${prefix}${size}${suffix}`} alt='test' />
                            <Button>x</Button>
                        </Box>
                    )
                })
            }
        </Flex>
    )
} 

//add check for db venue id 
//add check for non matching venue id 
//check for no photos fnd

const FormPhotos = (props) => {
    const [venues, setVenues] = useState([]);
    const [isLoaded, setIsLoaded] = useState(null);
    
    useEffect(function () { 
        const fetchVenues = async (lat, long) => {
            await get(`${fourSquareVenuesApiURL}?ll=${lat},${long}&client_id=${clientID}&client_secret=${clientSecret}&v=20200101`)
                .then((venueList) => {
                    venueList = venueList.data.response.venues
                    setVenues(venueList)
                    return
                })
                .catch((err) => {
                    throw new Error(err)
                })
        }

        if (!props.venueId && venues.length === 0 ){
            fetchVenues(props.location.locations[0].lat, props.location.locations[0].long)
        }
    })


    const [venueId, setVenueId] = useState(null)
    const [images, setImages] = useState([]);
    
    useEffect(() => { 
        const fetchPhotos = async () => {
            await get(`${fourSquarePhotosApiURL}/${venueId}/photos?client_id=${clientID}&client_secret=${clientSecret}&v=20200101`)
                .then((data) => {
                    setImages(data.data.response.photos.items)
                    setIsLoaded(true)
                    return
                })
                .catch((err) => {
                    throw new Error(err)
                })
        }

        if (venueId && images.length === 0) {
            fetchPhotos(venueId)
        }
    })


    
    const handleVenueClick = (row) => {
        setVenueId(row.id)
    }

    if (!venueId && venues.length > 0) { 

        return (
            <Box>
                <SectionTitle>Select A Venue</SectionTitle>
                    <Table 
                        headers={[
                            { key: 'name', label: 'Name' },
                            { key: 'id', label: 'Venue ID' },
                            { key: 'location.formattedAddress', label: 'Address' },
                        ]}
                        rows={venues}
                        actions={[{label: 'Select', onClick: handleVenueClick}]}
                    />
                </Box>
        )
    }

    if (isLoaded) {
        return (
            <Box>
                <SectionTitle>Select Photos</SectionTitle>
                <Photos photos={images} />
            </Box>
        )
    } else {
        return (<Loading />)
    }
}

Photos.propTypes = {
    photos: PropTypes.arrayOf(PropTypes.shape())
}

export default FormPhotos



                    // <Box key={venue.id}>
                    //     <Text>Venue ID: {venue.id}</Text>
                    //     <Text>Name: {venue.name} </Text>
                    //     <Text>Address: {address[0]}, {address[1]}, {address[2]}</Text>
                    //     <Button onClick={e => handleVenueClick(e)} value={venue.id}>Select</Button>
                    // </Box>


                                //                     {value: venue.name},
                                // {value: venue.id},
                                // {value: `${address[0]},${address[1]},${address[2]}`},
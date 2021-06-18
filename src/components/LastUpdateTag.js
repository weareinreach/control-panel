import React from 'react';
import { Grid, GridItem, Box, Text } from '@chakra-ui/react';

const LastUpdateTag = (props) => {
  return (
    <Grid templateColumns="150px 1fr">
      <GridItem rowSpan="1" colSpan="2">
        <Box mt={4} mb={4}>
          {props.children}
        </Box>
      </GridItem>
      <GridItem rowSpan="1" colSpan="1">
        <Text>Updated At</Text>
      </GridItem>
      <GridItem rowSpan="1" colSpan="1">
        <Text>{props.updatedAt}</Text>
      </GridItem>
    </Grid>
  );
};

export default LastUpdateTag;

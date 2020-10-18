import React, {useState} from 'react';
import {Grid, Container} from '@material-ui/core';
import VideoKitComponent from '../VideoKitComponent';

const NameGrid = () => {
    return (
        <>
            <Grid container>
                <VideoKitComponent/>
            </Grid>
        </>
    );
}

export default NameGrid;

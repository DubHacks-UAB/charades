import { Box, Button, ButtonGroup, Container, Grid } from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import VideoKitComponent from '../VideoKitComponent';
import NameGrid from './NameGrid';
import NameInputDialog from './NameInputDialog';


const LandingPage = () => {
    const [dialogOpen, setDialogOpen] = useState(true)
    const [isInvalidNameInput, setIsInvalidNameInput] = useState(false)
    const [nameInput, setNameInput] = useState(null)
    const [isNameCreated, setIsNameCreated] = useState(false)

    const onConfirm = () => {
        // TODO set username for user once they join and prompt close dialog action
        onClose();
    }

    const onChange = (e) => {
        setNameInput(e.target.value);
    }

    const onClose = () => {
        // Validate input first
        if (nameInput === null || nameInput.trim() === '') {
            setIsInvalidNameInput(true);
        } else {
            setDialogOpen(false);
        }
    }

    useEffect(() => {
        // Once dialog is closed and a valid name is entered, set to true to render video component with inputted name
        if (dialogOpen === false) {
            setIsNameCreated(true)
        }
    }, [dialogOpen])

    const getJoinTeamButtons = () => {
        return (
            <ButtonGroup variant="contained">
                <Button>Join Team 1</Button>
                <Button>Join Team 2</Button>
            </ButtonGroup>
        )
    }

    return (
    <>
        <NameInputDialog onChange={onChange} onClose={onClose} onConfirm={onConfirm} dialogOpen={dialogOpen} isInvalidNameInput={isInvalidNameInput}/>
        <h1>Charades</h1>
        <Grid>
        <h2>No Team</h2>
        {isNameCreated === true ? (<VideoKitComponent name={nameInput}/>): null}
        </Grid>
        {!dialogOpen ? getJoinTeamButtons() : null}

        <h2>Team 1</h2>
        <h2>Team 2</h2>
    </>
    )
}

export default LandingPage;
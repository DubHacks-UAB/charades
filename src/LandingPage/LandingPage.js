import { Box, Button, ButtonGroup, Container, Grid } from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import VideoKitComponent from '../VideoKitComponent';
import NameGrid from './NameGrid';
import NameInputDialog from './NameInputDialog';
import './LandingPage.css';


const LandingPage = () => {
    const TEAMS = {
        NO_TEAM: "NO_TEAM",
        TEAM_1: "TEAM_1",
        TEAM_2: "TEAM_2",
    }


    const [dialogOpen, setDialogOpen] = useState(true)
    const [isInvalidNameInput, setIsInvalidNameInput] = useState(false)
    const [nameInput, setNameInput] = useState(null)
    const [isNameCreated, setIsNameCreated] = useState(false)
    const [team, setTeam] = useState(null)
    const [userVideoComponent, setUserVideoComponent] = useState(null)

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
        if (dialogOpen === false && !isNameCreated) {
            setIsNameCreated(true)
            setTeam(TEAMS.NO_TEAM);
            setUserVideoComponent(<VideoKitComponent name={nameInput}/>)
        }
    }, [dialogOpen, isNameCreated])

    const showJoinTeamButtons = () => {
        return (
            <ButtonGroup variant="contained">
                <Button onClick={handleClickTeam1Button}>Join Team 1</Button>
                <Button onClick={handleClickTeam2Button}>Join Team 2</Button>
            </ButtonGroup>
        )
    }

    const handleClickTeam1Button = () => {
        setTeam(TEAMS.TEAM_1)
    }

    const handleClickTeam2Button = () => {
        setTeam(TEAMS.TEAM_2)
    }

    return (
    <>
        <NameInputDialog onChange={onChange} onClose={onClose} onConfirm={onConfirm} dialogOpen={dialogOpen} isInvalidNameInput={isInvalidNameInput}/>
        <h1>Charades</h1>
        
        <div className="no-team-section">
            <h2>No Team</h2>
            {!dialogOpen && team === TEAMS.NO_TEAM && userVideoComponent ? userVideoComponent: null}
        </div>
        {!dialogOpen ? showJoinTeamButtons() : null}

        <div className="all-team-sections">
            <div className="team1-section">
                <h2>Team 1</h2>
                {isNameCreated === true && team === TEAMS.TEAM_1 && userVideoComponent ? userVideoComponent : null}
            </div>
            <div className="team2-section">
                <h2>Team 2</h2>
                {isNameCreated === true && team === TEAMS.TEAM_2 && userVideoComponent ? userVideoComponent: null}
            </div>
        </div>
    </>
    )
}

export default LandingPage;
import { Box, Button, ButtonGroup, Container, Grid } from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import VideoKitComponent from '../VideoKitComponent';
import NameGrid from './NameGrid';
import NameInputDialog from './NameInputDialog';
import './LandingPage.css';

import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4001";
const socket = socketIOClient(ENDPOINT);


const LandingPage = () => {
    const TEAMS = {
        NO_TEAM: "NO_TEAM",
        TEAM_1: "TEAM_1",
        TEAM_2: "TEAM_2",
    }

    const [response, setResponse] = useState("");

    // useEffect(() => {
    //   const socket = socketIOClient(ENDPOINT);
    //   socket.on("FromAPI", data => {
    //     setResponse(data);
    //   });
    // }, []);

    const [dialogOpen, setDialogOpen] = useState(true)
    const [isInvalidNameInput, setIsInvalidNameInput] = useState(false)
    const [nameInput, setNameInput] = useState(null)
    const [isNameCreated, setIsNameCreated] = useState(false)
    const [team, setTeam] = useState(null)
    const [userVideoComponent, setUserVideoComponent] = useState(null)

    const [teamSelected, setTeamSelected] = useState(null)


    useEffect(() => {
        if (teamSelected === TEAMS.TEAM_1 || teamSelected === TEAMS.TEAM_2) {
            updateTeamInServer();
        }
    }, [teamSelected])

    const updateTeamInServer = () => {
        socket.emit("updateTeam", {
            teamSelected: teamSelected,
            userName: nameInput,
        })

    socket.on('updateTeamForUser', (data) => {
        if (data.status === 'SUCCESS') {
            setTeam(data.newTeam)
        }
    })

        // if (teamSelected === TEAMS.TEAM_1) {
        //     socket.on("toAPI", teamSelected => {
        //         setResponse(data);
        //       });
        // }
    };

    useEffect(() => {
        console.log("NEW TEAM! "+ team)
    }, [team])

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
        // setTeam(TEAMS.TEAM_1)
        setTeamSelected(TEAMS.TEAM_1)
    }

    const handleClickTeam2Button = () => {
        // setTeam(TEAMS. TEAM_2)
        setTeamSelected(TEAMS.TEAM_2)
    }

    return (
    <>
        <NameInputDialog onChange={onChange} onClose={onClose} onConfirm={onConfirm} dialogOpen={dialogOpen} isInvalidNameInput={isInvalidNameInput}/>
        <h1>Charades</h1>
        {/* <p>
      It's <time dateTime={response}>{response}</time>
    </p> */}
        <div className="no-team-section">
            <h2>No Team</h2>
            {!dialogOpen && team === TEAMS.NO_TEAM && userVideoComponent ? userVideoComponent: null}
        </div>
        {/* {isNameCreated && team  ? showJoinTeamButtons() : null} */}
        {showJoinTeamButtons()}

        <div className="all-team-sections">
            <div className="team1-section">
                <h2>Team 1</h2>
                {team === TEAMS.TEAM_1 && userVideoComponent ? userVideoComponent : null}
            </div>
            <div className="team2-section">
                <h2>Team 2</h2>
                {team === TEAMS.TEAM_2 && userVideoComponent ? userVideoComponent : null}
            </div>
        </div>
    </>
    )
}

export default LandingPage;
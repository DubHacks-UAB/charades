import { Box, Button, ButtonGroup, Container, Grid, Paper } from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import VideoKitComponent from '../VideoKitComponent';
import NameGrid from './NameGrid';
import NameInputDialog from './NameInputDialog';
import './LandingPage.css';

import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4001";
const socket = socketIOClient(ENDPOINT);

// TODO - remove players when leave
// TODO - remove duplicates
// TODO - cleanup code
// TODO - show no team people upon starting app
// TODO - set team number limit
// TODO - set captain
// TODO - show server full if team capacity met
// TODO - show error if server not working


const LandingPage = () => {
    const TEAMS = {
        NO_TEAM: "NO_TEAM",
        TEAM_1: "TEAM_1",
        TEAM_2: "TEAM_2",
    }

    const [response, setResponse] = useState("");

    const [dialogOpen, setDialogOpen] = useState(true)
    const [isInvalidNameInput, setIsInvalidNameInput] = useState(false)
    const [nameInput, setNameInput] = useState(null)
    const [isNameCreated, setIsNameCreated] = useState(false)
    const [team, setTeam] = useState(null)
    const [userVideoComponent, setUserVideoComponent] = useState(null)
    const [teamSelected, setTeamSelected] = useState(null)
    const [test1, setTest1] = useState(null)
    const [test2, setTest2] = useState(null)
    const [currentTeams, setCurrentTeams] = useState({
        team1: {
            members: []
          },
          team2: {
            members: []
          }
    })


    useEffect(() => {
        if (teamSelected === TEAMS.TEAM_1 || teamSelected === TEAMS.TEAM_2) {
            updateTeamInServer();
        }
    }, [teamSelected])

    useEffect(() => {
        console.log("current teams now " + JSON.stringify(currentTeams))
        // socket.emit("updateTeams", currentTeams)
                console.log("UPDATED")
        setTest1(renderPlayerNamesForTeam(TEAMS.TEAM_1))
        setTest2(renderPlayerNamesForTeam(TEAMS.TEAM_2))
        // renderPlayerNamesForTeam(TEAMS.TEAM_1)
    }, [currentTeams])


    socket.on('broadcast', (n) => {
        console.log(n)
    })
    // TODO - done updating emit should be sent to server to update other client? OR update every couple mins

    const updateTeamInServer = () => {
        socket.emit("updateTeam", {
            teamSelected: teamSelected,
            userName: nameInput,
        })

    socket.on('updateTeamForUser', (data) => {
        if (data.status === 'SUCCESS') {
            setTeam(data.newTeam)
            console.log(data.teams)
            setCurrentTeams(data.teams)
        }})
    };

    // useEffect(() => {
    //     console.log("NEW TEAM! "+ team)
    // }, [team])

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
        setTeamSelected(TEAMS.TEAM_1)
    }

    const handleClickTeam2Button = () => {
        setTeamSelected(TEAMS.TEAM_2)
    }

    // socket.on("updateTeams", (teams) => {
    //     console.log("UPDATED")
    //     setTest1(renderPlayerNamesForTeam(teams.team1))
    //     setTest2(renderPlayerNamesForTeam(teams.team2))
    // })
    const renderPlayerNamesForTeam = (team) => {
        let teamMembers;
        if (team === TEAMS.TEAM_1) {
            teamMembers = currentTeams.team1.members;
        } else if (team === TEAMS.TEAM_2) {
            teamMembers = currentTeams.team2.members;
        }
        const nameDisplayComponents = []
        for (let i = 0; i < teamMembers.length; i++) {
            console.log(i)
            nameDisplayComponents.push(
                <li>{teamMembers[i]}</li>
            )
        }
        if (nameDisplayComponents.length > 0) {
            return(
                <ul>{nameDisplayComponents}</ul>
            )
        } else {
            return null;
        }
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
            {/* {!dialogOpen && team === TEAMS.NO_TEAM && userVideoComponent ? userVideoComponent: null} */}
            {/* {team === TEAMS.NO_TEAM ? renderCardForPlayer() : null} */}
        </div>
        {/* {isNameCreated && team  ? showJoinTeamButtons() : null} */}
        {showJoinTeamButtons()}

        <div className="all-team-sections">
            <div className="team1-section">
                <h2>Team 1</h2>
                <Grid container spacing={1}>
                    {test1}
                </Grid>
                {/* {team === TEAMS.TEAM_1 && userVideoComponent ? userVideoComponent : null} */}
            </div>
            <div className="team2-section">
                <h2>Team 2</h2>
                {/* {team === TEAMS.TEAM_2 && userVideoComponent ? userVideoComponent : null} */}
                <Grid container spacing={1}>
                    {test2}
                </Grid>
            </div>
        </div>
    </>
    )
}

export default LandingPage;
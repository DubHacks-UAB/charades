import React, {useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button, TextField } from '@material-ui/core';

const LandingPage = () => {
    const [dialogOpen, setDialogOpen] = useState(true)
    const [isInvalidNameInput, setIsInvalidNameInput] = useState(false)
    const [nameInput, setNameInput] = useState(null)

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


    return (
        <>
        <Dialog
            open={dialogOpen}
            onClose={onClose}
            fullWidth
            aria-labelledby="input-name-dialog"
        >
            <DialogTitle id="name-dialog-title">What is your name?</DialogTitle>
            <TextField
                autoFocus
                error={isInvalidNameInput}
                onChange={onChange}
                helperText={isInvalidNameInput ? "Please enter a valid name." : null}
                margin="dense"
                id="name"
                label="Name"
                fullWidth
                />
            <DialogActions>
                <Button variant="contained" onClick={onConfirm} color="primary">
                    Join Game
                </Button>
            </DialogActions>
        </Dialog>
    </>
    )
}

export default LandingPage;
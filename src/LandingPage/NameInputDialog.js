import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button, TextField } from '@material-ui/core';

const NameInputDialog = props => {
    return (
        <>
        <Dialog
            open={props.dialogOpen}
            onClose={props.onClose}
            fullWidth
            aria-labelledby="input-name-dialog"
        >
            <DialogTitle id="name-dialog-title">What is your name?</DialogTitle>
            <TextField
                autoFocus
                error={props.isInvalidNameInput}
                onChange={props.onChange}
                helperText={props.isInvalidNameInput ? "Please enter a valid name." : null}
                margin="dense"
                id="name"
                label="Name"
                fullWidth
                />
            <DialogActions>
                <Button variant="contained" onClick={props.onConfirm} color="primary">
                    Join Game
                </Button>
            </DialogActions>
        </Dialog>
    </>
    )
}

export default NameInputDialog;
import React from "react";
import {
    Button,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContentText,
    DialogContent,

} from "@material-ui/core";


const ConfirmationPopup = props => {

    const { title, popupState, setPopupState, handleConfirmationAction, messageToDisplay, confirmationBtnText } = props;

    return (
        <Dialog open={popupState}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {messageToDisplay}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleConfirmationAction}
                    color="primary"
                >
                    {confirmationBtnText}
                </Button>
                <Button onClick={() => {
                    setPopupState(false)
                }} color="primary">
                    Cancel
          </Button>
            </DialogActions>
        </Dialog >

    );
};

export default ConfirmationPopup;
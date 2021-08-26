import React, { useState } from "react";
import {
    Grid,
    Button,
    Dialog,
    Toolbar,
    TextField,
    IconButton,
    Typography,
    DialogActions,
    DialogContent,
    FormControlLabel,
    Checkbox,
    OutlinedInput,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    dialogContent: {
        overflow: "hide",
        minHeight: "maxContent"
    },
    textField: {
        [`& fieldset`]: {
            borderRadius: "4px",
            border: "2px solid darkGrey"
        },
        verticalAlign: "middle"
    },
    field: {
        borderRadius: 0,
        fontSize: 14,
        height: 30,
        paddingRight: 0
    },
    label: {
        marginBottom: 5,
        fontSize: 14
    },
    dialogAction: {
        padding: "7px 6px 10px 0px"
    },
    button: {
        fontSize: 14,
        textTransform: "unset",
        fontWeight: "400",
        boxShadow: "none",
        padding: "4px 16px"
    },
    toolbar: {
        minHeight: "40px",
        paddingRight: "0px",
        paddingLeft: "0px"
    },
    dialogueTitle: {
        paddingTop: "10px",
        paddingBottom: "10px",
        fontWeight: "600",
        fontSize: "22px",
        lineHeight: "24px",
        color: "#333333"
    },
    dialog: {
        paddingLeft: "24px",
        paddingRight: "24px",
        maxWidth: "410px"
    },
    outLinedInput: {
        width: "100%",
        minHeight: "127px",
        background: "#FFFFFF",
        border: "2px solid #B3B3B3",
        boxSizing: "border-box",
        borderRadius: "5px",
        borderWidth: "0.5px"
      },
}));

const FormHeader = props => {
    const classes = useStyles();
    const { viewModeType, setDialogueState } = props;
    return(
        <Toolbar className={classes.toolbar}>
            <Typography variant="h6" className={classes.dialogueTitle}>
                {viewModeType === 1 ? "New Task" : "Edit Task"}
            </Typography>
            <IconButton
                color="inherit"
                onClick={() => {
                    setDialogueState(false);
                }}
                aria-label="close"
                style={{ marginLeft: "auto" }}
            >
                <Close />
            </IconButton>
        </Toolbar>
    );
}

const DialogAction = props => {
    const classes = useStyles();
    const { viewModeType } = props;
    return (
        <DialogActions className={classes.dialogAction}>
            <Button
                size="medium"
                variant="contained"
                type="submit"
                className={classes.button}
                color="primary"
            >
                    {viewModeType === 1 ? "Add Task" : "Update Task"}
            </Button>
        </DialogActions>
    );
}

const TaskForm = props => {
    const classes = useStyles();
    const {
        onSubmit,
        formValues,
        viewModeType,
        dialogueState,
        setDialogueState
    } = props;
    const [formState, setFormState] = useState(formValues);

    const handleChange = event => {
        const value = ["urgent","important"].includes(event.target.name) ? event.target.checked : event.target.value;
        setFormState({ ...formState, [event.target.name]:  value});
        console.log(formState);
    };

    return (
        <Dialog
            PaperProps={{ classes: { root: classes.dialog } }}
            open={dialogueState}
            fullWidth={true}
            maxWidth="sm"
        >
            <form
                onSubmit={event => {
                    event.preventDefault();
                    onSubmit(formState);
                }}
            >
                <FormHeader setDialogueState={setDialogueState} viewModeType={viewModeType} />
                <DialogContent dividers className={classes.dialogContent}>
                    <Grid container>
                        <Grid item container spacing={2} direction="column">
                            <Grid item>
                                <div className={classes.label}>Task Name</div>
                                <TextField
                                    fullWidth
                                    type="text"
                                    size="small"
                                    name="task_name"
                                    required={true}
                                    variant="outlined"
                                    InputProps={{
                                        classes: {
                                            root: classes.field
                                        }
                                    }}
                                    placeholder="Task Name"
                                    value={formState.task_name}
                                    className={classes.textField}
                                    onChange={handleChange}
                                />
                            </Grid>
                            <Grid item>
                                <div className={classes.label}>Description</div>
                                <OutlinedInput
                                    name="description"
                                    placeholder={"Type description here"}
                                    multiline
                                    rows={3}
                                    className={classes.outLinedInput}
                                    onChange={handleChange}
                                    value={formState.description}
                                    style={{ marginBottom: "18px" }}
                                />
                            </Grid>
                            <Grid item container>
                                <FormControlLabel
                                    control={
                                    <Checkbox
                                        checked={formState.urgent}
                                        onChange={handleChange}
                                        name="urgent"
                                        color="primary"
                                    />
                                    }
                                    label="Urgent"
                                />
                                <FormControlLabel
                                    control={
                                    <Checkbox
                                        checked={formState.important}
                                        onChange={handleChange}
                                        name="important"
                                        color="primary"
                                    />
                                    }
                                    label="Important"
                                />
                            </Grid>
                         </Grid>
                        </Grid>
                </DialogContent>
                <DialogAction viewModeType={viewModeType} />
            </form>
        </Dialog>
    );
};

export default TaskForm;
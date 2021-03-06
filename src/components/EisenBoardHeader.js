import React from "react";
import { Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    heading: {
        fontSize: "24px",
        color: "#3f51b5",
        display: "flex",
        justifyContent: "center"
    },
    buttonGrid: {
        display: "flex",
        justifyContent: "flex-end"
    }
  }));


function EisenBoardHeader (props) {
    const classes = useStyles();
    const { setDialogueState } = props;
    return (
            <Grid item container>
                <Grid item xs md className={classes.heading}>
                    EISENHOWER MATRIX
                </Grid>
                <Grid item xs={4} md={2} className={classes.buttonGrid}>
                    <Button variant="contained" color="primary" onClick={() => { setDialogueState(true); }}>
                        ADD NEW TASK
                    </Button>
                </Grid>
            </Grid>
    );
}

export default EisenBoardHeader;
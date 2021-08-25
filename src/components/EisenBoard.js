import React from "react";
import { Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
    root: {
      padding: 20
    },
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


function EisenBoard (props) {
    const classes = useStyles();
    return (
        <Grid container direction="column" className={classes.root}>
            <Grid item container>
                <Grid item xs className={classes.heading}>
                    EISENHOWER MATRIX
                </Grid>
                <Grid item xs={2} className={classes.buttonGrid}>
                    <Button variant="contained" color="primary">
                        ADD NEW TASK
                    </Button>
                </Grid>
            </Grid>
            <Grid item>
                sections
            </Grid>
        </Grid>
    );
}

export default EisenBoard;
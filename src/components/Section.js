import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    container: {
        border: "1px solid lightgrey",
        borderRadius: "2px",
        backgroundColor: "white",
        minWidth: "300px",
        margin: "20px",
        padding: "20px"
    },
    title: {
        display: "flex",
        justifyContent: "center",
        margin : "auto",
        color: "rgba(0, 0, 0, 0.65)",
        fontSize: "14px"
    }
  }));


function Section (props) {
    const classes = useStyles();
    const { title } = props;
        return (
            <Grid container direction="column" className={classes.container} >
                <Grid item xs={12} className={classes.title}>
                   {title}
                </Grid>
            </Grid>
        );
    }

export default Section;
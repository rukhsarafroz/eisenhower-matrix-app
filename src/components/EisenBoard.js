import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import EisenBoardHeader from "./EisenBoardHeader";
import Section from "./Section";
import TaskForm from "./TaskForm";
import { useDispatch, useSelector } from "react-redux";
import { getTaskList } from "../actions/task";

const useStyles = makeStyles(theme => ({
    root: {
      padding: 20
    },
    boards: {
        display: "flex",
        justifyContent: "center"
    }
  }));

  const Sections = props => {
    const { section, taskMap, index, title } = props;
		const tasks = section && taskMap && section.taskIds.map(
			taskId => taskMap[taskId]
		);
    return (
        <Section title={title} section={section} tasks={tasks} index={index} />
    )
  }

function EisenBoard (props) {
    const classes = useStyles();
    const [dialogueState,setDialogueState] = useState(false);
    const dispatch = useDispatch();
    const formState = {
        task_name: null,
        description: null,
        urgent: false,
        important: false,
    }

    useEffect(() => {
        dispatch(getTaskList());
    }, [dispatch])

    const {
        tasklist,
        sections
      } = useSelector(
        state => state.task
      );

    useEffect(() => {
        console.log("tasklist",tasklist,"sections",sections);
    }, [tasklist,sections])

    return (
        <Grid container direction="column" className={classes.root}>
            <EisenBoardHeader setDialogueState={setDialogueState}/>
            <Grid item xs={12} container direction="column">
                <Grid item spacing={2} container className={classes.boards}>
                    <Grid item>
                        <Sections
                            title="Urgent-Important"
                            key="UrgentImportant"
                            taskMap={tasklist}
                            section={sections?.UrgentImportant}
                            index={0}
                        />
                    </Grid>
                    <Grid item>
                        <Sections
                            title="Urgent-Not-Important"
                            key="UrgentImportant"
                            taskMap={tasklist}
                            section={sections?.UrgentNotImportant}
                            index={1}
                        />
                    </Grid>
                </Grid>
                <Grid item spacing={2} container className={classes.boards}>
                    <Grid item>
                        <Sections
                            title="Not-Urgent-Important"
                            key="NotUrgentImportant"
                            taskMap={tasklist}
                            section={sections?.NotUrgentImportant}
                            index={0}
                        />
                    </Grid>
                    <Grid item>
                        <Sections
                            title="Not-Urgent-Not-Important"
                            key="NotUrgentNotImportant"
                            taskMap={tasklist}
                            section={sections?.NotUrgentNotImportant}
                            index={1}
                        />
                    </Grid>
                </Grid>
            </Grid>
            {dialogueState && <TaskForm viewModeType={1} dialogueState={dialogueState} setDialogueState={setDialogueState} formValues={formState}/>}
        </Grid>
    );
}

export default EisenBoard;
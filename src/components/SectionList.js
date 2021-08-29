import React from "react";
import Section from "./Section";

const SectionList = props => {
    const { section, taskMap, index, title } = props;
		const tasks = section && taskMap && section.taskIds.map(
			taskId => taskMap[taskId]
		);
    return (
        <Section title={title} section={section} tasks={tasks} index={index} />
    )
}

export default SectionList;
const initialData = {
    tasklist: {
        'task-1': {
            id: 'task-1',
            task_name: 'Set up for React JS',
            description : 'First set up and config the React App'
        },
        'task-2': {
            id: 'task-2',
            task_name: 'call Mom',
            description : 'Call Mom'
        },
        'task-3': {
            id: 'task-3',
            task_name: 'Book slot for covid vaccine',
            description : 'Book slot for covid vaccine through covin'
        },
        'task-4': {
            id: 'task-4',
            task_name: 'Make redux store',
            description : 'Next step is to create redux store'
        }
    },
    sections: {
        'UrgentImportant':{
            id: 'UrgentImportant',
            title: 'Urgent-Important',
            taskIds: ['task-3']
        },
        'UrgentNotImportant':{
            id: 'UrgentNotImportant',
            title: 'Urget-Not-Important',
            taskIds: ['task-1']
        },
        'NotUrgentImportant':{
            id: 'NotUrgentImportant',
            title: 'Not-Urgent-Important',
            taskIds: ['task-2', ]
        },
        'NotUrgentNotImportant':{
            id: 'NotUrgentNotImportant',
            title: 'Not-Urget-Not-Important',
            taskIds: ['task-4']
        },
    }
};

export default initialData;
import { Grid } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { useEffect, useState } from 'react';
import Task from './components/Task';
import { TaskDto } from './api/dto/task.dto';
import { TaskAPI } from './api/task.api';
import TaskModal from './components/TaskModal';

const App = () => {
	const [tasks, setTasks] = useState<TaskDto[]>([]);

	const [taskModalOpen, setTaskModalOpen] = useState(false);

	useEffect(() => {
		const fetchAll = async () => {
			const res = await TaskAPI.getAll();
			setTasks(res);
		};

		fetchAll();
	}, []);

	const addTask = (task: TaskDto) => {
		setTasks([...tasks, task]);
	};

	const onDelete = (taskId: number) => {
		setTasks([...tasks.filter((t) => t.id !== taskId)]);
	};

	const onUpdate = async (task: TaskDto) => {
		const updatedTask = await TaskAPI.findById(task.id);
		setTasks([...tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t))]);
	};

	return (
		<div>
			<TaskModal
				open={taskModalOpen}
				handleClose={() => setTaskModalOpen(false)}
				onTaskCreated={addTask}
			/>
			<AppBar position='static'>
				<Toolbar>
					<Typography
						style={{ textAlign: 'center' }}
						variant='h6'
						component='div'
						sx={{ flexGrow: 1 }}
					>
						Task Management
					</Typography>
					<Button
						variant='contained'
						color='primary'
						onClick={() => setTaskModalOpen(true)}
					>
						Create Task
					</Button>
				</Toolbar>
			</AppBar>
			<Grid container spacing={1}>
				{tasks.map((task) => (
					<Grid item xs={3} key={task.id} style={{ padding: '30px' }}>
						<Task onUpdate={onUpdate} onDelete={onDelete} task={task} />
					</Grid>
				))}
			</Grid>
		</div>
	);
};

export default App;

import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { TaskDto, TaskStatus } from '../api/dto/task.dto';
import { TaskAPI } from '../api/task.api';
import TaskModal from './TaskModal';
import Chip from '@mui/material/Chip';

interface Props {
	task: TaskDto;
	onDelete: (taskId: number) => void;
	onUpdate: (task: TaskDto) => void;
}

const Task = ({ task, onDelete, onUpdate }: Props) => {
	const [taskModalOpen, setTaskModalOpen] = useState(false);

	const deleteTask = async () => {
		await TaskAPI.deleteOne(task.id);
		onDelete(task.id);
	};

	const chipColor = () => {
		switch (task.status) {
			case TaskStatus.Created:
				return 'default';
			case TaskStatus.InProgress:
				return 'primary';
			case TaskStatus.Done:
				return 'success';
		}
	};

	return (
		<>
			<TaskModal
				task={task}
				open={taskModalOpen}
				handleClose={() => setTaskModalOpen(false)}
				onTaskUpdated={(updatedtask: TaskDto) => {
					return onUpdate(updatedtask);
				}}
			/>
			<Card variant='outlined'>
				<CardContent style={{ textAlign: 'center' }}>
					<Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
						{task.title}
					</Typography>
					<Typography variant='body2'>
						Description: {task.description}
					</Typography>
					<Typography variant='body2'>Status: {task.status}</Typography>
					<Chip label={task.status} color={chipColor()} />
				</CardContent>
				<CardActions style={{ float: 'right' }}>
					<Button
						size='small'
						variant='contained'
						color='secondary'
						onClick={() => setTaskModalOpen(true)}
					>
						Edit
					</Button>
					<Button
						size='small'
						variant='contained'
						color='error'
						onClick={deleteTask}
					>
						Delete
					</Button>
				</CardActions>
			</Card>
		</>
	);
};

export default Task;

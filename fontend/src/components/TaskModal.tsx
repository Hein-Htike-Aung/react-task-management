import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import React, { useEffect, useState } from 'react';
import { TaskDto, TaskStatus } from '../api/dto/task.dto';
import { TaskAPI } from '../api/task.api';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

interface Props {
	open: boolean;
	handleClose: () => void;
	task?: TaskDto;
	onTaskCreated?: (task: TaskDto) => void;
	onTaskUpdated?: (task: TaskDto) => void;
}

const TaskModal = ({
	task,
	open,
	handleClose,
	onTaskCreated,
	onTaskUpdated,
}: Props) => {
	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [status, setStatus] = useState<TaskStatus>(TaskStatus.Created);

	const handleChange = (event: SelectChangeEvent) => {
		setStatus(event.target.value as TaskStatus);
	};

	useEffect(() => {
		if (task) {
			setTitle(task.title);
			setDescription(task.description);
		}
	}, [task]);

	const saveTask = async () => {
		if (!task) {
			const resp = await TaskAPI.createOne({ title, description, status });

			if (onTaskCreated) {
				onTaskCreated(resp);
			}
		} else {
			const resp = await TaskAPI.updateOne(task.id, {
				title,
				description,
				status,
			});

			if (onTaskUpdated) {
				onTaskUpdated(resp);
			}
		}

		handleClose();
		setTitle('');
		setDescription('');
	};

	return (
		<div>
			<Dialog
				className='modal'
				fullWidth
				maxWidth='sm'
				open={open}
				onClose={handleClose}
			>
				<DialogTitle>{task ? 'Edit' : 'Create New'} Task</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin='dense'
						label='Title'
						type='text'
						fullWidth
						variant='standard'
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
					<TextField
						margin='dense'
						label='Description'
						type='text'
						fullWidth
						variant='standard'
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
					<FormControl fullWidth style={{ marginTop: '20px' }}>
						<Select
							labelId='demo-simple-select-label'
							id='demo-simple-select'
							value={status}
							label='Status'
							onChange={handleChange}
						>
							<MenuItem value={'Created'}>Created</MenuItem>
							<MenuItem value={'InProgress'}>InProgress</MenuItem>
							<MenuItem value={'Done'}>Done</MenuItem>
						</Select>
					</FormControl>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button color='primary' variant='contained' onClick={saveTask}>
						{task ? 'Edit Task' : 'Create Task'}
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default TaskModal;

import { UpdateTaskDTO } from './dto/update-task.dto';
import { CreateTaskDTO } from './dto/create-task.dto';
import { TaskDto } from './dto/task.dto';
const API_URL = 'http://localhost:3000/task';

export class TaskAPI {
	public static async getAll(): Promise<TaskDto[]> {
		const resp = await fetch(`${API_URL}`, {
			method: 'GET',
		});

		return await resp.json();
	}

	public static async findById(id: number): Promise<TaskDto> {
		const resp = await fetch(`${API_URL}/${id}`, {
			method: 'GET',
		});

		return await resp.json();
	}

	public static async createOne(createRequest: CreateTaskDTO) {
		const resp = await fetch(`${API_URL}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(createRequest),
		});

		return await resp.json();
	}

	public static async updateOne(id: number, updateTaskDto: UpdateTaskDTO) {
		const resp = await fetch(`${API_URL}/${id}`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(updateTaskDto),
		});

		return await resp.json();
	}

	public static async deleteOne(id: number) {
		const resp = await fetch(`${API_URL}/${id}`, {
			method: 'DELETE',
		});

		return await resp.json();
	}
}

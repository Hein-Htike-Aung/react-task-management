import { TaskStatus } from './task.dto';
export interface CreateTaskDTO {
	title: string;
	description?: string;
	status?: TaskStatus;
}

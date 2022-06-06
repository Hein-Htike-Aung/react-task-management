export enum TaskStatus {
	Created = 'Created',
	InProgress = 'InProgress',
	Done = 'Done',
}

export interface TaskDto {
	id: number;
	title: string;
	description: string;
	status: TaskStatus;
}

import { TaskStatus } from "../entity/task.entity";

export class UpdateTaskRequest {
  title?: string;
  description?: string;
  status?: TaskStatus;
}

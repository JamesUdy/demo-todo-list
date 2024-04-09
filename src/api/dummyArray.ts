import { categories } from "../components/toDoForm/Categories";
import { progressStatus } from "../components/toDoForm/ProgressStatus";
import { ToDoValueProps } from "../libs/types";

export const toDoListData: ToDoValueProps[] = [
  {
    taskId: 1,
    taskTitle: "Task 1",
    taskDescription: "Description for Task 12",
    taskPriority: categories[0].label, // Personal
    taskProgress: progressStatus[0].status, // Yet to start
    taskCreatedAt: "2022-04-14",
    taskDueDate: "2024-04-5",
  },
  {
    taskId: 2,
    taskTitle: "Task 2",
    taskDescription: "Description for Task 2",
    taskPriority: categories[1].label, // Home
    taskProgress: progressStatus[1].status, // In Progress
    taskCreatedAt: "2023-04-09",
    taskDueDate: "2024-04-15",
  },
  {
    taskId: 3,
    taskTitle: "Task 3",
    taskDescription: "Description for Task 3",
    taskPriority: categories[2].label, // Studies
    taskProgress: progressStatus[2].status, // Completed
    taskCreatedAt: "2023-04-09",
    taskDueDate: "2024-04-15",
  },
  {
    taskId: 4,
    taskTitle: "Task 4",
    taskDescription: "Description for Task 4",
    taskPriority: categories[3].label, // Business
    taskProgress: progressStatus[0].status, // Yet to start
    taskCreatedAt: "2023-04-09",
    taskDueDate: "2024-04-15",
  },
  {
    taskId: 5,
    taskTitle: "Task 5",
    taskDescription: "Description for Task 5",
    taskPriority: categories[4].label, // Fitness
    taskProgress: progressStatus[1].status, // In Progress
    taskCreatedAt: "2023-04-09",
    taskDueDate: "2024-04-15",
  },
  {
    taskId: 6,
    taskTitle: "Task 6",
    taskDescription: "Description for Task 6",
    taskPriority: categories[5].label, // Other
    taskProgress: progressStatus[2].status, // Completed
    taskCreatedAt: "2023-04-09",
    taskDueDate: "2024-04-15",
  },
  {
    taskId: 7,
    taskTitle: "Task 7",
    taskDescription: "Description for Task 7",
    taskPriority: categories[0].label, // Personal
    taskProgress: progressStatus[1].status, // In Progress
    taskCreatedAt: "2023-04-09",
    taskDueDate: "2024-04-15",
  },
  {
    taskId: 8,
    taskTitle: "Task 8",
    taskDescription: "Description for Task 8",
    taskPriority: categories[1].label, // Home
    taskProgress: progressStatus[2].status, // Completed
    taskCreatedAt: "2023-04-09",
    taskDueDate: "2024-04-15",
  },
  {
    taskId: 9,
    taskTitle: "Task 9",
    taskDescription: "Description for Task 9",
    taskPriority: categories[2].label, // Studies
    taskProgress: progressStatus[0].status, // Yet to start
    taskCreatedAt: "2023-04-09",
    taskDueDate: "2024-04-15",
  },
  {
    taskId: 10,
    taskTitle: "Task 10",
    taskDescription: "Description for Task 10",
    taskPriority: categories[3].label, // Business
    taskProgress: progressStatus[1].status, // In Progress
    taskCreatedAt: "2023-04-09",
    taskDueDate: "2024-04-15",
  }
];

export type Book = {
  title: string;
  description: string;
  imageUrl: string;
};

export type Review = {
  id: string;
  author: string;
  text: string;
};

export type User = {
  userId: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  department: string;
};

export type Project = {
  projectId: string;
  projectName: string;
};

export type Department = {
  departmentId: string;
  departmentName: string;
  departmentDirector: string;
};

export type WorkUnit = {
  projectId: string;
  userId: string;
  startTime: string;
  endTime: string;
  duration: number;
  comment: string;
  workDate: string;
};

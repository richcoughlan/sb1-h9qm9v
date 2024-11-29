export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Course {
  id: string;
  title: string;
  provider: string;
  location: string;
  startDate: string;
  endDate: string;
  credits: number;
  progress: number;
}

export interface Certificate {
  id: number;
  title: string;
  provider: string;
  completionDate: Date;
  credits: number;
}
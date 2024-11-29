import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Course } from '../../types';

interface CourseState {
  courses: Course[];
  addCourse: (course: Omit<Course, 'id' | 'progress'>) => void;
  updateCourseProgress: (courseId: string, progress: number) => void;
  removeCourse: (courseId: string) => void;
}

// Example courses that will be shown by default
const exampleCourses: Course[] = [
  {
    id: 'acls-2024',
    title: 'Example Course 1: Advanced Cardiac Life Support',
    provider: 'American Heart Association',
    location: 'Miami, FL',
    startDate: '2024-03-14',
    endDate: '2024-03-15',
    credits: 8,
    progress: 100
  },
  {
    id: 'emu-2024',
    title: 'Example Course 2: Emergency Medicine Update',
    provider: 'Mayo Clinic',
    location: 'Honolulu, HI',
    startDate: '2024-03-31',
    endDate: '2024-04-02',
    credits: 12,
    progress: 0
  }
];

export const useCourses = create<CourseState>()((set) => ({
  courses: exampleCourses,
  addCourse: (course) =>
    set((state) => ({
      courses: [
        ...state.courses,
        {
          ...course,
          id: Math.random().toString(36).substring(7),
          progress: 0,
        },
      ],
    })),
  updateCourseProgress: (courseId, progress) =>
    set((state) => ({
      courses: state.courses.map((course) =>
        course.id === courseId ? { ...course, progress } : course
      ),
    })),
  removeCourse: (courseId) =>
    set((state) => ({
      courses: state.courses.filter((course) => course.id !== courseId),
    })),
}));
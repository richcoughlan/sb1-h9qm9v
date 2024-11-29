import React, { useState } from 'react';
import { Plus, Eye } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { AddCourseModal } from '../components/courses/AddCourseModal';
import { CertificateModal } from '../components/certificates/CertificateModal';
import { useCourses } from '../lib/hooks/useCourses';
import { useAuth } from '../lib/auth';
import { formatDate } from '../lib/utils/date';
import { Link } from 'react-router-dom';
import { Course } from '../types';

export const Dashboard: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const { courses } = useCourses();
  const { isAuthenticated, user } = useAuth();

  const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
  const pendingCourses = courses.filter(course => course.progress < 100);
  const upcomingCourses = courses.filter(course => new Date(course.startDate) > new Date());

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {isAuthenticated ? `Welcome back, ${user?.name}` : 'Welcome to Concierge CME'}
          </h1>
          <p className="mt-1 text-gray-600">Track and manage your CME credits</p>
        </div>
        {isAuthenticated && (
          <Button onClick={() => setIsModalOpen(true)} className="flex items-center">
            <Plus className="mr-2 h-4 w-4" />
            Add New Course
          </Button>
        )}
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center space-x-3">
            <div className="rounded-lg bg-blue-50 p-2">
              <svg className="h-6 w-6 text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 15L8.5 11.5L9.91421 10.0858L12 12.1716L16.0858 8.08579L17.5 9.5L12 15Z" fill="currentColor"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z" fill="currentColor"/>
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Credits</p>
              <p className="text-2xl font-bold text-gray-900">{totalCredits}</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center space-x-3">
            <div className="rounded-lg bg-yellow-50 p-2">
              <svg className="h-6 w-6 text-yellow-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z" fill="currentColor"/>
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Verification</p>
              <p className="text-2xl font-bold text-gray-900">{pendingCourses.length}</p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="flex items-center space-x-3">
            <div className="rounded-lg bg-purple-50 p-2">
              <svg className="h-6 w-6 text-purple-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Upcoming Courses</p>
              <p className="text-2xl font-bold text-gray-900">{upcomingCourses.length}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-medium">Recent CME Courses</h2>
          <Link to="/courses" className="text-sm font-medium text-blue-600 hover:text-blue-500">
            View all
          </Link>
        </div>
        <div className="divide-y divide-gray-200">
          {courses.map((course) => (
            <div key={course.id} className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">{course.title}</h3>
                  <p className="text-sm text-gray-500">
                    {course.provider} • {course.credits} credits
                  </p>
                  <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                    <span>{course.location}</span>
                    <span>{formatDate(new Date(course.startDate))} - {formatDate(new Date(course.endDate))}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    course.progress === 100 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {course.progress === 100 ? 'Verified' : 'Pending'}
                  </span>
                  {course.progress === 100 && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex items-center"
                      onClick={() => setSelectedCourse(course)}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View Certificate
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AddCourseModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      {selectedCourse && (
        <CertificateModal
          course={selectedCourse}
          isOpen={true}
          onClose={() => setSelectedCourse(null)}
        />
      )}
    </div>
  );
};
import React, { useState } from 'react';
import { Eye, Clock, MapPin, Calendar, Plus } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { AddCourseModal } from '../components/courses/AddCourseModal';
import { CertificateModal } from '../components/certificates/CertificateModal';
import { useCourses } from '../lib/hooks/useCourses';
import { Course } from '../types';
import { formatDate } from '../lib/utils/date';

export const Courses: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const { courses } = useCourses();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">CME Courses</h1>
          <p className="mt-1 text-gray-600">Manage and track all your CME courses</p>
        </div>
        <Button onClick={() => setIsAddModalOpen(true)} className="flex items-center">
          <Plus className="mr-2 h-4 w-4" />
          Add New Course
        </Button>
      </div>

      <div className="space-y-4">
        {courses.map((course) => (
          <div key={course.id} className="rounded-lg border border-gray-200 bg-white p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{course.title}</h3>
                <p className="text-sm text-gray-600">{course.provider} • {course.credits} credits</p>
              </div>
              <div className="flex items-center space-x-2">
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  course.progress === 100 ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {course.progress === 100 ? 'Verified' : 'Pending'}
                </span>
              </div>
            </div>

            <div className="mt-4 flex items-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <MapPin className="mr-1.5 h-4 w-4" />
                {course.location}
              </div>
              <div className="flex items-center">
                <Calendar className="mr-1.5 h-4 w-4" />
                {formatDate(new Date(course.startDate))} - {formatDate(new Date(course.endDate))}
              </div>
            </div>

            <div className="mt-4">
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
        ))}
      </div>

      <AddCourseModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
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
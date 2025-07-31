import React, { useState } from 'react';
import { courseModules } from './constants';
import type { Lesson, Module } from '../types';
import { ChevronDownIcon } from './icons';

interface SidebarProps {
  activeLesson: Lesson | null;
  setActiveLesson: (lesson: Lesson) => void;
}

const ModuleItem: React.FC<{
  module: Module;
  activeLesson: Lesson | null;
  setActiveLesson: (lesson: Lesson) => void;
}> = ({ module, activeLesson, setActiveLesson }) => {
  const [isOpen, setIsOpen] = useState(true);

  const isModuleActive = module.lessons.some(l => l.id === activeLesson?.id);

  return (
    <div className="py-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center text-left px-4 py-2 text-sm font-semibold text-gray-300 hover:bg-gray-700/50 rounded-md transition-colors"
      >
        <span>{module.title}</span>
        <ChevronDownIcon
          className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>
      {isOpen && (
        <div className="mt-2 space-y-1 pl-6 pr-2">
          {module.lessons.map(lesson => (
            <button
              key={lesson.id}
              onClick={() => setActiveLesson(lesson)}
              className={`w-full text-left px-4 py-2 text-sm rounded-md transition-all duration-200 block ${
                activeLesson?.id === lesson.id
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium shadow-lg'
                  : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
              }`}
            >
              {lesson.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export const Sidebar: React.FC<SidebarProps> = ({ activeLesson, setActiveLesson }) => {
  return (
    <nav className="flex-1 overflow-y-auto p-4 space-y-2">
      {courseModules.map(module => (
        <ModuleItem
          key={module.id}
          module={module}
          activeLesson={activeLesson}
          setActiveLesson={setActiveLesson}
        />
      ))}
    </nav>
  );
};
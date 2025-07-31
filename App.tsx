
import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { LessonView } from './components/LessonView';
import { courseModules } from './components/constants';
import type { Lesson } from './types';
import { N8NLogo } from './components/icons';

const App: React.FC = () => {
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(courseModules[0].lessons[0]);

  return (
    <div className="flex h-screen bg-gray-900 text-gray-200 font-sans">
      <div className="flex-shrink-0 w-80 bg-gray-900/70 backdrop-blur-sm border-r border-gray-700/50 flex flex-col">
        <div className="flex items-center justify-center h-20 border-b border-gray-700/50 px-6">
           <N8NLogo className="h-10 w-auto text-white" />
           <h1 className="text-xl font-bold ml-3 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
            N8N Course
          </h1>
        </div>
        <Sidebar activeLesson={activeLesson} setActiveLesson={setActiveLesson} />
      </div>

      <main className="flex-1 overflow-y-auto">
        {activeLesson ? (
          <LessonView key={activeLesson.id} lesson={activeLesson} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <N8NLogo className="h-24 w-auto mx-auto text-gray-600" />
              <p className="mt-4 text-2xl text-gray-500">Select a lesson to begin</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
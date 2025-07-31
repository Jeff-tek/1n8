import React, { useState, useEffect } from 'react';
import { generateLessonContent } from '../services/geminiService';
import type { GeneratedLessonContent, Lesson } from '../types';
import { WorkflowDiagram } from './WorkflowDiagram';
import { Quiz } from './Quiz';
import { CodeBlock } from './CodeBlock';
import { LightbulbIcon } from './icons';

interface LessonViewProps {
  lesson: Lesson;
}

const LoadingSkeleton: React.FC = () => (
    <div className="p-8 animate-pulse">
      <div className="h-10 bg-gray-700 rounded w-3/4 mb-6"></div>
      <div className="space-y-4">
        <div className="h-4 bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-700 rounded w-5/6"></div>
        <div className="h-4 bg-gray-700 rounded w-full"></div>
      </div>
      <div className="h-8 bg-gray-700 rounded w-1/2 mt-12 mb-6"></div>
      <div className="h-64 bg-gray-800 rounded-lg my-8"></div>
      <div className="space-y-8 mt-8">
        {[...Array(3)].map((_, i) => (
          <div key={i}>
            <div className="h-6 bg-gray-700 rounded w-1/3 mb-4"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-700 rounded w-full"></div>
              <div className="h-4 bg-gray-700 rounded w-full"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
);

export const LessonView: React.FC<LessonViewProps> = ({ lesson }) => {
  const [content, setContent] = useState<GeneratedLessonContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id: lessonId, title: lessonTitle } = lesson;

  useEffect(() => {
    const fetchContent = async () => {
      setLoading(true);
      setError(null);
      try {
        const lessonContent = await generateLessonContent(lessonTitle);
        setContent(lessonContent);
      } catch (e: unknown) {
        if (e instanceof Error) {
            setError(e.message);
        } else {
            setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchContent();
  }, [lessonId, lessonTitle]);

  if (loading) {
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full p-8 text-center">
        <div>
          <h2 className="text-2xl font-bold text-red-400">Error Generating Lesson</h2>
          <p className="mt-2 text-gray-400">{error}</p>
          <p className="mt-4 text-sm text-gray-500">
            This might be due to a missing or invalid API key, or a network issue. Please check the console for more details.
          </p>
        </div>
      </div>
    );
  }

  if (!content) {
    return null;
  }

  return (
    <div className="p-6 md:p-10 lg:p-12 text-gray-300">
      <header className="mb-8 border-b border-gray-700 pb-6">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text mb-2">
          {lesson.title}
        </h1>
        <p className="text-lg text-gray-400 max-w-4xl">{content.introduction}</p>
      </header>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-100">Business Scenario</h2>
        <div className="p-6 bg-gray-800/50 border border-gray-700/50 rounded-lg shadow-inner">
          <p className="text-gray-300 italic">{content.scenario}</p>
        </div>
      </section>

       <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-100">Workflow Diagram</h2>
        <WorkflowDiagram workflow={content.workflow} />
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-100">Step-by-Step Guide</h2>
        <div className="space-y-8">
          {content.steps.map((step, index) => (
            <div key={index} className="flex gap-6">
                <div className="flex flex-col items-center">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 text-white font-bold">{index + 1}</div>
                    <div className="w-px h-full bg-gray-700"></div>
                </div>
                <div className="flex-1 pb-8">
                    <h3 className="text-xl font-semibold mb-2 text-gray-100">{step.title}</h3>
                    <p className="text-gray-400 leading-relaxed mb-4">{step.instruction}</p>
                    {step.codeExample && <CodeBlock {...step.codeExample} />}
                </div>
            </div>
          ))}
        </div>
      </section>
      
       <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-100">Troubleshooting Tips</h2>
        <div className="space-y-4">
            {content.troubleshooting.map((tip, index) => (
                <div key={index} className="p-4 bg-gray-800/50 border-l-4 border-yellow-500 rounded-r-lg">
                    <div className="flex items-center">
                        <LightbulbIcon className="h-6 w-6 text-yellow-400 mr-3 flex-shrink-0" />
                        <div>
                            <h4 className="font-semibold text-yellow-300">{tip.title}</h4>
                            <p className="text-gray-400 text-sm">{tip.tip}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
      </section>


      <section>
        <h2 className="text-2xl font-bold mb-6 text-gray-100">Knowledge Check</h2>
        <Quiz questions={content.quiz} lessonId={lesson.id} />
      </section>
    </div>
  );
};
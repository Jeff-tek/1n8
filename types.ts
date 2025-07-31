
export interface Lesson {
  id: string;
  title: string;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export interface CodeExample {
  language: string;
  code: string;
  description: string;
}

export interface Step {
  title: string;
  instruction: string;
  codeExample?: CodeExample;
}

export interface NodeData {
  id: string;
  label: string;
  type: string;
  x: number;
  y: number;
}

export interface EdgeData {
  id: string;
  source: string;
  target: string;
}

export interface Workflow {
  nodes: NodeData[];
  edges: EdgeData[];
}

export interface GeneratedLessonContent {
  introduction: string;
  scenario: string;
  steps: Step[];
  workflow: Workflow;
  quiz: QuizQuestion[];
  troubleshooting: {
      title: string;
      tip: string;
  }[];
}

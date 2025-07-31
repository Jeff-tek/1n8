
import type { Module } from '../types';

export const courseModules: Module[] = [
  {
    id: 'mod-1',
    title: 'Module 1: N8N Fundamentals & Setup',
    lessons: [
      { id: 'l1-1', title: 'Introduction to N8N' },
      { id: 'l1-2', title: 'Setting Up Your N8N Instance' },
      { id: 'l1-3', title: 'Exploring the N8N Editor UI' },
    ],
  },
  {
    id: 'mod-2',
    title: 'Module 2: Basic Nodes & Data Flow',
    lessons: [
      { id: 'l2-1', title: 'Understanding Nodes and Connections' },
      { id: 'l2-2', title: 'Working with the Start Node' },
      { id: 'l2-3', title: 'Data Flow and JSON Objects' },
      { id: 'l2-4', title: 'Using the Set Node' },
    ],
  },
  {
    id: 'mod-3',
    title: 'Module 3: API Integration & HTTP Requests',
    lessons: [
      { id: 'l3-1', title: 'Introduction to APIs' },
      { id: 'l3-2', title: 'Making GET Requests with HTTP Node' },
      { id: 'l3-3', title: 'POST, PUT, DELETE Requests' },
      { id: 'l3-4', title: 'Handling API Authentication' },
    ],
  },
  {
    id: 'mod-4',
    title: 'Module 4: Workflow Logic & Control Flow',
    lessons: [
      { id: 'l4-1', title: 'IF Node for Conditional Logic' },
      { id: 'l4-2', title: 'Switch Node for Multi-path Logic' },
      { id: 'l4-3', title: 'Merge Node for Combining Data' },
      { id: 'l4-4', title: 'Error Handling Workflows' },
    ],
  },
  {
    id: 'mod-5',
    title: 'Module 5: Advanced Data Manipulation',
    lessons: [
      { id: 'l5-1', title: 'Using Expressions for Dynamic Data' },
      { id: 'l5-2', title: 'Code Node for Custom JavaScript' },
      { id: 'l5-3', title: 'Looping Over Items' },
    ],
  },
  {
    id: 'mod-6',
    title: 'Module 6: Authentication & Security',
    lessons: [
      { id: 'l6-1', title: 'Managing Credentials' },
      { id: 'l6-2', title: 'OAuth2 and API Keys' },
      { id: 'l6-3', title: 'Security Best Practices' },
    ],
  },
  {
    id: 'mod-7',
    title: 'Module 7: Webhooks, Triggers & Real-time',
    lessons: [
      { id: 'l7-1', title: 'Creating Webhook Triggers' },
      { id: 'l7-2', title: 'Cron Node for Scheduled Workflows' },
      { id: 'l7-3', title: 'Real-time Customer Onboarding' },
    ],
  },
  {
    id: 'mod-8',
    title: 'Module 8: Advanced & Production',
    lessons: [
      { id: 'l8-1', title: 'Sub-Workflows and Reusability' },
      { id: 'l8-2', title: 'Production Deployment Strategies' },
      { id: 'l8-3', title: 'Monitoring and Optimization' },
    ],
  },
];
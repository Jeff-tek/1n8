import { GoogleGenAI, Type } from "@google/genai";
import type { GeneratedLessonContent } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    introduction: { type: Type.STRING, description: "A brief, engaging introduction to the lesson's topic." },
    scenario: { type: Type.STRING, description: "A real-world business scenario that the workflow will solve. For example: 'A new user signs up, and we want to automatically send them a welcome email and add them to our CRM.'" },
    steps: {
      type: Type.ARRAY,
      description: "A series of 4-6 detailed, step-by-step instructions to build the workflow.",
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: "A clear title for the step, e.g., 'Step 1: Create a Webhook Trigger'." },
          instruction: { type: Type.STRING, description: "Detailed instructions for this step, including what node to add and how to configure it. Refer to N8N UI elements exactly, like 'Click the '+' button'." },
          codeExample: {
            type: Type.OBJECT,
            description: "An optional code example, like a JSON body or a Javascript expression.",
            properties: {
              language: { type: Type.STRING, description: "e.g., 'json' or 'javascript'" },
              code: { type: Type.STRING, description: "The code snippet itself." },
              description: {type: Type.STRING, description: "A brief explanation of the code snippet."}
            }
          }
        }
      }
    },
    workflow: {
      type: Type.OBJECT,
      description: "A visual representation of the workflow. Nodes should be positioned in a logical flow from left to right.",
      properties: {
        nodes: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING, description: "A unique ID for the node, e.g., 'node-1'." },
              label: { type: Type.STRING, description: "The name of the node, e.g., 'Webhook'." },
              type: { type: Type.STRING, description: "The type of node, e.g., 'trigger', 'action', 'logic'." },
              x: { type: Type.INTEGER, description: "X coordinate for positioning, from 0 to 100." },
              y: { type: Type.INTEGER, description: "Y coordinate for positioning, from 0 to 100." },
            }
          }
        },
        edges: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING, description: "A unique ID for the edge, e.g., 'edge-1'." },
              source: { type: Type.STRING, description: "The ID of the source node." },
              target: { type: Type.STRING, description: "The ID of the target node." },
            }
          }
        }
      }
    },
    quiz: {
      type: Type.ARRAY,
      description: "A list of 5-8 multiple-choice quiz questions to test knowledge.",
      items: {
        type: Type.OBJECT,
        properties: {
          question: { type: Type.STRING, description: "The quiz question." },
          options: {
            type: Type.ARRAY,
            description: "An array of 4 possible answers.",
            items: { type: Type.STRING }
          },
          correctAnswerIndex: { type: Type.INTEGER, description: "The 0-based index of the correct answer in the options array." },
          explanation: { type: Type.STRING, description: "A brief explanation for why the correct answer is right." }
        }
      }
    },
    troubleshooting: {
        type: Type.ARRAY,
        description: "A list of 2-3 common problems and solutions related to the lesson.",
        items: {
            type: Type.OBJECT,
            properties: {
                title: { type: Type.STRING, description: "The problem title, e.g., 'Data Not Appearing'." },
                tip: { type: Type.STRING, description: "The solution or troubleshooting tip." }
            }
        }
    }
  }
};


export const generateLessonContent = async (lessonTitle: string): Promise<GeneratedLessonContent> => {
  try {
    const prompt = `
      Create a detailed, interactive lesson for an N8N course. The lesson is titled: "${lessonTitle}".

      Please adhere to the following structure and guidelines:
      1.  **Introduction:** Start with a concise and engaging paragraph introducing the topic.
      2.  **Scenario:** Describe a practical, real-world business problem this workflow will solve.
      3.  **Steps:** Provide a list of 4-6 detailed, step-by-step instructions. These should be very specific, referencing N8N UI elements like "Click the '+' button", "Double-click the node", and "Enter '{{$json.someValue}}' in the expression editor."
      4.  **Workflow Diagram:** Define the nodes and connections for a visual diagram. Position nodes logically from left to right. Assign 'x' coordinates between 0 (left) and 100 (right), and 'y' coordinates between 0 (top) and 100 (bottom).
      5.  **Quiz:** Create a challenging quiz with 5-8 multiple-choice questions. Each question must have exactly 4 options. Provide an explanation for the correct answer.
      6.  **Troubleshooting:** Add 2-3 common troubleshooting tips related to the lesson's content.
      7.  **Content Focus:** The lesson must be hands-on and practical, focusing on building a functional workflow. Use real N8N node names.

      Generate the output as a single JSON object that strictly follows the provided schema.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
      },
    });
    
    const jsonText = response.text.trim();
    return JSON.parse(jsonText) as GeneratedLessonContent;

  } catch (error) {
    console.error("Error generating lesson content:", error);
    throw new Error("Failed to generate lesson content from AI. Please check your API key and network connection.");
  }
};
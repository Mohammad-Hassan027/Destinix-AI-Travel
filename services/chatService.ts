import { chatWithAdvisor } from './geminiService';

/**
 * Wrapper around Gemini chat functionality for the destination guide.
 * Exposes a simple signature that matches the router expectation.
 */
export const chatWithGemini = async (
  destId: string,
  messages: { role: 'user' | 'assistant'; content: string }[]
): Promise<string> => {
  // In this mock implementation we ignore destId because the underlying
  // Gemini chat does not need it for the stub. In a real implementation you
  // could prepend a system prompt with destination context.
  const history = messages.map((m) => ({ role: m.role, content: m.content }));
  const lastMessage = messages[messages.length - 1];
  if (!lastMessage) return '';
  // Forward the last user message and the full history to the Gemini helper.
  return await chatWithAdvisor(lastMessage.content, history);
};

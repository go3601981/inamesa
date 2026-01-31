import { Injectable } from '@angular/core';
import { GoogleGenAI, Type } from '@google/genai';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    // Initialize Gemini with the API Key from environment
    this.ai = new GoogleGenAI({ apiKey: process.env['API_KEY'] || '' });
  }

  async generateOutline(client: string, tone: string, language: string): Promise<any[]> {
    if (!process.env['API_KEY']) {
      console.warn('No API Key found. Returning mock data.');
      return [
        { title: 'Overview', layout: 'content' },
        { title: 'Objectives', layout: 'content' },
        { title: 'Market Analysis', layout: 'content' }
      ];
    }

    const prompt = `Act as a professional presentation consultant. Create a presentation outline for a client named "${client}". 
    The tone must be "${tone}". The language must be "${language}".
    Return a JSON array of slides. Each slide should have a 'title' (string) and a 'layout' (enum: 'title', 'content', 'agenda', 'conclusion', 'three-column', 'comparison').
    Do not include the first title slide in this list, I will add it manually. Focus on the body slides.
    Limit to 5 key slides.`;

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                layout: { type: Type.STRING, enum: ['title', 'content', 'agenda', 'conclusion', 'three-column', 'comparison'] }
              },
              required: ['title', 'layout']
            }
          }
        }
      });

      const text = response.text;
      if (text) {
        return JSON.parse(text);
      }
      return [];
    } catch (e) {
      console.error('Gemini API Error:', e);
      throw e;
    }
  }

  async generateSlideContent(title: string, client: string, tone: string, language: string): Promise<string[]> {
     if (!process.env['API_KEY']) {
      return ['Placeholder content point 1', 'Placeholder content point 2', 'Placeholder content point 3'];
    }

    const prompt = `Write content for a presentation slide titled "${title}" for client "${client}".
    Tone: ${tone}. Language: ${language}.
    Provide 3-4 concise, professional bullet points.
    Return ONLY a JSON array of strings.`;

    try {
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        }
      });
      
      const text = response.text;
      return text ? JSON.parse(text) : [];
    } catch (e) {
      console.error('Gemini Content Error:', e);
      return ['Error generating content.'];
    }
  }
}
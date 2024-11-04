// gemini.service.ts
import { Injectable } from '@angular/core';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GeminiService {
  
  private genAI: GoogleGenerativeAI;
  private model: any;

  constructor() {
    this.genAI = new GoogleGenerativeAI(environment.geminiApiKey);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
  }

  async generateResponse(userInput: string) {
    const generationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 8192,
      responseMimeType: 'application/json',
      responseSchema: {
        type: 'object',
        description: 'Sort input data into specific resume fields',
        properties: {
          Address: { type: 'string', description: 'User address' },
          EDV: { type: 'string', description: 'EDV-Kenntnisse' },
          birthDate: { type: 'string', description: 'User birth date' },
          email: { type: 'string', description: 'User email address' },
          familyStatus: { type: 'string', description: 'User family status' },
          my_strong: { type: 'string', description: 'User strengths' },
          name: { type: 'string', description: 'User full name' },
          nationality: { type: 'string', description: 'User nationality' },
          phone: { type: 'string', description: 'User phone number' },
          languages: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                language: { type: 'string', description: 'Language spoken' },
                level: { type: 'string', description: 'Proficiency level' },
              },
            },
            description: 'Languages the user speaks with proficiency levels',
          },
          school: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: { type: 'string', description: 'School attended' },
                place: { type: 'string', description: 'School location' },
                date: { type: 'string', description: 'Attendance date' },
              },
            },
            description: 'User education history',
          },
          workExperience: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                position: { type: 'string', description: 'Job title or role' },
                place: { type: 'string', description: 'Company or organization' },
                date: { type: 'string', description: 'Employment date' },
              },
            },
            description: 'User work experience details',
          },
          workshops: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: { type: 'string', description: 'Workshop attended' },
                place: { type: 'string', description: 'Workshop location' },
                date: { type: 'string', description: 'Workshop attendance date' },
              },
            },
            description: 'User workshops attended',
          },
        },
      },
    };

    const chatSession = this.model.startChat({
      generationConfig,
      history: [
        {
          role: 'user',
          parts: [{ text: userInput }],
        },
      ],
    });

    try {
      const result = await chatSession.sendMessage(userInput);

      if (result && result.response && Array.isArray(result.response.candidates) && result.response.candidates.length > 0) {
        const candidate = result.response.candidates[0];
        if (candidate && candidate.content && Array.isArray(candidate.content.parts) && candidate.content.parts[0]?.text) {
          const rawText = candidate.content.parts[0].text;

          const parsedData = JSON.parse(rawText);
          console.log('Parsed Response:', parsedData);
          return parsedData;
        } else {
          console.error('Unexpected structure in `candidates`:', candidate);
        }
      } else {
        console.error('Unexpected API response format:', result);
      }
    } catch (error) {
      console.error('Error during API call or JSON parsing:', error);
    }
  }
}

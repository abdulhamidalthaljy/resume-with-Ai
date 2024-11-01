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
          languages: {
            type: 'array',
            items: { type: 'string' },
            description: 'Languages the user speaks',
          },
          level: { type: 'string', description: 'Language level' },
          my_strong: { type: 'string', description: 'User strengths' },
          name: { type: 'string', description: 'User full name' },
          nationality: { type: 'string', description: 'User nationality' },
          phone: { type: 'string', description: 'User phone number' },
          school: { type: 'string', description: 'School attended' },
          schoolDate: { type: 'string', description: 'School attendance date' },
          schoolPlace: { type: 'string', description: 'School location' },
          workExperience: { type: 'string', description: 'Work experience details' },
          workPlace: { type: 'string', description: 'Workplace' },
          workPlaceDate: { type: 'string', description: 'Date of work experience' },
          workshops: { type: 'string', description: 'Workshops attended' },
          workshopsPlace: { type: 'string', description: 'Workshop location' },
          workshopsPlaceDate: { type: 'string', description: 'Date of workshop attendance' },
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
  
      // Check if `response` and `candidates` array exist before accessing
      if (result && result.response && Array.isArray(result.response.candidates) && result.response.candidates.length > 0) {
        const candidate = result.response.candidates[0];
        if (candidate && candidate.content && Array.isArray(candidate.content.parts) && candidate.content.parts[0]?.text) {
          const rawText = candidate.content.parts[0].text;
  
          // Parse the JSON string safely
          const parsedData = JSON.parse(rawText);
          console.log('Parsed Response:', parsedData);
          return parsedData; // Return the parsed object
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
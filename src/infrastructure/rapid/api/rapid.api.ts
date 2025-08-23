import { Injectable, InternalServerErrorException } from '@nestjs/common';
import configuration from 'src/common/config/configuration';

@Injectable()
export class RapidApi {
  private baseUrl: string;
  private apiKey: string;
  private headers: Record<string, string>;

  constructor() {
    const env = configuration();
    this.baseUrl = env.rapid.url;
    this.apiKey = env.rapid.apiKey;
    this.headers = {
      'X-RapidAPI-Key': this.apiKey,
      'Content-Type': 'application/json',
    };
  }

  async get(endpoint: string): Promise<any> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'GET',
        headers: this.headers,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new InternalServerErrorException(errorText);
      }

      return await response.json();
    } catch (error) {
      throw error;
    }
  }
}

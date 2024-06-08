import axios from 'axios';
import { Character } from '../types';

const BASE_URL = 'https://rickandmortyapi.com/api';

export const getCharacterById = async (id: number): Promise<Character> => {
  const response = await axios.get<Character>(`${BASE_URL}/character/${id}`);
  return response.data;
};

export const getCharacters = async (
  page?: number,
  filters: Record<string, any> = {}
): Promise<Character[]> => {

  try {
    console.log('getCharacters')
    const response = await axios.get<{ results: Character[] }>(`${BASE_URL}/character`, {
      params: {
        page: page || 1,
        ...filters
      }
    });
    return response.data.results;
  } catch (error) {
    console.log(error);
    return []
  }
 
};

export const getAllCharactersFromAPI = async (): Promise<Character[]> => {
  
  try {
    const characters: any[] = [];
    let url: string | any = `${BASE_URL}/character`;

    while (url) {
      const response = await axios.get<{ results: Character[], info: { next: string | null } }>(url);;
      characters.push(...response.data.results);
      url = response.data.info.next; // URL of next page, if exist
    }

    return characters;
  } catch (error) {
    console.error('Error fetching characters:', error);
    return [];
  }
};
import axios from 'axios';

const BASE_URL = 'https://rickandmortyapi.com/api';

export const getCharacterById = async (id: number) => {
  const response = await axios.get(`${BASE_URL}/character/${id}`);
  return response.data;
};

export const getCharacters = async (page?: number, filters: any = {}) => {
  const response = await axios.get(`${BASE_URL}/character`, {
    params: {
      page: page || 1,
      ...filters
    }
  });
  return response.data.results;
};

export const getAllCharactersFromAPI = async () => {
  
  try {
    const characters: any[] = [];
    let url = `${BASE_URL}/character`;

    while (url) {
      const response = await axios.get(url);
      characters.push(...response.data.results);
      url = response.data.info.next; // URL of next page, if exist
    }

    return characters;
  } catch (error) {
    console.error('Error fetching characters:', error);
    return [];
  }
};
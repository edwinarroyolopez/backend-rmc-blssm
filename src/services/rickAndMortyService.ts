import axios from 'axios';

const BASE_URL = 'https://rickandmortyapi.com/api';

export const getCharacterById = async (id: number) => {
  const response = await axios.get(`${BASE_URL}/character/${id}`);
  return response.data;
};

export const getCharacters = async (page?: number, filters: any = {}) => {
  
  console.log('getCharacters');

  const response = await axios.get(`${BASE_URL}/character`, {
    params: {
      page: page || 1,
      ...filters
    }
  });
  return response.data.results;
};
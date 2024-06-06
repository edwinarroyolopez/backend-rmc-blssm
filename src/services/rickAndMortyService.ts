import axios from 'axios';

const BASE_URL = 'https://rickandmortyapi.com/api';

export const getCharacterById = async (id: number) => {
  const response = await axios.get(`${BASE_URL}/character/${id}`);
  return response.data;
};

export const getCharacters = async (page?: number) => {
  const response = await axios.get(`${BASE_URL}/character`, {
    params: {
      page: page || 1
    }
  });
  return response.data.results;
};

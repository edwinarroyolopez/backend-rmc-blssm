import axios from 'axios';
import { getCharacterById, getCharacters, getAllCharactersFromAPI } from '../services/charactersService';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('characterServices', () => {
  describe('getCharacterById', () => {
    it('should fetch a character by ID', async () => {
      const characterData = { id: 1, name: 'Rick Sanchez' };
      mockedAxios.get.mockResolvedValue({ data: characterData });

      const result = await getCharacterById(1);

      expect(mockedAxios.get).toHaveBeenCalledWith('https://rickandmortyapi.com/api/character/1');
      expect(result).toEqual(characterData);
    });
  });

  describe('getCharacters', () => {
    it('should fetch characters with pagination and filters', async () => {
      const charactersData = [{ id: 1, name: 'Rick Sanchez' }];
      mockedAxios.get.mockResolvedValue({ data: { results: charactersData } });

      const result = await getCharacters(1, { status: 'Alive' });

      expect(mockedAxios.get).toHaveBeenCalledWith('https://rickandmortyapi.com/api/character', {
        params: {
          page: 1,
          status: 'Alive'
        }
      });
      expect(result).toEqual(charactersData);
    });

    it('should return an empty array on error', async () => {
      mockedAxios.get.mockRejectedValue(new Error('Network Error'));

      const result = await getCharacters();

      expect(result).toEqual([]);
    });
  });

  describe('getAllCharactersFromAPI', () => {
    it('should fetch all characters from the API', async () => {
      const charactersData = [{ id: 1, name: 'Rick Sanchez' }];
      mockedAxios.get.mockResolvedValueOnce({ data: { results: charactersData, info: { next: 'next-url' } } });
      mockedAxios.get.mockResolvedValueOnce({ data: { results: charactersData, info: { next: null } } });

      const result = await getAllCharactersFromAPI();

      expect(mockedAxios.get).toHaveBeenCalledWith('https://rickandmortyapi.com/api/character');
      expect(mockedAxios.get).toHaveBeenCalledWith('next-url');
      expect(result).toEqual([...charactersData, ...charactersData]);
    });

  });
});

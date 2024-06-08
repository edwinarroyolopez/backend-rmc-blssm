import { Query } from '../graphql/resolvers/charactersResolver';
import { getCharacterById, getCharacters } from '../services/charactersService';
import Character from '../models/Character';

jest.mock('../services/charactersService');
jest.mock('../models/Character');

describe('Character Resolvers', () => {
  let redisMock: any;

  beforeEach(() => {
    redisMock = {
      get: jest.fn(),
      set: jest.fn()
    };
  });

  describe('character', () => {
    it('should return cached character if available', async () => {
      const mockCharacter = { id: 62, name: 'Canklanker Thom' };
      redisMock.get.mockResolvedValue(JSON.stringify(mockCharacter));

      const result = await Query.character({}, { id: 62 }, { redis: redisMock });

      expect(redisMock.get).toHaveBeenCalledWith('character_62');
      expect(result).toEqual(mockCharacter);
    });

    it('should fetch character from service if not cached', async () => {
      const mockCharacter = { id: 62, name: 'Canklanker Thom' };
      redisMock.get.mockResolvedValue(null);
      (getCharacterById as jest.Mock).mockResolvedValue(mockCharacter);
      Character.upsert = jest.fn().mockResolvedValue([mockCharacter, true]);

      const result = await Query.character({}, { id: 62 }, { redis: redisMock });

      expect(redisMock.get).toHaveBeenCalledWith('character_62');
      expect(getCharacterById).toHaveBeenCalledWith(62);
      expect(redisMock.set).toHaveBeenCalledWith('character_62', JSON.stringify(mockCharacter), 'EX', 3600);
      expect(Character.upsert).toHaveBeenCalledWith(mockCharacter);
      expect(result).toEqual(mockCharacter);
    });
  });

  describe('characters', () => {
    it('should return cached characters if available', async () => {
      const mockCharacters = [{ id: 62, name: 'Canklanker Thom' }];
      redisMock.get.mockResolvedValue(JSON.stringify(mockCharacters));

      const result = await Query.characters({}, { page: 1, status: 'Dead', gender: 'Male', name: 'Thom', origin: 'Unknown' }, { redis: redisMock });

      expect(redisMock.get).toHaveBeenCalledWith(`characters_1_${JSON.stringify({ status: 'Dead', gender: 'Male', name: 'Thom', origin: 'Unknown' })}`);
      expect(result).toEqual(mockCharacters);
    });

    it('should fetch characters from service if not cached', async () => {
      const mockCharacters = [{ id: 62, name: 'Canklanker Thom' }];
      redisMock.get.mockResolvedValue(null);
      (getCharacters as jest.Mock).mockResolvedValue(mockCharacters);
      Character.bulkCreate = jest.fn().mockResolvedValue(mockCharacters);

      const result = await Query.characters({}, { page: 1, status: 'Dead', gender: 'Male', name: 'Thom', origin: 'Unknown' }, { redis: redisMock });

      expect(redisMock.get).toHaveBeenCalledWith(`characters_1_${JSON.stringify({ status: 'Dead', gender: 'Male', name: 'Thom', origin: 'Unknown' })}`);
      expect(getCharacters).toHaveBeenCalledWith(1, { status: 'Dead', gender: 'Male', name: 'Thom', origin: 'Unknown' });
      expect(redisMock.set).toHaveBeenCalledWith(`characters_1_${JSON.stringify({ status: 'Dead', gender: 'Male', name: 'Thom', origin: 'Unknown' })}`, JSON.stringify(mockCharacters), 'EX', 3600);
      expect(Character.bulkCreate).toHaveBeenCalledWith(mockCharacters, { updateOnDuplicate: ['id'] });
      expect(result).toEqual(mockCharacters);
    });
  });
});

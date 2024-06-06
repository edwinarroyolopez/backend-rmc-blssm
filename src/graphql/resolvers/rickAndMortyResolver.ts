import { getCharacterById, getCharacters } from '../../services/rickAndMortyService';
  
  /* @Querys */
  export const Query = {
    character: async (_: any, { id }: { id: number }, { cache }: any) => {
        console.log('-- test --')
        const cacheKey = `character_${id}`;
        if (cache.has(cacheKey)) {
          return cache.get(cacheKey);
        }
        const character = await getCharacterById(id);
        cache.set(cacheKey, character);
        return character;
      },
      characters: async (_: any, { page }: { page?: number }, { cache }: any) => {
        const cacheKey = `characters_${page || 1}`;
        if (cache.has(cacheKey)) {
          return cache.get(cacheKey);
        }
        const characters = await getCharacters(page);
        cache.set(cacheKey, characters);
        return characters;
      }
  };
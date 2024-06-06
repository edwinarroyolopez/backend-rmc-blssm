import { getCharacterById, getCharacters } from '../../services/rickAndMortyService';
  

/**
       * Obtiene un personaje por su ID.
       * @param {any} parent - El objeto padre (no utilizado en este caso)
       * @param {Object} args - Los argumentos de la consulta, en este caso, el ID del personaje.
       * @param {Object} context - El contexto de la aplicación, incluyendo la caché.
       * @returns {Object} - Los datos del personaje.
    */


const character = async (_: any, { id }: { id: number }, { cache }: any) => {
  console.log('-- test --')
        const cacheKey = `character_${id}`;
        if (cache.has(cacheKey)) {
          return cache.get(cacheKey);
        }
        const character = await getCharacterById(id);
        cache.set(cacheKey, character);
        return character;
};


  /* @Querys */
  export const Query = {
      character,
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
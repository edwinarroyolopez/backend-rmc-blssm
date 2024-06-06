import { getCharacterById, getCharacters } from '../../services/rickAndMortyService';

/**
 * @swagger
 * /character/{id}:
 *   get:
 *     summary: Get a character by ID
 *     description: Fetch a single character by their ID from the Rick and Morty API.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the character
 *     responses:
 *       200:
 *         description: A single character
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 name:
 *                   type: string
 *                 status:
 *                   type: string
 *                 species:
 *                   type: string
 *                 type:
 *                   type: string
 *                 gender:
 *                   type: string
 *                 origin:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     url:
 *                       type: string
 *                 location:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     url:
 *                       type: string
 *                 image:
 *                   type: string
 *                 episode:
 *                   type: array
 *                   items:
 *                     type: string
 *                 url:
 *                   type: string
 *                 created:
 *                   type: string
 *       404:
 *         description: Character not found
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

/**
 * @swagger
 * /characters:
 *   get:
 *     summary: Get a list of characters
 *     description: Fetch a paginated list of characters from the Rick and Morty API.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number to fetch
 *     responses:
 *       200:
 *         description: A list of characters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 info:
 *                   type: object
 *                   properties:
 *                     count:
 *                       type: integer
 *                     pages:
 *                       type: integer
 *                     next:
 *                       type: string
 *                     prev:
 *                       type: string
 *                 results:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       name:
 *                         type: string
 *                       status:
 *                         type: string
 *                       species:
 *                         type: string
 *                       type:
 *                         type: string
 *                       gender:
 *                         type: string
 *                       origin:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                           url:
 *                             type: string
 *                       location:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                           url:
 *                             type: string
 *                       image:
 *                         type: string
 *                       episode:
 *                         type: array
 *                         items:
 *                           type: string
 *                       url:
 *                         type: string
 *                       created:
 *                         type: string
 *       404:
 *         description: Page not found
 */
const characters = async (_: any, { page }: { page?: number }, { cache }: any) => {
  const cacheKey = `characters_${page || 1}`;
    if (cache.has(cacheKey)) {
      return cache.get(cacheKey);
    }
    const characters = await getCharacters(page);
    cache.set(cacheKey, characters);
    return characters;
};

export const Query = {
  character,
  characters
};

import { getCharacterById, getCharacters } from '../../services/rickAndMortyService';


/**
 * @swagger
 * openapi: 3.0.0
 * paths:
 *   /graphql:
 *     post:
 *       summary: Ejecutar consultas y mutaciones de GraphQL
 *       requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 query:
 *                   type: string
 *                   example: |
 *                     query {
 *                       character(id: 1) {
 *                         id
 *                         name
 *                         status
 *                         species
 *                         type
 *                         gender
 *                         origin {
 *                           name
 *                           url
 *                         }
 *                         location {
 *                           name
 *                           url
 *                         }
 *                         image
 *                         episode
 *                         url
 *                         created
 *                       }
 *                     }
 *                 variables:
 *                   type: object
 *               required:
 *                 - query
 *       responses:
 *         '200':
 *           description: Respuesta exitosa
 *           content:
 *             application/json:
 *               schema:
 *                 type: object
 *                 properties:
 *                   data:
 *                     type: object
 *                     properties:
 *                       character:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                           name:
 *                             type: string
 *                           status:
 *                             type: string
 *                           species:
 *                             type: string
 *                           type:
 *                             type: string
 *                           gender:
 *                             type: string
 *                           origin:
 *                             type: object
 *                             properties:
 *                               name:
 *                                 type: string
 *                               url:
 *                                 type: string
 *                           location:
 *                             type: object
 *                             properties:
 *                               name:
 *                                 type: string
 *                               url:
 *                                 type: string
 *                           image:
 *                             type: string
 *                           episode:
 *                             type: array
 *                             items:
 *                               type: string
 *                           url:
 *                             type: string
 *                           created:
 *                             type: string
 *         '400':
 *           description: Error de solicitud
 *         '500':
 *           description: Error del servidor
 *         '404':
 *           description: Character not found
 */


/*
  {
    "query": "query {\n  character(id: 1) {\n    id\n    name\n    status\n  }\n}\n",
    "variables": {}
  }

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

import { getCharacterById, getCharacters } from '../../services/rickAndMortyService';
import { timingDecorator } from '../../tools/timingDecorator';

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
const character = timingDecorator(async (_: any, params: { id: number }, { cache }: any) => {
  const { id } = params;
  console.log('-- test --');
  console.log({ params });

  const cacheKey = `character_${id}`;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }
  const character = await getCharacterById(id);
  cache.set(cacheKey, character);
  return character;
}, 'character');

const characters = timingDecorator(async (_: any, { page, status, gender, name, origin }: { page?: number, status?: string, gender?: string, name?: string, origin?: string }, { cache }: any) => {
  const filters = { status, gender, name, origin };
  const cacheKey = `characters_${page || 1}_${JSON.stringify(filters)}`;
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }
  const characters = await getCharacters(page, filters);
  cache.set(cacheKey, characters);
  return characters;
},'characters');

export const Query = {
  character,
  characters
};

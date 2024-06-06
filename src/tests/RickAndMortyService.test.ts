import  {
    getCharacters
}  from '../services/rickAndMortyService';

describe('RickAndMortyService', () => {
  it('should return a list of characters', async () => {
    
    const characters = await getCharacters();
    expect(characters).toBeInstanceOf(Array);
    expect(characters.length).toBeGreaterThan(0);
  });
});

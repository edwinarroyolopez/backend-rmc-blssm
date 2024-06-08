import cron from 'node-cron';
import { getAllCharactersFromAPI } from '../services/charactersService';
import Character from '../models/Character';
import { timingDecorator } from '../tools/timingDecorator';


const  updateCharacters = timingDecorator(async () => {
  try {
    // Get all characters from the API
    const charactersData = await getAllCharactersFromAPI();

    // Iterate over each character and update the database if necessary
    for (const characterData of charactersData) {
      const existingCharacter:any = await Character.findByPk(characterData.id);
      if (existingCharacter) {
        // Compare and update if there are changes
        const hasChanges = Object.keys(characterData).some(
          key => existingCharacter[key] !== characterData[key]
        );
        if (hasChanges) {
          await Character.upsert(characterData);
        }
      }
    }
    console.log('Characters updated successfully');
  } catch (error) {
    console.error('Error updating characters:', error);
  }
}, 'updateCharacters')

// Schedule the task to run every 12 hours
cron.schedule('0 */12 * * *', updateCharacters);
// cron.schedule('*/2 * * * *', updateCharacters); // to test performance every two minutes

console.log('Cron job to update characters scheduled to run every 12 hours');
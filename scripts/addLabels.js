import { readFileSync, writeFileSync } from 'fs';

// Run from project root
const kunnat = JSON.parse(readFileSync('./data/kunnat.json', 'utf8'));
const lastentarha = JSON.parse(readFileSync('./data/lastentarha.json', 'utf8'));

// Extract names from kunnat.json
const kunnatNames = kunnat.map(kunta => kunta.classificationItemNames.find(item => item.lang === 'fi').name);

// Replace the third key that has 'SSS' (meaning 'Koko maa') with name of kunta
lastentarha.data.forEach((entry, index) => {
  if (index === 0) {
    entry.key[2] = 'Koko maa';
  } else {
    entry.key[2] = kunnatNames[index - 1] || entry.key[2];
  }
});


writeFileSync('./data/modified_lastentarha.json', JSON.stringify(lastentarha, null, 2), 'utf8');

console.log('Added kunta names');
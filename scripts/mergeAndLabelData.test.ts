// Import the necessary function and types
import { KindergartenDataRaw, sumOverAges } from './mergeAndLabelData';
import { mockData } from './mockData';

describe('Sum over ages', () => {
  it('should correctly sum values for the municipality KU249 (Keuruu)', () => {
    const result = sumOverAges(mockData as KindergartenDataRaw[]);
    expect(result['KU249'][0]).toBe(194); 
    expect(result['KU249'][1]).toBe(9);
  });

});

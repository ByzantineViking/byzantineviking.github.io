import { readFileSync, writeFileSync } from 'fs';



interface Municipality {
    code: string;
    name: string;
}

type SummedOverAges = Record<string, [number, number]>

export interface KindergartenDataRaw {
    key: (string)[];
    values: [string, string];
}

interface KindergartenDataPoint {
    key: (string)[];
    values: [number, number];
}
interface KindergartenData {
    data: KindergartenDataPoint[]
}

export function myFunction() {
    return "Hello, World!";
}

export function sumOverAges(kindergartens: KindergartenDataRaw[]) {
    const combinedValues: SummedOverAges = {}; 
    kindergartens.forEach((item: KindergartenDataRaw) => {        
        const code = item.key[1]
        if (!combinedValues[code]) {
          combinedValues[code] = [0, 0];
        }
        const current = combinedValues[code];
        combinedValues[code] = [current[0] + parseInt(item.values[0]), current[1] + parseInt(item.values[1])]; // Combine values for modified keys
      });

    return combinedValues;
}


export function addLabels(summedOverAges: SummedOverAges, municipalities) {
    // Transform the grouped data back to the original format
    const result: KindergartenData = {
        data: []
    };

    for (const [code, values] of Object.entries(summedOverAges)) {
        let name = ""
        if (code === "SSS") {
            name = "Koko maa"
        } else {
            name = municipalities.find(m => `KU${m.code}` === code).name // Matching code => municipality name 
        }
        const entry = {
            key: [
                "2022",          // Year
                code,            // Municipality code
                "0-5",    // Ages (0-5) grouped
                name
            ],
            values: values
        };
        result.data.push(entry);
    };
    return result;
}


/**
 * 
 * Adds municipality name to data.
 * Reduces together different aged children for each municipality code.
 */
function processJsonData(kindergartenPath, municipalityPath, outputPath) {
        // Read input files
    const kindergartens = JSON.parse(readFileSync(kindergartenPath, 'utf8'));
    const municipalitiesRaw = JSON.parse(readFileSync(municipalityPath, 'utf8'));
        
        
    const municipalities: Municipality[] = municipalitiesRaw.map(municipality => ({
        "code": municipality.code,
        "name": municipality.classificationItemNames[0].name // Only has one item, finnish lang municipality name
        })
    );

    const summedOverAges = sumOverAges(kindergartens.data);
    const result = addLabels(summedOverAges, municipalities);
    
    // Write the result to output file
    writeFileSync(outputPath, JSON.stringify(result, null, 2), 'utf8');
    console.log(`Processed data has been written to ${outputPath}`);
    }

const kindergartenPath = './data/kindergartens.json';
const municipalityPath = './data/municipalities.json';
const outputPath = './data/processed_output.json';

try {
processJsonData(kindergartenPath, municipalityPath, outputPath);
console.log('Summed together the values for each municipality and added the municipality label');
} catch (error) {
console.error('Error:', error.message);
}

export default sumOverAges;
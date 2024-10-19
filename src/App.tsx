import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import * as d3 from "d3";
import lastentarha from '../data/lastentarha_with_labels.json'
import BarChart, { DataPoint } from './components/StackedBarChart';
import Select from 'react-select'
import {
	CheckIcon,
	ChevronDownIcon,
	ChevronUpIcon,
} from "@radix-ui/react-icons";


function App() {
  const lastentarhaData: DataPoint[] = lastentarha.data
  const [selectedMunicipality, setSelectedMunicipality] = useState<string>("");


  const municipalities = [...new Set(lastentarhaData.map(d => d.key[2]))].sort();
  const selectOptions = municipalities.map(m => ({ value: m, label: m }));
 // Get statistics for selected municipality
 const selectedRaw = lastentarhaData.find(d => d.key[2] === selectedMunicipality);
 const childrenCount = +selectedRaw?.values[1]
 const totalCount = +selectedRaw?.values[0]
 const percentage = childrenCount / totalCount * 100 

 return (
  <>
    <div>
      <img src={viteLogo} className="logo" alt="Vite logo" />
    </div>
    <h1>Tutki vieraskielisten määrää kuntasi päiväkodeissa</h1>

    <div className="flex gap-4 items-center mb-4 p-4 bg-slate-800 rounded-lg">
    <Select
          className="text-black"
          options={selectOptions}
          value={selectOptions.find(opt => opt.value === selectedMunicipality)}
          onChange={(newValue) => setSelectedMunicipality(newValue?.value || "")}
          placeholder="Valitse kunta"
          isClearable
          isSearchable
          styles={{
            control: (baseStyles) => ({
              ...baseStyles,
              borderColor: '#e2e8f0',
              boxShadow: 'none',
              '&:hover': {
                borderColor: '#cbd5e1'
              }
            }),
            menu: (baseStyles) => ({
              ...baseStyles,
              backgroundColor: 'white',
            }),
            option: (baseStyles, { isFocused, isSelected }) => ({
              ...baseStyles,
              backgroundColor: isSelected 
                ? '#e2e8f0' 
                : isFocused 
                  ? '#f1f5f9' 
                  : 'white',
              color: '#1e293b',
              '&:active': {
                backgroundColor: '#e2e8f0'
              }
            })
          }}
        />
        {selectedMunicipality && (
          <div 
            className="grid gap-4 p-4 bg-slate-800 rounded-lg"
            style={{ 
              gridTemplateColumns: 'repeat(3, 1fr)',
              width: '100%'
            }}
          >
            <div className="flex flex-col items-center">
              <span className="text-sm text-slate-400">Vieraskieliset lapset</span>
              <span className="text-xl font-bold">{childrenCount}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-sm text-slate-400">Yhteensä lapsia</span>
              <span className="text-xl font-bold">{totalCount}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-sm text-slate-400">Osuus</span>
              <span className="text-xl font-bold">{percentage.toFixed(2)}%</span>
            </div>
          </div>
        )}
      </div>


    <BarChart data={lastentarhaData} width={600} height={400}/>
  </>
  )
}

export default App

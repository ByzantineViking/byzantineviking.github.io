import { useState } from 'react'
import pacifier from '/pacifier.png'
import './App.css'
import kindergarten from '../data/processed_output.json'
import BarChart, { DataPoint } from './components/StackedBarChart';
import Select from 'react-select'
import Lorem from './components/lorem';


function App() {
  const kindergartenData: DataPoint[] = kindergarten.data
  const [selectedMunicipality, setSelectedMunicipality] = useState<string>("");


  const municipalities = [...new Set(kindergartenData.map(d => d.key[3]))].sort();
  const selectOptions = municipalities.map(m => ({ value: m, label: m }));
 // Get statistics for selected municipality
 const selectedRaw = kindergartenData.find(d => d.key[3] === selectedMunicipality);
 const childrenCount = selectedRaw?.values[1] || 0
 const totalCount = selectedRaw?.values[0] || 0
 const percentage = childrenCount / totalCount * 100  || 0

 const iconSize = 100; // Assuming the icon is 100px tall
  const paddingTop = iconSize / 2 + 10;


  // Changing padding for breakpoints sm 640px, md 768px, lg	1024px
 return (
  <div>
  <Lorem />
    <div className="relative bg-[#120e3e] px-4 lg:px-8 pt-16 mt-16 pb-4">
      {/* Icon container */}
      <div 
          className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          style={{ 
            top: 0
          }}
        >
          <img 
            src={pacifier} 
            className="maracas" 
            alt="Maracas" 
            width={iconSize} 
            height={iconSize}
          />
        </div>
  {/* Main content container */}
    <div className="flex flex-col gap-6">
      <h1 className="text-white text-2xl font-bold">
            Tutki vieraskielisten määrää kuntasi päiväkodeissa
      </h1>

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
          
            <div 
              className="grid gap-2 p-2 bg-[#422c8f] rounded-lg"
              style={{ 
                gridTemplateColumns: 'repeat(4, 1fr)',
                width: '100%'
              }}
            >
                <h3>Koko maa</h3>
                <div className="flex flex-col items-center">
                  <span className="text-xs text-slate-400">Vieraskieliset lapset</span>
                  <span className="text-lg font-bold text-white">{kindergartenData[0].values[1]}</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xs text-slate-400">Lapsia yhteensä</span>
                  <span className="text-lg font-bold text-white">{kindergartenData[0].values[0]}</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-xs text-slate-400">Osuus</span>
                  {/* Round to 1 decimal */}
                  <span className="text-lg font-bold text-white">{(+kindergartenData[0].values[1]/+kindergartenData[0].values[0]*100).toFixed(1)}%</span>
                </div>
                
              
                {selectedMunicipality && (
                  <>
                  <h3>{selectedMunicipality}</h3>
              <div className="flex flex-col items-center">
                <span className="text-xs text-slate-400">Vieraskieliset lapset</span>
                <span className="text-lg font-bold text-white">{childrenCount}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xs text-slate-400">Lapsia yhteensä</span>
                <span className="text-lg font-bold text-white">{totalCount}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xs text-slate-400">Osuus</span>
                <span className="text-lg font-bold text-white">{percentage.toFixed(1)}%</span>
              </div>
              </>
              )}
            </div>
            



      <BarChart data={kindergartenData} height={400}/>
      </div>
      </div>
  <Lorem />
  <a href="https://www.flaticon.com/free-icons/pacifier" title="pacifier icons">Pacifier icons created by Luvdat - Flaticon</a>
  </div>
 )
}

export default App

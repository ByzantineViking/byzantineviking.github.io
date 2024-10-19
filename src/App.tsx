import { useState } from 'react'
import viteLogo from '/vite.svg'
import './App.css'
import * as d3 from "d3";
import lastentarha from '../data/lastentarha_with_labels.json'
import BarChart, { DataPoint } from './components/StackedBarChart';




function App() {
  const [count, setCount] = useState(0)
  const lastentarhaData: DataPoint[] = lastentarha.data

  console.log(lastentarha)

  const data = [
    { children: 20, total: 100 },
    { children: 50, total: 80 },
    { children: 30, total: 60 },
    { children: 70, total: 100 },
  ];
  
  return (
    <>
      <div>
        <img src={viteLogo} className="logo" alt="Vite logo" />
      </div>
      <h1>Tutki vieraskielisten määrää kuntasi päiväkodeissa</h1>
      <BarChart data={lastentarhaData} width={600} height={400}/>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App

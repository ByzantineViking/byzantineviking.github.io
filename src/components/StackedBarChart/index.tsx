import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { FixedSizeList as List } from "react-window";

export interface DataPoint {
  key: string[]; // [year, code, municipality_name]
  values: string[]; // [foreign_lang, total]
}

interface BarChartProps {
  data: DataPoint[];
  width?: number; // Optional width for responsiveness
  height?: number; // Optional height for responsiveness
}

const BarChart: React.FC<BarChartProps> = ({ data, width, height }) => {

    if (!data.length) return;

    const containerWidth = window.innerWidth < 600 ? window.innerWidth * 0.9 : width || 600;
    const visibleBarsCount = 7;
    const itemHeight = 40; // Height of each bar including padding

    const filteredData = data.filter(d => {
      const totalValue = +d.values[0];
      const childrenValue = +d.values[1];
      return !(totalValue === 0 && childrenValue === 0);
    });

    const colors = d3.scaleOrdinal<string>()
        .domain(["children", "total"])
        .range(["#1f77b4", "#ff7f0e"]);  

    const renderRow = ({ index, style }: { index: number; style: React.CSSProperties }) => {
      const d = filteredData
      [index];
  
      if (!d) return null;
  
      console.log('------')
      console.log(d.values)
      const totalValue = +d.values[0];
      const childrenValue = +d.values[1];
      console.log(childrenValue, totalValue)
      const percentage = (childrenValue / totalValue) * 100;
      console.log(percentage)
      
      if (totalValue === 0 && childrenValue === 0) {
        return null;
      }
      return (
        <div key={index} className="bar-row" style={{...style,  display: 'flex', alignItems: 'center', height: itemHeight }}>
          <svg width={containerWidth} height={itemHeight}>
            {/* Children Bar */}
            <rect
              x={0}
              y={5}
              width={(percentage / 100) * containerWidth}
              height={30}
              fill={colors("children")}
            />
            {/* Remaining Bar */}
            <rect
              x={(percentage / 100) * containerWidth}
              y={5}
              width={((totalValue - childrenValue) / totalValue) * containerWidth}
              height={30}
              fill={colors("total")}
            />
            {/* Label */}
            <text
              x={containerWidth / 2}
              y={itemHeight / 2 + 4}
              fill="white"
              textAnchor="middle"
            >
              {`${percentage.toFixed(2)}% (${d.key[2]})`}
            </text>
          </svg>
        </div>
      );
    };

    

  return (
    <div style={{ width: containerWidth, height: height }}>
      <List
        height={visibleBarsCount * itemHeight} // Height is the number of visible bars * itemHeight
        itemCount={filteredData.length}
        itemSize={itemHeight}
        width={containerWidth}
      >
        {renderRow}
      </List>
    </div>
  );
};

export default BarChart;

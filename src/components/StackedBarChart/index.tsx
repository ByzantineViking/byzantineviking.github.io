import React from "react";
import * as d3 from "d3";
import { FixedSizeList as List } from "react-window";

export interface DataPoint {
  key: string[]; // [year, code, municipality_name]
  values: number[]; // [foreign_lang, total]
}

interface BarChartProps {
  data: DataPoint[];
  width?: number; // Optional width for responsiveness
  height?: number; // Optional height for responsiveness
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {

    if (!data.length) return;

    const containerWidth = window.innerWidth < 600 ? window.innerWidth : 600;
    const labelWidth = containerWidth * 0.35; // 40% of the container width
    const visibleBarsCount = 7;
    const itemHeight = 29; // Updated to 29px as requested
    const barHeight = 17; // Height of each bar including padding

    const filteredData = data.filter(d => {
      const totalValue = d.values[0];
      const childrenValue = d.values[1];
      return !(totalValue === 0 && childrenValue === 0);
    });

    const colors = d3.scaleOrdinal<string>()
        .domain(["children", "total"])
        .range(["#7c59fa","#422c8f"]);  

    const renderRow = ({ index, style }: { index: number; style: React.CSSProperties }) => {
      const d = filteredData[index];
  
      if (!d) return null;
  

      // Convert to numbers
      const totalValue = d.values[0];
      const childrenValue = d.values[1];
      const percentage = (childrenValue / totalValue) * 100;

      const barWidth = containerWidth - labelWidth;
      const childrenBarWidth = (percentage / 100) * barWidth;
      const remainingBarWidth = barWidth - childrenBarWidth;
      
      if (totalValue === 0 && childrenValue === 0) {
        return null;
      }
      return (
        <div key={index} className="bar-row" style={{...style,  display: 'flex', alignItems: 'center', height: itemHeight }}>
          <svg width={containerWidth} height={itemHeight}>
            {/* Label for municipality name */}
            <text
              x={5}
              y={itemHeight / 2}
              fill="white"
              dominantBaseline="middle"
              textAnchor="start"
            >
              {d.key[3]}
            </text>
            {/* Children Bar */}
            <rect
              x={labelWidth}
              y={5}
              width={childrenBarWidth}
              height={barHeight}
              fill={colors("children")}
  
            />
            {/* Remaining Bar */}
            <rect
              x={labelWidth + childrenBarWidth}
              y={5}
              width={remainingBarWidth}
              height={barHeight}
              fill={colors("total")}
            />
  
            {/* Percentage label */}
            <text
              x={labelWidth + childrenBarWidth + 5}
              y={itemHeight / 2 + 4}
              fill="white"
              textAnchor="start"
            >
            {`${percentage.toFixed(2)}%`}
          </text>
          </svg>
        </div>
      );
    };


  return (
    <div style={{ width: containerWidth , backgroundColor: "#120e3e" }}>
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

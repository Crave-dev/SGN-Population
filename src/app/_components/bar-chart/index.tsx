'use client'

import * as d3 from "d3";
import { Population, colorByCountry } from "../information";
import YAxis from "./y-axis";
import XAxis from "./x-axist";
import { CSSProperties } from "react";

interface Props {
    data: Population[]

    width: number
    height: number

    year: string

    style?: CSSProperties
}

function Barchart(props: Props) {
    const data = props?.data.slice(1)
    const margin = { left: 150, top: 50, right: 50, bottom: 50 }
    const innerHeight = props?.height - (margin.top + margin.bottom)
    const innerWidth = props?.width - (margin.left + margin.right)

    const xScale = d3.scaleLinear()
                        .domain([0, d3.max(data, x => Number(x.population)) || 0])
                        .range([0, innerWidth])
                    
    const yScale = d3.scaleBand()
                        .domain(data.map((y) => y.country_name))
                        .range([0, innerHeight])
                        .paddingInner(0.15)

    const numberCompact = new Intl.NumberFormat('en-US', {
        style: 'decimal',
        notation: 'compact'
    });
    
    const numberCommas = new Intl.NumberFormat('en-US')

    return (
        <div style={props?.style}>
            <svg width={props?.width} height={props?.height}>
                <g transform={`translate(${margin.left}, ${margin.top})`}>
                    <XAxis 
                        ticks={xScale.ticks()} 
                        translateX={(tickValue) => xScale(tickValue)} 
                        render={(tickValue) => numberCompact.format(tickValue)} 
                        height={innerHeight}                    
                    />
                    <YAxis 
                        domain={yScale.domain()} 
                        translateY={(tickValue) => (yScale(tickValue)! + yScale.bandwidth() / 2)} 
                        render={(tickValue) => tickValue} 
                    />
                    <text fill="#6a6464" style={{ textAnchor: 'end', fontSize: '5rem', fontWeight: 'bold' }} x={innerWidth} y={innerHeight * 0.9}>{props?.year}</text>
                    <text fill="#6a6464" style={{ textAnchor: 'end', fontSize: '3rem', fontWeight: 600 }} x={innerWidth} y={innerHeight}>{`Total: ${numberCommas.format(Number(props?.data[0]?.population) || 0)}`}</text>
                    {data.map((d) => (
                        <rect 
                            key={d.id} 
                            x={0} 
                            y={yScale(d.country_name)} 
                            width={xScale(Number(d.population))} 
                            height={yScale.bandwidth()}
                            fill={colorByCountry(d.country_name)}
                        />
                    ))}
                </g>
            </svg>
        </div>
    )
}

export default Barchart
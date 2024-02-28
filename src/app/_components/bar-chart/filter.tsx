'use client'

import { type CSSProperties } from "react"
import * as d3 from "d3";

interface Props {
    min: number
    max: number
    onChange: React.ChangeEventHandler<HTMLInputElement>
    value: number

    style?: CSSProperties

    width: number
    height: number
}

function FilterChart(props: Props) {
    const margin = { left: 20, top: 20, right: 20, bottom: 20 }
    const innerWidth = props?.width - (margin.left + margin.right)
    const xScale = d3.scaleLinear()
                        .range([5, innerWidth - 5])
                        .domain([props?.min, props?.max])
                        
                        
    return <>
        <input type='range' min={props?.min || 1950} max={props?.max || 2021} onChange={props?.onChange} value={props?.value || 1950} style={{ width: innerWidth, transform: `translateX(${margin.left}px)` }}  />
        <svg width={props.width} height={props.height} transform={`translate(${0}, -6)`}>
            <g transform={`translate(${margin.left}, 0)`}>
                <line x1={5} x2={innerWidth - 5} strokeWidth={2} stroke="#ccc" />
            </g>
            <g transform={`translate(${margin.left}, 0)`}>
                {xScale?.ticks().map((tickValue, i) => (
                    <g transform={`translate(${Math.ceil(xScale(tickValue))}, 0)`} key={tickValue}>
                        <text fill="#6a6464" y={15} dy='.71em' style={{ textAnchor: 'middle',fontSize: '0.75rem' }}>{tickValue}</text>
                        <line y2={10} stroke="#ccc" />
                    </g>
                ))}
            </g>
            
        </svg>
    </>
}

export default FilterChart
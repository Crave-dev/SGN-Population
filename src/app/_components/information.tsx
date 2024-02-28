'use client'

import { useQuery } from "@tanstack/react-query"
import { ReadonlyURLSearchParams, useRouter, useSearchParams } from "next/navigation"
import { type CSSProperties, useEffect, ChangeEventHandler, useCallback, useState, useRef } from "react"
import Barchart from "./bar-chart"
import throttle from 'lodash/throttle'
import FilterChart from "./bar-chart/filter"
import { minMax } from "../page"

interface Props {
    style?: CSSProperties
}

export interface Population { 
    id: number
    year: number
    population: string 
    country_name: string 
}

export const regionals = ['Asia', 'Europe', 'Africa', 'Oceania', 'Americas'] as const
export const countryGroup = new Map<string, typeof regionals[number]>([
    ['China', 'Asia'],
    ['India', 'Asia'],
    ['Japan', 'Asia'],
    ['Indonesia', 'Asia'],
    ['Bangladesh', 'Asia'],
    ['Russia', 'Europe'],
    ['Germany', 'Europe'],
    ['United Kingdom', 'Europe'],
    ['Italy', 'Europe'],
    ['France', 'Europe'],
    ['United States', 'Americas'],
    ['Brazil', 'Americas'],
])

export function colorByRegion(region: typeof regionals[number]) {
    if (region === 'Asia') return '#4235e5'
    if (region === 'Americas') return '#cd9e14'
    if (region === 'Europe') return '#7e59dc'
    if (region === 'Africa') return '#d55353'
    if (region === 'Oceania') return '#7d500a'

    return 'black'
}

export function colorByCountry(country: string) {
    if (!countryGroup.has(country)) return 'black'
    const target = countryGroup.get(country)
    if (!target) return 'black'
    return colorByRegion(target)
}

async function getData(year: string) {
    const params = new URLSearchParams([
        ['year', year],
        ['type', 'represent'],
    ])
    const res = await fetch(`/api/populate?${params.toString()}`)
    return await res.json() as unknown as Population[]
}

function Information(props: Props) {
    const searchParams = useSearchParams()
    const router = useRouter()
    const [targetYear, setTargetYear] = useState(() => searchParams.get('year') || minMax[0].toString())
    const targetYearRef = useRef(searchParams.get('year') || minMax[0].toString())

    const { data, isError, refetch, isPending } = useQuery({
        queryFn: () => getData(targetYearRef.current),
        queryKey: [targetYearRef.current],
        placeholderData: (placeholderData) => placeholderData,
        staleTime: Infinity,
    })

    const refetchThrottle = throttle(refetch, 500)

    const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        const params = new URLSearchParams(searchParams)
        params.set('year', e.target.value)
        setTargetYear(e.target.value)
        targetYearRef.current = e.target.value
        refetchThrottle()
        window.history.replaceState(null, '',`?${params.toString()}`)
    }

    const dimension = { width: 800, height: 500 }

    return <div style={props?.style}>
        <span style={{ display: 'flex', gap: '1rem' }}>
            <span style={{ fontWeight: 600 }}>Region</span>
            {regionals.map((region) => {
                return <span key={region} style={{ display: 'flex', gap: '1ch', alignItems: 'center' }}>
                    <span style={{ display: 'inline-block', width: 16, height: 16, backgroundColor: colorByRegion(region) }} />
                    <span>{region}</span>
                </span>
            })}
        </span>
        {(isPending) && <div style={{ width: dimension.width, height: dimension.height, display: 'grid', placeContent: 'center' }}><h3>loading...</h3></div>}
        {(isError) && <div style={{ width: dimension.width, height: dimension.height, display: 'grid', placeContent: 'center' }}><h3>error!</h3></div>}
        {(data && !isError) && <Barchart data={data} width={dimension.width} height={dimension.height} year={searchParams.get('year') || minMax[0].toString()} />}
        <FilterChart min={minMax[0]} max={minMax[1]} onChange={onChange} value={Number(searchParams.get('year') || minMax[0]) } style={{ width: dimension.width }} width={dimension.width} height={50} />
    </div>
}

export default Information
interface Props<T extends (string | number)> {
    domain: T[]

    translateY: (tickValue: T) => number
    render(value: T): string
}

function YAxis<T extends (string | number), >(props: Props<T>) {
    return (
        <>
            {props?.domain.map((tickValue) => (
                <g transform={`translate(0, ${props?.translateY(tickValue)})`} key={tickValue}>
                    <text fill="#6a6464" dy='.32em' x={-3} style={{ textAnchor: 'end', color: 'black'}}>{props?.render(tickValue)}</text>
                </g>
            ))}
        </>
    )
}

export default YAxis
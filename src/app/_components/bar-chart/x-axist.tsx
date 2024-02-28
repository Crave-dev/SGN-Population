interface Props<T extends (string | number)> {
    ticks: T[]

    translateX: (tickValue: T) => number
    render(value: T): string
    height: number
}

function XAxis<T extends (string | number), >(props: Props<T>) {
    return (
        <>
            {props?.ticks.map((tickValue) => (
                <g transform={`translate(${props.translateX(tickValue)}, 0)`} key={tickValue}>
                    <text fill="#6a6464" y={-25} dy='.71em' style={{ textAnchor: 'middle', color: 'black'}}>{props.render(tickValue)}</text>
                    <line y2={props?.height + 3} stroke="#ccc" />
                </g>
            ))}
        </>
    )
}

export default XAxis
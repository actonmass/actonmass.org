import React, { useLayoutEffect, useState, useEffect, useRef } from 'react';
import {render} from 'react-dom';
import moment from 'moment'; 


function useTargetWidth() {
    const targetRef = useRef();
    const [dimensions, setDimensions] = useState({ width:0, height: 0 });
    const handleResize = () => {
        if (targetRef.current) {
            setDimensions({
              width: targetRef.current.offsetWidth,
              height: targetRef.current.offsetHeight
            });
          }
    };
    useLayoutEffect(() => {handleResize();}, []);

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    });
    return {targetRef, dimensions};
};

const Symbol = ({symbol, x, lineLevel}) => {
    if (symbol === "small") {
        return <circle cx={x} cy={lineLevel} r={6} style={{fill: "#e59626"}} />;
    } else if (symbol === "target") {
        return (
            <g>
                <circle cx={x} cy={lineLevel} r={9} style={{fill: "#e59626"}} />;
                <circle cx={x} cy={lineLevel} r={6} style={{fill: "#a1beff"}} />;
                <circle cx={x} cy={lineLevel} r={3} style={{fill: "#e59626"}} />;
            </g>
        );
    } else if (symbol === "big") {
        return <circle cx={x} cy={lineLevel} r={9} style={{fill: "#123e83"}} />;
    }
};

const Label = ({text, date, x, boundary, lineLevel}) => {
    const textHeight = 12;
    const dateTextHeight = 8;
    return (
        <div style={{position:"absolute", left:0, top:0, width:boundary}}>
            <div style={{position:"absolute", left:x, top:0}}>
                <div style={{fontSize: textHeight, fontWeight: 900}}>{text}</div>
                <div style={{fontSize: dateTextHeight, fontWeight: 300}}>{date}</div>
            </div>
        </div>
    );
};

const TimeSpan = ({x1, x2, lineLevel, text}) => {
    const height = 30;
    const textHeight = 12;
    const margin = 4;
    const strokeWidth = 1;
    return (
        <g>
            <line x1={x1} x2={x1} y1={lineLevel} y2={lineLevel-height} style={{stroke:"#123e83", strokeWidth:strokeWidth}}/>
            <line x1={x2} x2={x2} y1={lineLevel} y2={lineLevel-height} style={{stroke:"#123e83", strokeWidth:strokeWidth}}/>
            <line x1={x1} x2={x2} y1={lineLevel-height} y2={lineLevel-height} style={{stroke:"#123e83", strokeWidth:strokeWidth}}/>
            <text x={(x2 + x1)/2} y={lineLevel - height - margin} style={{font: `bold ${textHeight}px sans-serif`}} textAnchor={"middle"}>{text}</text>
        </g>
    );
};


const Timeline = ({width, margin, events}) => {
    const sortedEvents = [...events].sort((a, b)=>{
        moment(a.date) - moment(b.date);
    });

    const firstEvent = sortedEvents[0];
    const lastEvent = sortedEvents[sortedEvents.length-1];
    const today = moment();

    const dateToPixel = (date) => {
        const pixel = margin + width * (date - moment(firstEvent.date)) / (moment(lastEvent.date) - moment(firstEvent.date));
        return pixel;
    };

    let symbols = [];
    let spans = [];
    let labels = [];

    const lineLevel = 50;


    sortedEvents.forEach((event, i) => {
        const dateMoment = moment(event.date);
        symbols.push(<Symbol key={i} x={dateToPixel(dateMoment)} lineLevel={lineLevel} {...event} />);

        if (event.showDurationFromToday) {
            spans.push(<TimeSpan key={i} x1={dateToPixel(dateMoment)} x2={dateToPixel(today)} lineLevel={lineLevel} text={`${today.diff(dateMoment, "days")} days...`} />);
        }
    });
    symbols.push(<Symbol key={"today"} x={dateToPixel(today)} lineLevel={lineLevel} symbol="small" />);

    let labelDetails = sortedEvents.map((event) => ({
        date: event.date,
        x: dateToPixel(moment(event.date)) - 10,
        text: event.text
    }));
    labelDetails.push({date: today.format("YYYY-MM-DD"), x: dateToPixel(today) -10, text: "Today"});
    labelDetails.sort((a, b) => {return moment(a.date) - moment(b.date);}).reverse();

    let labelWidth = width + margin*2;
    labelDetails.forEach((labelDetails, i) => {
        const dateMoment = moment(labelDetails.date);
        labels.push(<Label key={i} x={labelDetails.x} boundary={labelWidth} lineLevel={lineLevel} {...labelDetails} />);
        labelWidth = labelDetails.x
    });

    return (
        <div>
            <svg height={65} width={width + margin*2}>
                <line x1={margin} y1={lineLevel} x2={width+margin} y2={lineLevel} style={{stroke:"#123e83", strokeWidth:4}} />
                {spans}
                {symbols}
            </svg> 
            <div style={{width: width + margin*2, position:"relative", height: 80}}>
                {labels}
            </div>
        </div>
    );
};


const BillTimeline = ({filingDate, sessionEndDate, filingTitle, events}) => {
    const {targetRef, dimensions} = useTargetWidth();

    let allEvents = events.map((event) => {
        return {date: event.date, showDurationFromToday: false, text: event.text, symbol: "target"};
    });
    allEvents.unshift({date: filingDate, showDurationFromToday: true, text: `Filed as ${filingTitle}`, symbol: "small"});
    allEvents.push({date: sessionEndDate, showDurationFromToday: false, text: "Session Over", symbol: "big"});



    return (
        <div ref={targetRef} style={{background: "#a1beff", display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column"}}>
            <div>
                <div style={{textTransform: "uppercase", fontWeight:600, marginTop:50}}>Timeline of Bill during this session:</div> 
                <Timeline events={allEvents} width={dimensions.width * 0.7} margin={50}/>
            </div>
        </div>
    );
};


const renderBillTimeline = (targetID, data) => {
    const targetEl = document.getElementById(targetID);
    render(<BillTimeline {...data} />, targetEl);
}

export default { renderBillTimeline };



import React, { useState } from 'react';
import {render} from 'react-dom';
import moment from 'moment'; 


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
        return <circle cx={x} cy={lineLevel} r={9} style={{fill: "#e59626"}} />;
    }
};

const Label = ({text, date, x, lineLevel, center}) => {
    const textHeight = 12;
    const margin = 16;
    const dateTextHeight = 8;
    const dateMargin = 8;
    return (
        <g>
            <text x={x} y={lineLevel + textHeight + margin} style={{font: `bold ${textHeight}px sans-serif`}} textAnchor={center ? "middle" : "start"}>{text}</text>
            <text x={x} y={lineLevel + textHeight + dateTextHeight + margin + dateMargin} style={{font: `${dateTextHeight}px sans-serif`}} textAnchor={center ? "middle" : "start"}>{date}</text>
        </g>
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


const Timeline = ({width, height, margin, events}) => {
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

    const lineLevel = height * 0.4;

    events.forEach((event, i) => {
        const dateMoment = moment(event.date);
        symbols.push(<Symbol key={i} x={dateToPixel(dateMoment)} lineLevel={lineLevel} {...event} />);
        labels.push(<Label key={i} x={dateToPixel(dateMoment)} lineLevel={lineLevel} {...event} />);
        if (event.showDurationFromToday) {
            spans.push(<TimeSpan key={i} x1={dateToPixel(dateMoment)} x2={dateToPixel(today)} lineLevel={lineLevel} text={`${today.diff(dateMoment, "days")} days...`} />);
        }
    });
    symbols.push(<Symbol key={"today"} x={dateToPixel(today)} lineLevel={lineLevel} symbol="small" />);
    labels.push(<Label key={"today"} text="Today" date={today.format("YYYY-MM-DD")} x={dateToPixel(today)} lineLevel={lineLevel} center={true} />);

    return (
        <svg height={height} width={width + margin*2}>
            <line x1={margin} y1={lineLevel} x2={width+margin} y2={lineLevel} style={{stroke:"#123e83", strokeWidth:4}} />
            {labels}
            {spans}
            {symbols}
        </svg> 
    );
};


const BillTimeline = ({}) => {
    const events = [
        {date: "2019-08", showDurationFromToday: true, text: "Bill Filed", symbol: "small", center: true},
        {date: "2020-03-02", showDurationFromToday: false, text: "Hearing Scheduled", symbol: "target", center: false},
        {date: "2020-07", showDurationFromToday: false, text: "Session Over", symbol: "big", center: true},
    ];

    return (
        <div style={{background: "#a1beff", display:"flex", justifyContent:"center", alignItems:"center", flexDirection:"column"}}>
            <div>
                <div style={{textTransform: "uppercase", fontWeight:600, marginTop:50}}>Timeline of Bill during this session:</div> 
                <Timeline events={events} height={200} width={500} margin={50}/>
            </div>
        </div>
    );
};


const renderBillTimeline = (targetID, data) => {
    const targetEl = document.getElementById(targetID);
    render(<BillTimeline {...data} />, targetEl);
}

export default { renderBillTimeline };



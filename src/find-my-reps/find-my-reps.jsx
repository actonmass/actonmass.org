import React, { useState } from 'react';
import {render} from 'react-dom';
import findReps from './findReps';


const GetPartyName = (shortName) => {
    return {
        D: "Democrat",
        R: "Republican"
    }[shortName]
};

const Rep = ({type, info, allLegislatorData}) => {
    const localInfo = allLegislatorData[info.short_id];
    return (
        <div >
            <div style={{textTransform: "uppercase", marginBottom: 10}}>Your {type}:</div>
            <div style={{display:"flex"}}>
                <img src={localInfo.img} width={100} height={100}/>
                <div style={{marginLeft: 10}}>
                    <div>{info.name}</div>
                    <br/>
                    <div>{GetPartyName(localInfo.party)}</div>
                </div>
            </div>
        </div>
    );
};

const Reps = ({repInfo, onClearQuery, allLegislatorData}) => {
    if (repInfo === null){
        return (
            <div style={{position:"absolute", top:0, bottom:0, left: 0, right: 0, display:"flex", justifyContent:"space-around", alignItems:"center"}}>
                <div className="lds-dual-ring"/> 
            </div>
        );
    }

    return (
        <div>
            <div style={{position:"absolute", top:0, bottom:0, left: 0, right: 0, display:"flex", justifyContent:"space-around", alignItems:"center"}}>
                <Rep type="Senator" info={repInfo.senator} allLegislatorData={allLegislatorData} />
                <Rep type="Rep" info={repInfo.representative} allLegislatorData={allLegislatorData} />
            </div>
            <button style={{position:"absolute", bottom:0, right:0 }} onClick={onClearQuery}>x</button>
        </div>
    );
}

const Form = ({onSubmitQuery, error}) => {
    const [streetAddress, setStreetAddress] = useState("");
    const [city, setCity] = useState("");
    const errorText = error ? "We couldn't locate that address" : "";
    return (
        <div style={{position:"absolute", top:0, bottom:0, left: 0, right: 0, display:"flex", textTransform:"uppercase", justifyContent:"center", alignItems: "center"}}>
            <div style={{width: 200, paddingRight:50}}>Please enter your address so we can help you contact your rep.</div>
            <div style={{display:"flex", flexDirection:"column"}}>
                <input value={streetAddress} type="text" onChange={(e)=>{setStreetAddress(e.target.value)}} placeholder="Street Address"/>
                <input value={city} type="text" onChange={(e)=>{setCity(e.target.value)}} placeholder="City"/>
                <button onClick={()=>{
                    onSubmitQuery({
                        streetAddress: streetAddress,
                        city: city
                    });
                }} disabled={!streetAddress || !city}>Submit</button>
                <span style={{color:"red"}}>{errorText}</span>
            </div>
        </div>
    );
};


const FindMyReps = ({onQueryReps, legislatorInfo}) => {
    const sessionQuery = JSON.parse(window.sessionStorage.getItem("repQuery"));
    const [query, setQuery] = useState(sessionQuery !== null ? sessionQuery.query : null);
    const [repInfo, setRepInfo] = useState(sessionQuery !== null ? sessionQuery.repInfo : null);
    const [error, setError] = useState(false);

    const clearQuery = () => {
        window.sessionStorage.removeItem("repQuery");
        setQuery(null);
        setRepInfo(null);
    };

    function handleQueryReps(newQuery) {
        setQuery(newQuery);
        setError(false);
        onQueryReps(newQuery).then((repInfo)=> {
            setRepInfo(repInfo);
            window.sessionStorage.setItem("repQuery", JSON.stringify({
                query: newQuery,
                repInfo: repInfo
            }));
            setError(false);
        }).catch((err)=>{
            console.error("Query failed:", newQuery);
            clearQuery();
            setError(true);
        });
    }

    if (query === null) {
        return <Form onSubmitQuery={handleQueryReps} error={error} />;
    }
    return <Reps repInfo={repInfo} onClearQuery={clearQuery} allLegislatorData={legislatorInfo}/>;
};


const renderFindMyReps = (targetID, data) => {
    const targetEl = document.getElementById(targetID);
    render(<FindMyReps onQueryReps={findReps} {...data} />, targetEl);
}

export default { renderFindMyReps };



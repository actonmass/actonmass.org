import React, { useState, useEffect } from 'react';
import {render} from 'react-dom';


const Rep = ({name}) => {
    return <div>{name}</div>;
};

const Reps = ({repInfo, onClearQuery}) => {
    if (repInfo === null){
        return <div>loading</div>;
    }

    return (
        <div>
            <Rep name={repInfo.senator.name} />
            <Rep name={repInfo.representative.name} />
            <button onClick={onClearQuery}>Clear my reps</button>
        </div>
    );
}

const Form = ({onSubmitQuery}) => {
    const [streetAddress, setStreetAddress] = useState("");
    const [city, setCity] = useState("");
    return (
        <div>
            <input value={streetAddress} type="text" onChange={(e)=>{setStreetAddress(e.target.value)}} placeholder="Street Address"/>
            <input value={city} type="text" onChange={(e)=>{setCity(e.target.value)}} placeholder="City"/>
            <button onClick={()=>{
                onSubmitQuery({
                    streetAddress: streetAddress,
                    citry: city
                });
            }}>Submit</button>
        </div>
    );
};


const FindMyReps = ({onQueryReps}) => {
    const [query, setQuery] = useState(null);
    const [repInfo, setRepInfo] = useState(null);

    function handleQueryReps(newQuery) {
        setQuery(newQuery);
        onQueryReps(newQuery).then((repInfo)=> {
            setRepInfo(repInfo);
            window.sessionStorage.setItem("repQuery", newQuery);
        }).catch((err)=>{
            console.log("Failed to query rep:", newQuery);
        });
    }

    const clearQuery = () => {
        window.sessionStorage.setItem("repQuery", null);
        const sessionQuery = window.sessionStorage.getItem("repQuery", null);
        setQuery(null);
        setRepInfo(null);
    };


    // Effect for injecting sessionQuery if we have one
    useEffect(() => {
        const sessionQuery = window.sessionStorage.getItem("repQuery", null);
        // If we have a sessionQuery but no new query, use it
        if (query === null && sessionQuery !== "null") {
            handleQueryReps(sessionQuery);
        }
    });

    if (query === null) {
        return <Form onSubmitQuery={handleQueryReps} />;
    }
    return <Reps repInfo={repInfo} onClearQuery={clearQuery}/>;
};


const renderFindMyReps = (targetID, data) => {
    const targetEl = document.getElementById(targetID);

    function handleQueryReps(query) {
        return new Promise((resolve, reject) =>{
            setTimeout(()=>{
            resolve({
                senator: {
                    name: "Test Senator"
                },
                representative: {
                    name: "Test Representative"
                }
            });}, 2000);
        });
    }
    render(<FindMyReps onQueryReps={handleQueryReps} {...data} />, targetEl);
}

export default { renderFindMyReps };



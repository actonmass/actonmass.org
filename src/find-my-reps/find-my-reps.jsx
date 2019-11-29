import React, { useState } from 'react';
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
    const sessionQuery = JSON.parse(window.sessionStorage.getItem("repQuery"));
    const [query, setQuery] = useState(sessionQuery !== null ? sessionQuery.query : null);
    const [repInfo, setRepInfo] = useState(sessionQuery !== null ? sessionQuery.repInfo : null);

    function handleQueryReps(newQuery) {
        setQuery(newQuery);
        onQueryReps(newQuery).then((repInfo)=> {
            setRepInfo(repInfo);
            window.sessionStorage.setItem("repQuery", JSON.stringify({
                query: newQuery,
                repInfo: repInfo
            }));
        }).catch((err)=>{
            console.log("Failed to query rep:", newQuery);
        });
    }

    const clearQuery = () => {
        window.sessionStorage.removeItem("repQuery");
        setQuery(null);
        setRepInfo(null);
    };

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



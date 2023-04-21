import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as Constants from '../query/constants';

const RocketDetails = ({ match }) => {

    const [rocket, setRocket] = useState({ rocket: {} })
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetChRocket = async () => {
            setIsLoading(true);
            const queryResult = await axios.post(
                Constants.GRAPHQL_API, {
                    query: Constants.GET_ROCKET_BY_ID_QUERY,
                    variables: { id: `${match.params.id}` }
                }
            )
            console.log(queryResult)
            const { rocket } = queryResult.data.data;
            setRocket({ rocket })
        }
        fetChRocket().catch(err => {console.log(err)}).finally(() => setIsLoading(false));
    }, [match.params.id]);

    if (isLoading) return <div id="loading-bar-spinner" className="spinner"><div className="spinner-icon"></div></div>

    const { 
        name,
        wikipedia, 
        description, 
        company, 
        first_flight, 
        country, 
        success_rate_pct, 
        diameter 
    } = rocket.rocket;

    const renderDiameter = () => {
        if (diameter) return <p><b>Diameter:</b> { diameter.meters } meters.</p>;
    }

    return ( 
        <div className="rocket-details-container">
            <h1>ROCKET NAME:  { name }</h1>
            <p><b>Company:</b> { company }</p>
            <a className='wiki-link' href={ wikipedia } target="_blank">Wikipedia</a>
            <p><b>Description:</b> { description }</p>
            <p><b>First Flight:</b> { first_flight }</p>
            <p><b>Country:</b> { country }</p>
            <p><b>Success Rate:</b> { success_rate_pct }</p>
            {renderDiameter()}
        </div>
     );
}

export default RocketDetails;
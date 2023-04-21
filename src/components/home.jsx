import React, { useState, useEffect } from "react";
import SpacexBackground from "../images/Spacex.jpg";
import axios from 'axios';
import * as Constants from "../query/constants";
import '../App.css';

const Home = () => {

    const [company, setCompany] = useState({ company: [] })

    useEffect(() => {
        const fetchCompany = async () => {
            const queryResult = await axios.post(
                Constants.GRAPHQL_API, {
                query: Constants.COMPANY_QUERY
               }
            )
            const { company } = queryResult.data.data;
            setCompany({ company })
        }
        fetchCompany();
    }, [])

    const { summary, ceo, name, founded } = company.company;

    return (
        <>
            <img className="spacex-background" src={ SpacexBackground } alt="spacex-background"/>
            <div className="centered-text">
                <h1>FOUNDER: { ceo }</h1>
                <h1>COMPANY NAME: { name }</h1>
                <h1>FOUNDED: { founded }</h1>
                <h1>{ summary }</h1>
            </div>
        </>
    );
}

export default Home;
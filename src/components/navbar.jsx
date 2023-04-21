import React, { useState, useEffect } from 'react';
import '../App.css';
import { NavLink, Link } from 'react-router-dom';
import axios from "axios";
import * as Constants from '../query/constants';

const Navbar = () => {
    const handleClick = rocket => {
        console.log(rocket)
    }

    const [rockets, setRockets] = useState( { rockets: [] } );

    useEffect(() => {
        const fetchRockets = async () => {
          const queryResult = await axios.post(
              Constants.GRAPHQL_API, {
              query: Constants.ROCKETS
            }
          );
          const { rockets } = queryResult.data.data;
          setRockets({ rockets })
        }
        fetchRockets();
  }, [])

    return (
        <nav>
            <Link className="logo" to="/">SPACEX API</Link>
            <ul>
            <NavLink className="nav-links" to="/launches-past">Past Launches</NavLink>
                {rockets.rockets.map(rocket => (
                    <NavLink className="nav-links" to={`/rocket/${ rocket.id }`} key={ rocket.id } onClick={() =>  handleClick(rocket) }>{ rocket.name }</NavLink>
                ))}
            </ul>
        </nav>
    );
}

export default Navbar;
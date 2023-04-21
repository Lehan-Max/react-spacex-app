import React, {useState, useEffect} from 'react';
import axios from 'axios';
import * as Constants from '../query/constants';
import '../App.css';
import { Link } from 'react-router-dom';

const LaunchesPast = () => {

    const [launchesPast, setLaunchesPast] = useState( { launchesPast: [] } );
    const [isLoading, setIsLoading] = useState(false);
    const [pageSize, setPageSize] = useState(9);
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        const fetchLaunchesPast = async () => {
            setIsLoading(true);
            const queryResult = await axios.post(
                Constants.GRAPHQL_API, {
                query: Constants.LAUNCHES_PAST
            }
            );
            const { launchesPast } = queryResult.data.data;
            setLaunchesPast({ launchesPast })
        }
      fetchLaunchesPast().finally(() => setIsLoading(false));
    }, [])

    if (isLoading) return <div id="loading-bar-spinner" className="spinner"><div className="spinner-icon"></div></div>

    const renderShip = (ship) => {
        if (ship) {
            return <img className='ship-image' src={ship.image} alt="ship_image"/>
        }
    }

    const pagesCount = Math.ceil(launchesPast.launchesPast.length / pageSize);

    const pages = [...Array(pagesCount+1).keys()].slice(1);

    const handlePagination = (page) => {
        setCurrentPage(page)
    }

    const getPaginatedData = (data) => {
        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = startIndex + pageSize;
        return data.slice(startIndex, endIndex);
      };
  
    return ( 
        <>
            <h1 className='launchesppast-title'>SPACEX <span>PAST LAUNCHES</span></h1>
            <div className='grid-container'>
                {getPaginatedData(launchesPast.launchesPast).map(Launch => (
                    <div className='item' key={ Launch.id }>
                        <p><b>Mission Name:</b> <Link className='mission-name-link' to={`/launches-past/${ Launch.id }`}>{Launch.mission_name}</Link></p>
                        <p><b>Launch Date:</b> { Launch.launch_date_local}</p>
                        <p><b>Launch Site:</b> { Launch.launch_site.site_name_long}</p>
                        { renderShip(Launch.ships[0]) }
                    </div>
                ))}
            </div>
            <div className='pagination'>
                {pages.map(page => (
                    <div key={page} className={`pagination-item ${currentPage == page ? 'active-pagination-item' : ''}`} onClick={() => handlePagination(page)}>{page}</div>
                ))}
            </div>
        </>
     );
}
 
export default LaunchesPast;
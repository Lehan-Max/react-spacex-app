import React, {useState, useEffect} from "react";
import axios from "axios";
import * as Constants from '../query/constants';
import '../App.css';

const LaunchesPastDetails = ({ match, history }) => {
    const [launch, setLaunch] = useState({ launch:[] });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchLaunch = async () => {
            setIsLoading(true);
            const queryResult = await axios.post(
                Constants.GRAPHQL_API, {
                    query: Constants.GET_LAUNCH_BY_ID_QUERY,
                    variables: { id: `${match.params.id}`}
                }
            )
            const { launch } = queryResult.data.data;
            setLaunch({ launch })
        }
        fetchLaunch().finally(() => setIsLoading(false));
    },[match.params.id]);

    if (isLoading) return <div id="loading-bar-spinner" className="spinner"><div className="spinner-icon"></div></div>

    const handleBack = () => {
        return history.goBack();
    }

    return (
        <>
            <h1>Launches Past Deatails Page: { match.params.id }</h1>
            <button className='handle-back' onClick={handleBack}>Back</button>
            <table>
                <thead>
                    <tr>
                        <th>Mission Name</th>
                        <th>Launch Date</th>
                        <th>Launch Year</th>
                        <th>Launch Success</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{launch.launch.mission_name}</td>
                        <td>{launch.launch.launch_date_local}</td>
                        <td>{launch.launch.launch_year}</td>
                        <td>{launch.launch.launch_success}</td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}

export default LaunchesPastDetails;
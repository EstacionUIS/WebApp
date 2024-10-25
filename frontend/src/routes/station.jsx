import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

// CSS Syle
import './station.css'

// FetchAPI
import { getStationById } from '../api/satnogsAPI';

// Utils
import { getTimeDifference } from "../utils/timeDiff";
import { useUpdateTimeInterval } from "../utils/timeInterv";

import Entry from "./station/entry";

const stationId = 810;

function Station() {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [lastUpdated, setLastUpdated] = useState(null);

    const { t } = useTranslation(['system']);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const station = await getStationById(stationId);
            setData(station[0]);
            setLastUpdated(new Date());
            // Catched Data
            localStorage.setItem(`station-${stationId}`, JSON.stringify({ data: station[0], timestamp: new Date() }));
        } catch (err) {
            setError(err);
            setShowAlert(true); 
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        const storedData = localStorage.getItem(`station-${stationId}`);
        if (storedData) {
            const { data, timestamp } = JSON.parse(storedData);
            const hour = 60 * 60 * 1000;
            if (new Date() - new Date(timestamp) < hour) {
                setData(data);
                setLastUpdated(new Date(timestamp));
                setIsLoading(false);
            } else {
                fetchData();
            }
        } else {
            fetchData();
        }
    }, []);

    useUpdateTimeInterval(() => 
        setLastUpdated(new Date)
    );

    return (
        <div>
            {showAlert && ( 
                // Alert is shown regardless of loading state
                <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
                    <Alert.Heading>{t('errors.basic.error')}</Alert.Heading>
                    <p>
                        {error.message}
                    </p>
                </Alert>
            )}
            <div className="station-content-wrapper">
                {isLoading ?
                    <div className="d-flex justify-content-center align-items-center vh-100">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden">{t('loading')}...</span>
                        </Spinner>
                    </div>
                    :
                    <Entry data={data}/>
                }
            </div>
            <div className="button-update-container">
                <b>{lastUpdated ? `${t('lastUpdated')}: ${getTimeDifference(lastUpdated)}` : ""}</b>
                <Button variant="primary" onClick={() => fetchData()}> {t('refresh')} </Button>
            </div>
        </div>
    );
}

export default Station;

// Dependencies
import PropTypes from 'prop-types'; 
import Alert from 'react-bootstrap/Alert';
import Badge from 'react-bootstrap/Badge';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

// CSS Style
import './entry.css'

function Entry({ data }) {

    const { t } = useTranslation(['system', 'station']);

    if(!data){
        return (
            <Alert variant="danger">
                <Alert.Heading>{t('system:errors.basic.error')}</Alert.Heading>
                <p>{t('system:errors.basic.nullData')}</p>
            </Alert>
        );
    }
    
    const getStatusBadgeVariant = (status) => {
        switch (status) {
            case 'Online':
                return 'success'; 
            case 'Offline':
                return 'danger';
            case 'Unknown':
                return 'secondary';
            case 'Test':
                return 'warning';
            default:
                return 'light'; // Default to a neutral color
        }
    };

    return (
        <div className='entry-container'>
            {/* intro */}
            <div className='intro-content'>
                <div>
                    <div>
                        <h2>{t('station:name')}</h2>
                        <p>{data.name}</p>
                    </div>
                    <div>
                        <h2>{t('station:description')}</h2>
                        <p>{data.description}</p>
                    </div>
                </div>
                <div>
                    <img src={data.image} alt={t('station:image.alt')} />
                    <figcaption>{t('station:image.caption')}</figcaption>
                </div>
            </div>
            <ul className='info-content'>
                {/* status */}
                <li>
                    <div>
                        <h2>{t('station:status')}</h2>
                        <Badge bg={getStatusBadgeVariant(data.status)}>
                            {data.status}
                        </Badge>
                    </div>
                    <div>
                        <h2>{t('station:time.lastSeen')}</h2>
                        <p>{moment(data.last_seen).format('MMMM Do YYYY, h:mm:ss a')}</p>
                    </div>
                    <div>
                        <h2>{t('station:time.created')}</h2>
                        <p>{moment(data.created).format('MMMM Do YYYY, h:mm:ss a')}</p>
                    </div>
                </li>
                {/* location */}
                <li>
                    <h2>{t('station:location.title')}</h2>
                    <div>
                        <h2>{t('station:location.content.altitude')}</h2>
                        <p>{data.altitude}</p>
                    </div>
                    <div>
                        <h2>{t('station:location.content.latitude')}</h2>
                        <p>{data.lat}</p>
                    </div>
                    <div>
                        <h2>{t('station:location.content.longitude')}</h2>
                        <p>{data.lng}</p>
                    </div>
                </li>
                {/* antenna */}
                <li>
                    { data.antenna.map((key) => 
                        <div className='antenna-item'>
                            <h2>{key.antenna_type}</h2>
                            <div>
                                <h2>{t('station:antenna.content.frequency')}</h2>
                                <p>{key.frequency}</p>
                            </div>
                            <div>
                                <h2>{t('station:antenna.content.band')}</h2>
                                <p>{key.band}</p>
                            </div>
                        </div>
                    )}
                </li>
                {/* observations */}
                <li>
                    <div>
                        <h2>{t('Observations')}</h2>
                        <p>{data.observations}</p>
                    </div>
                    <div>
                        <h2>{t('FutureObservations')}</h2>
                        {data.future_observations}
                    </div>
                </li>
            </ul>
        </div>
    );
}

Entry.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        altitude: PropTypes.number.isRequired,
        min_horizon: PropTypes.number.isRequired,
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired,
        qthlocator: PropTypes.string.isRequired,
        antenna: PropTypes.arrayOf(
          PropTypes.shape({
            frequency: PropTypes.number.isRequired,
            frequency_max: PropTypes.number.isRequired,
            band: PropTypes.string.isRequired,
            antenna_type: PropTypes.string.isRequired,
            antenna_type_name: PropTypes.string.isRequired,
          })
        ).isRequired,
        created: PropTypes.string.isRequired,
        last_seen: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        observations: PropTypes.number.isRequired,
        future_observations: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        client_version: PropTypes.string.isRequired,
        target_utilization: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
        success_rate: PropTypes.number.isRequired,
        owner: PropTypes.string.isRequired,
    })
};

export default Entry;

// Dependencies
import { Button } from 'react-bootstrap';
import { BsBoxArrowUpRight } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';

// CSS
import './home.css';

// Images
const img1 = './images/station/images/img_1.png';
const img2 = './images/station/images/img_2.png';

const station1 = './images/station/station_1.jpg';
const station2 = './images/station/station_2.jpg';

const rasp = './images/station/materials/raspberry.jpg';
const raspUrl = 'https://www.raspberrypi.com/products/raspberry-pi-3-model-b-plus/';

const sdr = './images/station/materials/RTL.jpg';
const sdrUrl = 'https://www.rtl-sdr.com/';

const power = './images/station/materials/power.png';

const enclosure = './images/station/materials/enclosure.jpg'

const sofware = './images/station/materials/software.jpg';
const sofwareUrl = 'https://wiki.satnogs.org/SatNOGS_Client_Setup';

const web = './images/station/software/page.png';
const webUrl = 'https://network.satnogs.org/';

function Home() {
    const { t } = useTranslation('home');
    return (
        <div className='home-container'>
            <div className='intro'>
                <h1>{t('intro.title')}</h1>
                <p>{t('intro.paragraph')}</p>          
            </div>
            <div className='exploration'>
                <div>
                    <h1>{t('exploration.title')}</h1>
                    <p>{t('exploration.paragraph')}</p>   
                </div>
                <div className='two-image-container'>
                    <div>
                        <img src={img1} alt={t('exploration.images.1.alt')}/>
                        <figcaption>{t(t('exploration.images.1.caption'))}</figcaption>
                    </div>
                    <div>
                        <img src={img2} alt={t('exploration.images.2.alt')}/>
                        <figcaption>{t(t('exploration.images.2.caption'))}</figcaption>
                    </div>
                </div>
            </div>   
            <div className='campus'>
                <div>
                    <h1>{t('campus.title')}</h1>
                    <p>{t('campus.paragraph')}</p>   
                </div>
                <div className='two-image-container'>
                    <div>
                        <img src={station1} alt={t('campus.images.1.alt')}/>
                        <figcaption>{t(t('campus.images.1.caption'))}</figcaption>
                    </div>
                    <div>
                        <img src={station2} alt={t('campus.images.2.alt')}/>
                        <figcaption>{t(t('campus.images.2.caption'))}</figcaption>
                    </div>
                </div>
            </div> 
            <div className='materials'>
                <div>
                    <h1>{t('materials.title')}</h1>
                    <p>{t('materials.paragraph')}</p>
                </div>
                <ul>
                    {/* Raspberry */}
                    <li>
                        <h2>{t('materials.content.raspberry.title')}</h2>
                        <p>{t('materials.content.raspberry.paragraph')}</p>
                        <div>
                            <img src={rasp} alt={t('materials.content.raspberry.image.alt')}/>
                            <figcaption>{t('materials.content.raspberry.image.caption')}</figcaption>
                        </div>
                        <Button variant='primary' href={raspUrl} target='_blank' rel='noopener noreferrer'>
                            <div>
                                {t('materials.content.raspberry.button')}<BsBoxArrowUpRight/>
                            </div>
                        </Button>
                    </li>
                    {/* Sdr */}
                    <li>
                        <h2>{t('materials.content.sdr.title')}</h2>
                        <p>{t('materials.content.sdr.paragraph')}</p>
                        <div>
                            <img src={sdr} alt={t('materials.content.sdr.image.alt')}/>
                            <figcaption>{t('materials.content.sdr.image.caption')}</figcaption>
                        </div>
                        <Button variant='primary' href={sdrUrl} target='_blank' rel='noopener noreferrer'>
                            <div>
                                {t('materials.content.sdr.button')}<BsBoxArrowUpRight/>
                            </div>
                        </Button>
                    </li>
                    {/* power */}
                    <li>
                        <h2>{t('materials.content.power.title')}</h2> 
                        <p>{t('materials.content.power.paragraph')}</p>
                        <div>
                            <img src={power} alt={t('materials.content.power.image.alt')}/>
                            <figcaption>{t('materials.content.power.image.caption')}</figcaption>
                        </div>
                    </li>
                    {/* enclusure */}
                    <li>
                        <h2>{t('materials.content.enclosure.title')}</h2>
                        <p>{t('materials.content.enclosure.paragraph')}</p>
                        <div>
                            <img src={enclosure} alt={t('materials.content.enclosure.image.alt')}/>
                            <figcaption>{t('materials.content.enclosure.image.caption')}</figcaption>
                        </div>
                    </li>
                    {/* software */}
                    <li>
                        <h2>{t('materials.content.sofware.title')}</h2>
                        <p>{t('materials.content.sofware.paragraph')}</p>
                        <div>
                            <img src={sofware} alt={t('materials.content.sofware.image.alt')}/>
                            <figcaption>{t('materials.content.sofware.image.caption')}</figcaption>
                        </div>
                        <Button variant='primary' href={sofwareUrl} target='_blank' rel='noopener noreferrer'>
                            <div>
                                {t('materials.content.sofware.button')}<BsBoxArrowUpRight/>
                            </div>
                        </Button>
                    </li>
                </ul>
            </div>
            <div className='satnogs'>
                <div>
                    <h1>{t('satnogs.title')}</h1>
                    <p>{t('satnogs.paragraph')}</p>
                </div>
                <div>
                    <img src={web} alt={t('satnogs.image.alt')}/>
                    <figcaption>{t('satnogs.image.caption')}</figcaption>
                </div>
                <Button variant='primary' href={webUrl} target='_blank' rel='noopener noreferrer'>
                    <div>
                        {t('satnogs.button')}<BsBoxArrowUpRight/>
                    </div>
                </Button>
            </div>
        </div>
    );
}

export default Home;

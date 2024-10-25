// Dependencies
import Flagpack from 'react-flagpack';
import { Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

// Icon
import { BsGlobe } from 'react-icons/bs';

function LanguageSelector() {
    const { t, i18n } = useTranslation('languages');
    return (
        <div>
            <Dropdown>
                <Dropdown.Toggle variant='secondary' aria-label="Language Select">
                    <BsGlobe/>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={() => i18n.changeLanguage('en')}>
                        <Flagpack code={'US'} size='m' hasBorder={false}/>{t('english')}
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => i18n.changeLanguage('es')}>
                        <Flagpack code={'ES'} size='m' hasBorder={false}/>{t('spanish')}
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
}

export default LanguageSelector;

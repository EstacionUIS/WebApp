import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Dropdown } from 'react-bootstrap';

// React icons
import { BsFillSunFill, BsFillMoonFill, BsLaptop, BsPhone } from 'react-icons/bs'; 

function ThemeSelector() {
    const { t } = useTranslation('theme');
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    // Use a more descriptive state variable name
    const [selectedTheme, setSelectedTheme] = useState('system'); 

    useEffect(() => {
        const applyTheme = (theme) => {
            // Simplified theme application
            if (theme === 'system') {
                // Use prefers-color-scheme for system theme
                const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                document.documentElement.setAttribute('data-theme', systemTheme); 
            } else {
                document.documentElement.setAttribute('data-theme', theme);
            }
        };

        const handleStorageChange = (e) => {
            if (e.key === 'theme') {
                setSelectedTheme(e.newValue);
                applyTheme(e.newValue);
            }
        };

        // Initial theme application
        const storedTheme = localStorage.getItem('theme') || 'system'; 
        setSelectedTheme(storedTheme);
        applyTheme(storedTheme);

        // Listen for changes in localStorage
        window.addEventListener('storage', handleStorageChange); 

        // Clean up the event listener
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []); // Empty dependency array ensures this runs only once

    const handleThemeChange = (theme) => {
        setSelectedTheme(theme);
        localStorage.setItem('theme', theme);

        // Apply the theme immediately
        if (theme === 'system') {
            // Use prefers-color-scheme for system theme
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', systemTheme); 
        } else {
            document.documentElement.setAttribute('data-theme', theme);
        }
    };

    return (
        <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                {selectedTheme === 'light' && <BsFillSunFill />} 
                {selectedTheme === 'dark' && <BsFillMoonFill />} 
                {selectedTheme === 'system' && (isMobile ? <BsPhone /> : <BsLaptop />)}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleThemeChange('light')}>
                    <BsFillSunFill /> {t('Light')}
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleThemeChange('dark')}>
                    <BsFillMoonFill /> {t('Dark')}
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleThemeChange('system')}>
                    {isMobile ? <BsPhone /> : <BsLaptop />} {t('System')}
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default ThemeSelector;

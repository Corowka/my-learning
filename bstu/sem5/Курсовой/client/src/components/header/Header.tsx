"use client"

import classes from './Header.module.css';
import { Select } from 'antd';
import { useAppContext } from '../AppContext'

const Header: React.FC = () => {

    const {
        menuState, setMenuState,
        data, setData
    } = useAppContext();
    
    return (
        <header className={classes.header}>
            <Select
                className={classes.menu}
                defaultValue={menuState}
                onChange={(value) => setMenuState(value)}
                size='large'
                options={[
                    { label: 'Advertising companies', value: 'companies' },
                    { label: 'Clients', value: 'clients' },
                    { label: 'Advertising directors', value: 'directors' },
                    { label: 'Media planners', value: 'planners' },
                    { label: 'Designers', value: 'designers' },
                ]}
            />
        </header>
    );
};

export default Header;
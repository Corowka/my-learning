"use client"

import classes from './Footer.module.css';
import { Button } from 'antd';
import { useAppContext } from '../AppContext'
import CompanyModal from '../modal/CompanyModal';
import PersonModal from '../modal/PersonModal';
import SearchModal from '../modal/SearchModal'
import { useState } from 'react';

const Footer: React.FC = () => {

    const { menuState } = useAppContext();
    const [showCreateModal, setShowCreateModal] = useState(false)
    const [showSearchModal, setShowSearchModal] = useState(false)

    return (
        <footer className={classes.footer}>
            {(menuState === 'companies') && <Button className={classes.button} size='large' onClick={() => setShowCreateModal(true)}>Create new Company</Button>}
            {(menuState === 'clients') && <Button className={classes.button} size='large' onClick={() => setShowCreateModal(true)}>Create new Client</Button>}
            {(menuState === 'directors') && <Button className={classes.button} size='large' onClick={() => setShowCreateModal(true)}>Create new Director</Button>}
            {(menuState === 'planners') && <Button className={classes.button} size='large' onClick={() => setShowCreateModal(true)}>Create new Planner</Button>}
            {(menuState === 'designers') && <Button className={classes.button} size='large' onClick={() => setShowCreateModal(true)}>Create new Designer</Button>}

            <Button className={classes.button} size='large' onClick={() => setShowSearchModal(true)}>Search</Button>

            {(menuState === 'companies')
                ? <CompanyModal
                    isVisible={showCreateModal}
                    setIsVisible={setShowCreateModal}
                    item={{
                        id: Date.now(),
                        name: "",
                        srt_date: "",
                        end_date: "",
                        price: 0,
                        id_client: 0,
                        id_director: 0,
                        id_planner: 0,
                        id_designer: 0
                    }}
                    mode='create'
                ></CompanyModal>
                : <PersonModal
                    isVisible={showCreateModal}
                    setIsVisible={setShowCreateModal}
                    item={{
                        id: Date.now(),
                        fio: "",
                        email: "",
                        phone: ""
                    }}
                    mode='create'
                ></PersonModal>}
            <SearchModal
                isVisible={showSearchModal}
                setIsVisible={setShowSearchModal}
            ></SearchModal>
        </footer>
    );
};

export default Footer;
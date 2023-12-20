"use client"
import { Person } from '@/config';
import classes from './List.module.css';
import { useState, useEffect } from 'react';
import { useAppContext } from '../AppContext';
import PersonModal from '../modal/PersonModal';

interface PersonListProps {
    persons: Person[]
}

const PersonList: React.FC<PersonListProps> = ({ persons }) => {

    const [modal, setModal] = useState<boolean[]>(persons.map(() => false));
    const { menuState, setMenuState, data, setData } = useAppContext();

    useEffect(() => {
        setModal(persons.map(() => false))
    }, [data.clients, data.designers, data.directors, data.planners])

    return (
        <div className={classes.list}>
            {persons.map((item, index) =>
                <div key={index}>
                    <button
                        className={classes.listItem}
                        onClick={() => setModal(modal.map((_, i) => i === index))}
                    >{item.fio}</button>
                    <PersonModal
                        isVisible={modal[index]}
                        setIsVisible={(v) => setModal(modal.map((_, i) => (i === index) ? v : false))}
                        item={item}
                        mode='update'
                    ></PersonModal>
                </div>
            )}
        </div>
    );
};

export default PersonList;
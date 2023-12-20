"use client"
import { Company } from '@/config';
import classes from './List.module.css';
import { useState, useEffect } from 'react';
import { useAppContext } from '../AppContext';
import CompanyModal from '../modal/CompanyModal';

interface CompanyListProps {
    companies: Company[]
}

const CompanyList: React.FC<CompanyListProps> = ({ companies }) => {

    const [modal, setModal] = useState<boolean[]>(companies.map(() => false));
    const { menuState, setMenuState, data, setData } = useAppContext();

    useEffect(() => {
        setModal(companies.map(() => false))
    }, [data.companies])

    return (
        <div className={classes.list}>
            {companies.map((item, index) =>
                <div key={index}>
                    <button
                        className={classes.listItem}
                        onClick={() => setModal(modal.map((_, i) => i === index))}
                    >{item.name}</button>
                    <CompanyModal
                        isVisible={modal[index]}
                        setIsVisible={(v) => setModal(modal.map((_, i) => (i === index) ? v : false))}
                        item={item}
                        mode='update'
                    ></CompanyModal>
                </div>
            )}
        </div>
    );
};

export default CompanyList;
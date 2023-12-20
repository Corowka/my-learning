"use client"
import { Company, Person } from '@/config';
import classes from './List.module.css';
import { useAppContext } from '../AppContext';
import CompanyList from './CompanyList'
import PersonList from './PersonList'
import API from '../../api/databaseAPI'
import { useState, useEffect } from 'react';
import Loader from '../loader/Loader'

const ListWrapper: React.FC = () => {

    const {
        menuState, setMenuState,
        data, setData
    } = useAppContext();

    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        const companies = await API.getCompanies()
        const clients = await API.getClients()
        const directors = await API.getDirectors()
        const planners = await API.getPlanners()
        const designers = await API.getDesigners()
        setData({ companies, clients, directors, planners, designers })
        setIsLoading(false)
    };

    useEffect(() => {
        fetchData()
    }, [])

    let companies: Company[] = data.companies;
    let persons: Person[] = [];
    switch (menuState) {
        case "clients": persons = data.clients; break;
        case "directors": persons = data.directors; break;
        case "planners": persons = data.planners; break;
        case "designers": persons = data.designers; break;
    }

    if (isLoading) {
        return <Loader/>
    }

    return (
        <div className={classes.wrapper}>
            {(menuState === "companies")
                ? <CompanyList
                    companies={companies}
                ></CompanyList>
                : <PersonList
                    persons={persons}
                ></PersonList>
            }
        </div>
    );
};

export default ListWrapper;
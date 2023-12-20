"use client"

import { useState } from 'react'
import { Company, Person } from '@/config';
import classes from './Modal.module.css';
import { useAppContext } from '../AppContext';
import { Input, Button } from 'antd';
import Loader from '../loader/Loader';

interface ModalProps {
    isVisible: boolean,
    setIsVisible: (isVisible: boolean) => void,
}

const SearchModal: React.FC<ModalProps> = ({ isVisible, setIsVisible }) => {

    const { data } = useAppContext();
    const [state, setState] = useState<number>(0)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [search, setSearch] = useState<string>("")
    const [companiesSearchRes, setCompaniesSearchRes] = useState<Company[]>([])
    const [personsSearchRes, setPersonsSearchRes] = useState<Person[]>([])

    if (!isVisible) { return }

    const companies = [...data.companies]
    const persons = [...data.clients, ...data.directors, ...data.planners, ...data.designers]

    const searchHandler = () => {
        setIsLoading(true)
        if (state == 1) {
            const isGoToCompanySearchRes = (c: Company) => {
                return (
                    ('' + c.id).toLowerCase().includes(search.toLowerCase()) ||
                    ('' + c.name).toLowerCase().includes(search.toLowerCase()) ||
                    ('' + c.srt_date).toLowerCase().includes(search.toLowerCase()) ||
                    ('' + c.end_date).toLowerCase().includes(search.toLowerCase()) ||
                    ('' + c.price).toLowerCase().includes(search.toLowerCase()) ||
                    ('' + c.id_client).toLowerCase().includes(search.toLowerCase()) ||
                    ('' + c.id_director).toLowerCase().includes(search.toLowerCase()) ||
                    ('' + c.id_planner).toLowerCase().includes(search.toLowerCase()) ||
                    ('' + c.id_designer).toLowerCase().includes(search.toLowerCase())
                )
            }
            setCompaniesSearchRes(companies.filter(c => isGoToCompanySearchRes(c)))
        } else {
            const isGoToPersonSearchRes = (p: Person) => {
                return (
                    ('' + p.id).toLowerCase().includes(search.toLowerCase()) ||
                    ('' + p.fio).toLowerCase().includes(search.toLowerCase()) ||
                    ('' + p.email).toLowerCase().includes(search.toLowerCase()) ||
                    ('' + p.phone).toLowerCase().includes(search.toLowerCase())
                )
            }
            setPersonsSearchRes(persons.filter(p => isGoToPersonSearchRes(p)))
        }
        console.log(companiesSearchRes)
        console.log(personsSearchRes)
        setTimeout(() => setIsLoading(false), 1500)
    }

    return (
        <div className={classes.bg}>
            <div className={classes.modal}>
                <Input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Enter your search"
                ></Input>
                <div className={classes.btnWrap}>
                    <span>Choose item</span>
                    <Button className={`${(state == 1) && classes.chosen}`} onClick={() => {setState(1); setCompaniesSearchRes([])}}>Company</Button>
                    <span>/</span>
                    <Button className={`${(state == 2) && classes.chosen}`} onClick={() => {setState(2); setPersonsSearchRes([])}}>Person</Button>
                </div >
                {isLoading && <Loader />}
                {(state == 1 && !isLoading) && <div className={classes.list}>{(companiesSearchRes.length) ? companiesSearchRes.map(c => <div className={classes.item} key={c.id}>{c.name}</div>) : "Companies not found"}</div>}
                {(state == 2 && !isLoading) && <div className={classes.list}>{(personsSearchRes.length) ? personsSearchRes.map(P => <div className={classes.item} key={P.id}>{P.fio}</div>) : "Persons not found"}</div>}
                <div className={classes.btnWrap}>
                    <Button onClick={() => setIsVisible(false)} >Cancel</Button>
                    {(state == 1 || state == 2) && <Button onClick={() => searchHandler()} >Search</Button>}
                </div>
            </div>
        </div >
    )
};

export default SearchModal;
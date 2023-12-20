"use client"

import { useState } from 'react'
import { Company, Data } from '@/config';
import classes from './Modal.module.css';
import { useAppContext } from '../AppContext';
import { Input, Button, Select } from 'antd';
import API from '../../api/databaseAPI'
import { dateValidator, nameValidator } from '../../utils'

interface ModalProps {
    isVisible: boolean,
    setIsVisible: (isVisible: boolean) => void,
    item: Company,
    mode: string
}

const CompanyModal: React.FC<ModalProps> = ({ isVisible, setIsVisible, item, mode }) => {

    const {
        menuState, setMenuState,
        data, setData
    } = useAppContext();

    const [company, setCompany] = useState<Company>({
        ...item, srt_date: item.srt_date.slice(0, 10), end_date: item.end_date.slice(0, 10)
    })
    const [error, setError] = useState<string | undefined>()

    if (!isVisible) { return }

    return (
        <div className={classes.bg}>
            <div className={classes.modal}>
                <label>Name</label>
                <Input
                    value={company.name}
                    onChange={(event) => { setCompany({ ...company, name: event.target.value }) }}
                    placeholder="White company name"
                ></Input>
                <label>Start date</label>
                <Input
                    value={company.srt_date}
                    onChange={(event) => { setCompany({ ...company, srt_date: event.target.value }) }}
                    placeholder="YYYY-MM-DD"
                ></Input>
                <label>End date</label>
                <Input
                    value={company.end_date}
                    onChange={(event) => { setCompany({ ...company, end_date: event.target.value }) }}
                    placeholder="YYYY-MM-DD"
                ></Input>
                <label>Price $</label>
                <Input
                    value={company.price}
                    onChange={(event) => { setCompany({ ...company, price: +event.target.value }) }}
                    placeholder="100"
                ></Input>
                <label>Client</label>
                <Select
                    className={classes.select}
                    defaultValue={(data.clients.filter((v) => v.id == item.id_client).length)
                        ? data.clients.filter((v) => v.id == item.id_client)[0].id : 0
                    }
                    onChange={(value) => setCompany({ ...company, id_client: value })}
                    options={data.clients.map((client, i) => {
                        return { label: client.fio, value: client.id }
                    }).concat([{ label: 'The Client is not selected', value: 0 }])}
                />
                <label>Director</label>
                <Select
                    className={classes.select}
                    defaultValue={(data.directors.filter((v) => v.id == item.id_director).length)
                        ? data.directors.filter((v) => v.id == item.id_director)[0].id : 0
                    }
                    onChange={(value) => setCompany({ ...company, id_director: value })}
                    options={data.directors.map((director, i) => {
                        return { label: director.fio, value: director.id }
                    }).concat([{ label: 'The Director is not selected', value: 0 }])}
                />
                <label>Planner</label>
                <Select
                    className={classes.select}
                    defaultValue={(data.planners.filter((v) => v.id == item.id_planner).length)
                        ? data.planners.filter((v) => v.id == item.id_planner)[0].id : 0
                    }
                    onChange={(value) => setCompany({ ...company, id_planner: value })}
                    options={data.planners.map((planner, i) => {
                        return { label: planner.fio, value: planner.id }
                    }).concat([{ label: 'The Planner is not selected', value: 0 }])}
                />
                <label>Designer</label>
                <Select
                    className={classes.select}
                    defaultValue={(data.designers.filter((v) => v.id == item.id_designer).length)
                        ? data.designers.filter((v) => v.id == item.id_designer)[0].id : 0
                    }
                    onChange={(value) => setCompany({ ...company, id_designer: value })}
                    options={data.designers.map((designer, i) => {
                        return { label: designer.fio, value: designer.id }
                    }).concat([{ label: 'The Designer is not selected', value: 0 }])}
                />
                <div className={classes.btnWrap}>
                    <Button
                        onClick={() => setIsVisible(false)}
                    >Cancel</Button>
                    <Button
                        onClick={() => {
                            API.deleteCompany(company.id);
                            setData({ ...data, companies: data.companies.filter(v => v.id !== company.id) })
                            setIsVisible(false)
                        }}
                    >Delete</Button>
                    <Button
                        onClick={() => {
                            if (!nameValidator(company.name)) {
                                setError("Incorrect Name, please, try again")
                                return
                            }
                            if (!dateValidator(company.srt_date)) {
                                setError("Incorrect Start date, please, try again")
                                return
                            }
                            if (!dateValidator(company.end_date)) {
                                setError("Incorrect End date, please, try again")
                                return
                            }
                            company.id_client = (company.id_client === 0) ? null : company.id_client
                            company.id_director = (company.id_director === 0) ? null : company.id_director
                            company.id_planner = (company.id_planner === 0) ? null : company.id_planner
                            company.id_designer = (company.id_designer === 0) ? null : company.id_designer
                            if (mode === 'update') {
                                const dataPart = data.companies.map((a, i) => (a.id === company.id) ? company : a)
                                let newData = { ...data, companies: dataPart };
                                setData(newData);
                                API.updateCompany(company);
                            } else {
                                const newData = { ...data, companies: data.companies.concat(company) };
                                setData(newData);
                                API.createCompany(company);
                            }
                            setIsVisible(false)
                        }}
                    >Save & Close</Button>
                </div>
                {error && <span className={classes.error}>{error}</span>}
            </div>
        </div>
    )
};

export default CompanyModal;
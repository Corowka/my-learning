"use client"

import { useState } from 'react'
import { Person, Data } from '@/config';
import classes from './Modal.module.css';
import { useAppContext } from '../AppContext';
import { Input, Button } from 'antd';
import API from '../../api/databaseAPI'
import {
    emailValidator,
    fioValidator,
    phoneValidator,
} from '../../utils'

interface ModalProps {
    isVisible: boolean,
    setIsVisible: (isVisible: boolean) => void,
    item: Person,
    mode: string
}

const PersonModal: React.FC<ModalProps> = ({ isVisible, setIsVisible, item, mode }) => {

    const {
        menuState, setMenuState,
        data, setData
    } = useAppContext();

    const [person, setPerson] = useState<Person>({ ...item })
    const [error, setError] = useState<string | undefined>()

    if (!isVisible) { return }

    return (
        <div className={classes.bg}>
            <div className={classes.modal}>
                <label>FIO</label>
                <Input
                    value={person.fio}
                    onChange={(event) => { setPerson({ ...person, fio: event.target.value }) }}
                    placeholder="Ivanov Ivan Ivanovish"
                ></Input>
                <label>Email</label>
                <Input
                    value={person.email}
                    onChange={(event) => { setPerson({ ...person, email: event.target.value }) }}
                    placeholder="coolivan@gmail.com"
                ></Input>
                <label>Phone</label>
                <Input
                    value={person.phone}
                    onChange={(event) => { setPerson({ ...person, phone: event.target.value }) }}
                    placeholder="+1234567890"
                ></Input>
                <div className={classes.btnWrap}>
                    <Button
                        onClick={() => { setIsVisible(false); setPerson({ ...item }) }}
                    >Cancel</Button>
                    <Button
                        onClick={() => {
                            switch (menuState) {
                                case "clients": API.deleteClient(person.id); break;
                                case "directors": API.deleteDirector(person.id); break;
                                case "planners": API.deletePlanner(person.id); break;
                                case "designers": API.deleteDesigner(person.id); break;
                            }
                            setData({ ...data, [menuState]: data[menuState as keyof Data].filter(v => v.id !== person.id) })
                            setIsVisible(false)
                        }}
                    >Delete</Button>
                    <Button
                        onClick={() => {
                            if (!fioValidator(person.fio)) {
                                setError("Incorrect FIO, please, try again")
                                return
                            }
                            if (!emailValidator(person.email)) {
                                setError("Incorrect Email, please, try again")
                                return
                            }
                            if (!phoneValidator(person.phone)) {
                                setError("Incorrect Phone, please, try again")
                                return
                            }
                            if (mode === 'update') {
                                const dataPart = data[menuState as keyof Data].map((a, i) => (a.id === person.id) ? person : a)
                                let newData = { ...data, [menuState]: dataPart };
                                setData(newData);
                                switch (menuState) {
                                    case "clients": API.updateClient(person); break;
                                    case "directors": API.updateDirector(person); break;
                                    case "planners": API.updatePlanner(person); break;
                                    case "designers": API.updateDesigner(person); break;
                                }
                            } else {
                                const newData = { ...data, [menuState]: data[menuState as keyof Data].concat(person) };
                                setData(newData);
                                switch (menuState) {
                                    case "clients": API.createClient(person); break;
                                    case "directors": API.createDirector(person); break;
                                    case "planners": API.createPlanner(person); break;
                                    case "designers": API.createDesigner(person); break;
                                }
                            }
                            setIsVisible(false)
                        }}
                    >Save & Close</Button>
                </div>
                {error && <span className={classes.error}>{error}</span>}
            </div>
        </div >
    )
};

export default PersonModal;
import axios from 'axios';
import { IP, PORT } from '../config'
import { Company, Person } from "../config"

class DatabaseAPI {

    // Companies

    async getCompanies(): Promise<Company[]> {
        const response = await axios.get(`http://${IP}:${PORT}/company/all`)
        return response.data
    }

    async getCompany(id: number): Promise<Company> {
        const response = await axios.get(`http://${IP}:${PORT}/company/${id}`)
        return response.data
    }

    async createCompany(company: Company): Promise<Company> {
        const response = await axios.post(`http://${IP}:${PORT}/company/create`, company)
        return response.data
    }

    async updateCompany(company: Company): Promise<Company> {
        const response = await axios.put(`http://${IP}:${PORT}/company/update`, company)
        return response.data
    }

    async deleteCompany(id: number): Promise<Company> {
        const response = await axios.delete(`http://${IP}:${PORT}/company/delete/${id}`)
        return response.data
    }

    // Clients

    async getClients(): Promise<Person[]> {
        const response = await axios.get(`http://${IP}:${PORT}/client/all`)
        return response.data
    }

    async getClient(id: number): Promise<Person> {
        const response = await axios.get(`http://${IP}:${PORT}/client/${id}`)
        return response.data
    }

    async createClient(client: Person): Promise<Person> {
        const response = await axios.post(`http://${IP}:${PORT}/client/create`, client)
        return response.data
    }

    async updateClient(client: Person): Promise<Person> {
        const response = await axios.put(`http://${IP}:${PORT}/client/update`, client)
        return response.data
    }

    async deleteClient(id: number): Promise<Person> {
        const response = await axios.delete(`http://${IP}:${PORT}/client/delete/${id}`)
        return response.data
    }

    // Directors

    async getDirectors(): Promise<Person[]> {
        const response = await axios.get(`http://${IP}:${PORT}/director/all`)
        return response.data
    }

    async getDirector(id: number): Promise<Person> {
        const response = await axios.get(`http://${IP}:${PORT}/director/${id}`)
        return response.data
    }

    async createDirector(director: Person): Promise<Person> {
        const response = await axios.post(`http://${IP}:${PORT}/director/create`, director)
        return response.data
    }

    async updateDirector(director: Person): Promise<Person> {
        const response = await axios.put(`http://${IP}:${PORT}/director/update`, director)
        return response.data
    }

    async deleteDirector(id: number): Promise<Person> {
        console.log(id)
        const response = await axios.delete(`http://${IP}:${PORT}/director/delete/${id}`)
        return response.data
    }

    // Planners

    async getPlanners(): Promise<Person[]> {
        const response = await axios.get(`http://${IP}:${PORT}/planner/all`)
        return response.data
    }

    async getPlanner(id: number): Promise<Person> {
        const response = await axios.get(`http://${IP}:${PORT}/planner/${id}`)
        return response.data
    }

    async createPlanner(planner: Person): Promise<Person> {
        const response = await axios.post(`http://${IP}:${PORT}/planner/create`, planner)
        return response.data
    }

    async updatePlanner(planner: Person): Promise<Person> {
        const response = await axios.put(`http://${IP}:${PORT}/planner/update`, planner)
        return response.data
    }

    async deletePlanner(id: number): Promise<Person> {
        const response = await axios.delete(`http://${IP}:${PORT}/planner/delete/${id}`)
        return response.data
    }

    // Designers

    async getDesigners(): Promise<Person[]> {
        const response = await axios.get(`http://${IP}:${PORT}/designer/all`)
        return response.data
    }

    async getDesigner(id: number): Promise<Person> {
        const response = await axios.get(`http://${IP}:${PORT}/designer/${id}`)
        return response.data
    }

    async createDesigner(designer: Person): Promise<Person> {
        const response = await axios.post(`http://${IP}:${PORT}/designer/create`, designer)
        return response.data
    }

    async updateDesigner(designer: Person): Promise<Person> {
        const response = await axios.put(`http://${IP}:${PORT}/designer/update`, designer)
        return response.data
    }

    async deleteDesigner(id: number): Promise<Person> {
        const response = await axios.delete(`http://${IP}:${PORT}/designer/delete/${id}`)
        return response.data
    }
}

const API = new DatabaseAPI
export default API
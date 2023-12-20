const db = require('../db')

class Controller {

    // Company

    async getAllCompanies(req, res) {
        const companies = await db.query('SELECT * FROM company')
        res.json(companies.rows)
    }

    async getCompany(req, res) {
        const id = rea.params.id
        const company = await db.query('SELECT * FROM company where id = $1', [id])
        res.json(user.rows[0])
    }

    async createCompany(req, res) {
        const { name, srt_date, end_date, price, id_client, id_director, id_planner, id_designer } = req.body
        const newCompany = await db.query(
            `INSERT INTO company 
            (name, srt_date, end_date, price, id_client, id_director, id_planner, id_designer) 
            values ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
            [name, srt_date, end_date, price, id_client, id_director, id_planner, id_designer]
        )
        res.json(newCompany.rows[0])
    }

    async updateCompany(req, res) {
        const { id, name, srt_date, end_date, price, id_client, id_director, id_planner, id_designer } = req.body;
        const company = await db.query(
            `UPDATE company set 
            name = $1, srt_date = $2, end_date = $3, price = $4,
            id_client = $5, id_director = $6, id_planner = $7, id_designer = $8 
            where id = $9 RETURNING *`,
            [name, srt_date, end_date, price, id_client, id_director, id_planner, id_designer, id]
        )
        res.json(company.rows[0])
    }

    async deleteCompany(req, res) {
        const id = req.params.id
        const company = await db.query('DELETE FROM company where id = $1', [id])
        res.json(company.rows[0])
    }

    // Client

    async getAllClients(req, res) {
        const clients = await db.query('SELECT * FROM client')
        res.json(clients.rows)
    }

    async getClient(req, res) {
        body
        const id = rea.params.id
        const client = await db.query('SELECT * FROM client where id = $1', [id])
        res.json(client.rows[0])
    }

    async createClient(req, res) {
        const { fio, email, phone } = req.body
        const newClient = await db.query(
            `INSERT INTO client 
            (fio, email, phone) 
            values ($1, $2, $3) RETURNING *`,
            [fio, email, phone]
        )
        res.json(newClient.rows[0])
    }

    async updateClient(req, res) {
        const { id, fio, email, phone } = req.body
        const client = await db.query(
            `UPDATE client set 
            fio = $1, email = $2, phone = $3
            where id = $4 RETURNING *`,
            [fio, email, phone, id]
        )
        res.json(client.rows[0])
    }

    async deleteClient(req, res) {
        const id = req.params.id
        const companies = await db.query(
            `UPDATE company
            SET id_client = NULL
            WHERE id_client = $1 RETURNING *`,
            [id]
        )
        const client = await db.query('DELETE FROM director where id = $1', [id])
        res.json({client: client.rows[0], companies: companies.rows})
    }

    // Director

    async getAllDirectors(req, res) {
        const directors = await db.query('SELECT * FROM director')
        res.json(directors.rows)
    }

    async getDirector(req, res) {
        const id = rea.params.id
        const director = await db.query('SELECT * FROM client where id = $1', [id])
        res.json(director.rows[0])
    }

    async createDirector(req, res) {
        const { fio, email, phone } = req.body
        const newDirector = await db.query(
            `INSERT INTO director 
            (fio, email, phone) 
            values ($1, $2, $3) RETURNING *`,
            [fio, email, phone]
        )
        res.json(newDirector.rows[0])
    }

    async updateDirector(req, res) {
        const { id, fio, email, phone } = req.body
        const director = await db.query(
            `UPDATE director set 
            fio = $1, email = $2, phone = $3
            where id = $4 RETURNING *`,
            [fio, email, phone, id]
        )
        res.json(director.rows[0])
    }

    async deleteDirector(req, res) {
        const id = req.params.id
        const companies = await db.query(
            `UPDATE company
            SET id_director = NULL
            WHERE id_director = $1 RETURNING *`,
            [id]
        )
        const director = await db.query('DELETE FROM director where id = $1', [id])
        res.json({director: director.rows[0], companies: companies.rows})
    }

    // Planner

    async getAllPlanners(req, res) {
        const planners = await db.query('SELECT * FROM planner')
        res.json(planners.rows)
    }

    async getPlanner(req, res) {
        const id = rea.params.id
        const planner = await db.query('SELECT * FROM planner where id = $1', [id])
        res.json(planner.rows[0])
    }

    async createPlanner(req, res) {
        const { fio, email, phone } = req.body
        const newPlanner = await db.query(
            `INSERT INTO planner 
            (fio, email, phone) 
            values ($1, $2, $3) RETURNING *`,
            [fio, email, phone]
        )
        res.json(newPlanner.rows[0])
    }

    async updatePlanner(req, res) {
        const { id, fio, email, phone } = req.body
        const planner = await db.query(
            `UPDATE planner set 
            fio = $1, email = $2, phone = $3
            where id = $4 RETURNING *`,
            [fio, email, phone, id]
        )
        res.json(planner.rows[0])
    }

    async deletePlanner(req, res) {
        const id = req.params.id
        const companies = await db.query(
            `UPDATE company
            SET id_planner = NULL
            WHERE id_planner = $1 RETURNING *`,
            [id]
        )
        const planner = await db.query('DELETE FROM planner where id = $1', [id])
        res.json({planner: planner.rows[0], companies: companies.rows})
    }

    // Designer

    async getAllDesigners(req, res) {
        const designers = await db.query('SELECT * FROM designer')
        res.json(designers.rows)
    }

    async getDesigner(req, res) {
        const id = rea.params.id
        const designer = await db.query('SELECT * FROM designer where id = $1', [id])
        res.json(designer.rows[0])
    }

    async createDesigner(req, res) {
        const { fio, email, phone } = req.body
        const newDesigner = await db.query(
            `INSERT INTO designer 
            (fio, email, phone) 
            values ($1, $2, $3) RETURNING *`,
            [fio, email, phone]
        )
        res.json(newDesigner.rows[0])
    }

    async updateDesigner(req, res) {
        const { id, fio, email, phone } = req.body
        const designer = await db.query(
            `UPDATE designer set 
            fio = $1, email = $2, phone = $3
            where id = $4 RETURNING *`,
            [fio, email, phone, id]
        )
        res.json(designer.rows[0])
    }

    async deleteDesigner(req, res) {
        const id = req.params.id
        const companies = await db.query(
            `UPDATE company
            SET id_designer = NULL
            WHERE id_designer = $1 RETURNING *`,
            [id]
        )
        const designer = await db.query('DELETE FROM designer where id = $1', [id])
        res.json({designer: designer.rows[0], companies: companies.rows})
    }

}

module.exports = new Controller()
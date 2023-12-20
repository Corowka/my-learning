// export const IP = '192.168.0.107'
// export const IP = '100.70.38.198'
// export const IP = 'localhost'
export const IP = '100.70.44.83'
export const PORT = 8080

export type Company = {
    id: number,
    name: string,
    srt_date: string,
    end_date: string,
    price: number,
    id_client: number | null,
    id_director: number | null,
    id_planner: number | null,
    id_designer: number | null,
}

export type Person = {
    id: number,
    fio: string,
    email: string,
    phone: string,
}

export type Data = {
    companies: Company[],
    clients: Person[],
    directors: Person[],
    planners: Person[],
    designers: Person[],
} 
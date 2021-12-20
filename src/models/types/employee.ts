import { Entity } from "../types/entity"

interface Employee extends Entity {
    firstname: string
    lastname: string
    email: string
    teamId?: number
}

export { Employee }

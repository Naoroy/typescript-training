import { Entity } from "../types/entity"

interface Employee extends Entity {
    firstName: string
    lastName: string
    email: string
    teamId?: number
}

export { Employee }

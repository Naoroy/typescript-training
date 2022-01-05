import { Keys } from "../../keys"
import { Dependency } from "../../decorators/dependency"
import { Employee } from "../types/employee"
import { AbstractRepository } from "./abstractRepository"
import { QueryType } from "./queryType"

@Dependency(Keys.employeeRepository)
class EmployeeRepository extends AbstractRepository<Employee> {
    constructor() {
        super()
        this.addQuery(QueryType.GetAll, `
            SELECT 
                e.Id as id,
                e.FirstName as firstname,
                e.LastName as lastname,
                e.Email as email,
                t.Id as teamId
            FROM Employee as e
            LEFT OUTER JOIN Team as t on e.TeamId = t.id
        `)
    }

    getParams(entity: Employee): any[] {
        return [
            entity.firstname,
            entity.lastname,
            entity.email,
            entity.teamId || undefined,
        ]
    }
}

export { EmployeeRepository }

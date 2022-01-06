import { Keys } from "./../../keys"
import { Dependency } from "./../../decorators/dependency"
import { Employee } from "../types/employee"
import { AbstractRepository } from "./abstractRepository"
import { QueryType } from "./queryType"
import { Repository } from "./repository"


interface EmployeeRepository extends Repository<Employee> {
    exists(email: String): Promise<boolean>
}

@Dependency(Keys.employeeRepository)
class EmployeeRepositoryImpl extends AbstractRepository<Employee> implements EmployeeRepository {
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
        this.addQuery(QueryType.Insert, `
            INSERT INTO
            Employee
            (
                FirstName,
                LastName,
                Email,
                TeamId
            )
            VALUES(?, ?, ?, ?)
        `)
    }

    getParams(entity: Employee): any[] {
        return [
            entity.firstName,
            entity.lastName,
            entity.email,
            entity.teamId || undefined,
        ]
    }

    async exists(email: string): Promise<boolean> {
        const query = `
        SELECT COUNT(*) as nb
        FROM Employee
        WHERE Email = ?
        `

        await this.open()
        const row = await this.query(query, [email])
        await this.close()
        return row.nb > 0
    }
}

export { EmployeeRepository }

import { Keys } from "../keys"
import { Inject } from "../decorators/inject"
import { Controller } from "../decorators/controller"
import { Get } from "../decorators/route"
import { Response, Request } from "express"
import { Employee } from "../models/types/employee"
import { Repository } from "../models/repositories/repository"

@Controller()
class EmployeeController {
    private readonly employeeRepository: Repository<Employee>

    constructor(
        @Inject(Keys.employeeRepository)
        employeeRepository: Repository<Employee>
    ) {
        this.employeeRepository = employeeRepository
    }

    @Get()
    async getAll(req: Request, res: Response) {
        const employees = await this.employeeRepository.getAll()
        res.json(employees);
    }

}

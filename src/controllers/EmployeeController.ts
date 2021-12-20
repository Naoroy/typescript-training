import { Controller } from "../decorators/controller"
import { Get } from "../decorators/route"
import { Response, Request } from "express"
import { EmployeeRepository } from "../models/repositories/employeeRepository"
import { Employee } from "../models/types/employee"
import {Repository} from "../models/repositories/repository"


@Controller()
class EmployeeController {
    private readonly employeeRepository: Repository<Employee>

    constructor() {
        this.employeeRepository = new EmployeeRepository()
    }

    @Get()
    async getAll(req: Request, res: Response) {
        const employee = await this.employeeRepository.getAll()
        res.json(employee);
    }

}

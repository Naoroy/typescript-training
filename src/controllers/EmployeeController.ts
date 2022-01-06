import { Keys } from "./../keys"
import { Inject } from "./../decorators/inject"
import { Controller } from "../decorators/controller"
import { Get, Post } from "../decorators/route"
import { Response, Request } from "express"
import { Employee } from "../models/types/employee"
import { EmployeeRepository } from "./../models/repositories/employeeRepository"

@Controller()
class EmployeeController {
    private readonly employeeRepository: EmployeeRepository

    constructor(
        @Inject(Keys.employeeRepository)
        employeeRepository: EmployeeRepository
    ) {
        this.employeeRepository = employeeRepository
    }

    @Get()
    async getAll(req: Request, res: Response) {
        const employees = await this.employeeRepository.getAll()
        res.json(employees);
    }

    @Post()
    async post(request: Request, response: Response) {
        console.log(request.body)
        if(this.isEmployee(request.body)) {
            if (this.isValid(request.body)) {
                const exists = await this.employeeRepository.exists(
                    request.body.email
                )

                if(!exists) {
                    await this.employeeRepository.insert(request.body)
                    response.sendStatus(200)
                } else {
                    response.status(400).json({
                        message: "Email already exists"
                    })
                }
            } else {
                response.status(400).json({
                    message: "Employee data validation failed"
                })
            }
        } else {
            response.status(400).json({
                message: "Request body is not an Employee"
            })
        }
    }

    private isEmployee(value: any): value is Employee {
        return (
            value.firstName &&
            value.lastName &&
            value.email
        )
    }

    private isValid(employee: Employee) {
        return (
            employee.firstName.length &&
            employee.lastName.length &&
            /^[0-9a-z._-]+@{1}[0-9a-z.-]{2,}[.]{1}[a-z]{2,5}$/
                .test(employee.email)
        )
    }
}

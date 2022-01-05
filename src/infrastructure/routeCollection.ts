import { Router } from "express"

type HttpVerb = "get" | "post"
type ctor = new (...args: any[]) => any

interface ControllerInformation {
    controllerName: string
    ctor: ctor
    prefix: string
}

interface ActionInformation {
    controllerName: string
    methodName: string
    httpVerb: HttpVerb
    path: string
}


class RouteCollection {
    private controllerInformations: ControllerInformation[]
    private actionInformations: ActionInformation[]

    constructor() {
        this.controllerInformations = []
        this.actionInformations = []
    }

    registerController(ctor: ctor, prefix: string) {
        this.controllerInformations.push({
            controllerName: ctor.name,
            ctor,
            prefix
        })
    }

    registerAction(
        controllerName: string,
        methodName: string,
        httpVerb: HttpVerb,
        path?: string
    ) {
        this.actionInformations.push({
            controllerName,
            methodName,
            httpVerb,
            path: path || ""
        })
    }

    setupRouter(router: Router) {
        this.controllerInformations.forEach(c => {
            const controller = new c.ctor()
            const actions = this.actionInformations
                .filter(a => a.controllerName === c.controllerName)

            actions.forEach(a => {
                const action = controller[a.methodName].bind(controller)
                const route = `/${c.prefix}/${a.path}`
                router[a.httpVerb](route, action)
            })

        })
    }
}
const routeCollection = new RouteCollection()

export { routeCollection, HttpVerb }

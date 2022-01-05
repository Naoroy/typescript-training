const INJECTION_METATDATA_KEY = "injections"

const Inject = (key: Symbol) => {
    const decorator: ParameterDecorator = (
        target: Object,
        property: string | symbol,
        parameterIndex: number
    ) => {
        const injections = Reflect.getOwnMetadata(INJECTION_METATDATA_KEY, target) || {}
        injections[parameterIndex] = key
    }
    return decorator
}

export { Inject, INJECTION_METATDATA_KEY }

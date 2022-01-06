const INJECTION_METADATA_KEY = "injections"

const Inject = (key: Symbol) => {
    const decorator: ParameterDecorator = (
        target: Object,
        propertyKey: string | symbol,
        parameterIndex: number
    ) => {
        const injections = Reflect
            .getOwnMetadata(INJECTION_METADATA_KEY, target) || {}
        injections[parameterIndex] = key
        Reflect.defineMetadata(INJECTION_METADATA_KEY, injections, target)
    }
    return decorator
}

export { Inject, INJECTION_METADATA_KEY }

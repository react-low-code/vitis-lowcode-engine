export interface RegisteredSetter {

}

export interface SettersSpec {
    getSetter(name: string): RegisteredSetter | undefined
    getAll(): Map<string, RegisteredSetter>
    register(name: string, setter: RegisteredSetter): void
}
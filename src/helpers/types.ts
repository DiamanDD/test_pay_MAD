export type InferActionTypes<T> = T extends {
    [keys: string]: (...args: any[]) => infer U
}
    ? U
    : never

export type ErrorAppType = StringOrNullType | undefined
export type StringOrNullType = string | null
export type NumberOrNullType = number | null

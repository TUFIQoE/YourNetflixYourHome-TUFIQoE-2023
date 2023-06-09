import { T_STARTUP_FORM } from "../types";



export interface I_SET_STARTUP_FORM_ACTION {
    readonly type: 'SET_STARTUP_FORM'
    key: keyof T_STARTUP_FORM
    payload: any
}

export type T_STARTUP_FORM_ACTIONS = I_SET_STARTUP_FORM_ACTION
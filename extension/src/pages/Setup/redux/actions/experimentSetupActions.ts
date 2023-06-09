import { T_EXPERIMENT_SETUP } from "../types"


export interface I_SET_EXPERIMENT_SETUP_ACTION {
    readonly type: 'SET_EXPERIMENT_SETUP'
    key: keyof T_EXPERIMENT_SETUP
    payload: any
}

export type T_EXPERIMENT_SETUP_ACTIONS = I_SET_EXPERIMENT_SETUP_ACTION
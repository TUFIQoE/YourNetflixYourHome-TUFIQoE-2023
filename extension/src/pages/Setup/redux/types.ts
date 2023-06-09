import { T_EXPERIMENT_SETTINGS } from "../../../config/storage.config"

interface I_EXPERIMENMT_SETUP {
    seeding: boolean
    urls: string[]
    config_valid: boolean
    mapping_available: boolean
    experiment_start_available: boolean
}

interface I_INDEX_SIGNATURE {
    [key: string]: any // <-- index signature
}

interface I_STARTUP_FORM {
    device_id: T_EXPERIMENT_SETTINGS["device_id"]
    subject_id: T_EXPERIMENT_SETTINGS["subject_id"]
    session_type: T_EXPERIMENT_SETTINGS["session_type"]
    subject_age: T_EXPERIMENT_SETTINGS["subject_age"]
    subject_sex: T_EXPERIMENT_SETTINGS["subject_sex"]
    subject_netflix_familiarity: T_EXPERIMENT_SETTINGS["subject_netflix_familiarity"]
    subject_selected_content: T_EXPERIMENT_SETTINGS["subject_selected_content"]
    content_continuation: T_EXPERIMENT_SETTINGS["content_continuation"]
}


export type T_STARTUP_FORM = I_STARTUP_FORM | I_INDEX_SIGNATURE
export type T_EXPERIMENT_SETUP = I_EXPERIMENMT_SETUP | I_INDEX_SIGNATURE 
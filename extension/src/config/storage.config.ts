import { T_VIDEO } from "./types/data-structures.type"

export type T_EXPERIMENT_SETTINGS = {
    stats_record_interval_ms: number
    stats_nonclickable: boolean
    stats_invisible: boolean

    bitrate_interval_ms: number
    assessment_interval_ms: number

    config_seeding: boolean 

    videos: Array<T_VIDEO>
    urls: Array<string>

    device_id: "" | 106 | 107
    session_type : "" | "alone" | "together"

    subject_id: "" | number
    subject_age : "" | number
    subject_sex : "" | "male" | "female" | "undisclosed"
    subject_netflix_familiarity : "" | boolean
    subject_selected_content: "" | boolean
    content_continuation : "" | boolean
}


export type T_EXPERIMENT_VARIABLES = {
    database_experiment_id: number,
    database_video_id: number,
    extension_running : boolean,
    extension_mode: string,
    video_index: number
}

export type T_STORAGE = {
    experiment_settings: T_EXPERIMENT_SETTINGS,
    experiment_variables: T_EXPERIMENT_VARIABLES
}

export const STORAGE_DEFAULT : T_STORAGE = {
    experiment_settings: {
        stats_record_interval_ms: 1 * 1000, // default 1s=1000ms
        stats_nonclickable: true,
        stats_invisible: false,
        bitrate_interval_ms: 1.5 * 60 * 1000, // default 2.5min=150sec=150*1000; changed to 1.5 in
        assessment_interval_ms: 2.5 * 60 * 1000, // default 2.5min=150sec=150*1000
        
        config_seeding: false,

        urls: ["https://www.netflix.com/watch/80114856?trackId=267603888"],
        videos: [],

        device_id: 106,
        session_type: "",
        subject_id: "",
        subject_sex: "",
        subject_age: "",
        subject_netflix_familiarity: "",
        subject_selected_content: "",
        content_continuation: "",
    },
    experiment_variables: {
        database_experiment_id: -1,
        database_video_id: -1,
       
        extension_running: false,
        extension_mode: "", // main or mapping
        video_index: 0
    }
}
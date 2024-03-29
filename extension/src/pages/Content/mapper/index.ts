import { VMAF_TEMPLATE } from "../../../config/vmaf-template.config"
import { ChromeStorage } from "../../../utils/custom/ChromeStorage"
import { extract_duration } from "../../../utils/debug_menu_analysis"
import { NetflixDebugMenu } from "../../../utils/netflix/NetflixDebugMenu"
import { NetflixPlayerAPI } from "../../../utils/netflix/NetflixPlayerAPI"
import { wait_for_video_to_load } from "../../../utils/waiters/wait_for_video_to_load"
import Mapper from "./modules/Mapper"

import {prng_alea} from "esm-seedrandom"


const init = async () => {
    inject_netflix_controls_script()
    await wait_for_video_to_load()
    NetflixPlayerAPI.seek(0)

    const video = document.getElementsByTagName("video")[0]
    video.style.visibility = "hidden"

    const debug_menu = await NetflixDebugMenu.get_html_element()
    const video_duration = Math.round(Number(extract_duration(debug_menu.value)))
    let templates: Array<Array<number>> | undefined = undefined;

    // Define vmaf template based on video length
    if(video_duration < 30*60){
        console.log("Selecting 20")
        templates = VMAF_TEMPLATE[20]
    }
    else if(video_duration >= 30*60 && video_duration < 40*60 ){
        console.log("Selecting 30")
        templates = VMAF_TEMPLATE[30]
    }
    else if(video_duration >= 40*60 && video_duration < 60*60){
        console.log("Selecting 40")
        templates = VMAF_TEMPLATE[40]
    }
    else if(video_duration >= 60*60){
        console.log("Selecting 60")
        templates = VMAF_TEMPLATE[60]
    }

    if(templates === undefined){
        window.alert("Error. Template not found.")
        return
    }

    // Choose random VMAF template
    const {config_seeding} = await ChromeStorage.get_experiment_settings()
    const {subject_id} = await ChromeStorage.get_experiment_settings()
    let vmaf_template : Array<number>

    if(config_seeding){
        const seeded_rng = prng_alea(subject_id.toString())
        vmaf_template = templates[Math.floor(seeded_rng()*templates.length)]
    }
    else{
        vmaf_template = templates[Math.floor(Math.random()*templates.length)]
    }
    console.log(vmaf_template)
    

    const settings = await ChromeStorage.get_experiment_settings()
    const variables = await ChromeStorage.get_experiment_variables()

    settings.videos.push({
        url: settings.urls[variables.video_index],
        vmaf_template_scenario: vmaf_template 
    })
    await ChromeStorage.update_experiment_settings_property("videos", settings.videos)

    const mapper = new Mapper()
    await mapper.init()
}

const inject_netflix_controls_script = () => {
    const s = document.createElement("script")
    s.src = chrome.runtime.getURL("netflixControls.bundle.js");

    (document.head || document.documentElement).appendChild(s);
    s.remove()
}

init()





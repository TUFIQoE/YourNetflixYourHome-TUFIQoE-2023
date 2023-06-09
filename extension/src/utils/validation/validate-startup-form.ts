import Joi from "joi"
import { ChromeStorage } from "../custom/ChromeStorage"

export const validateStartupForm = async () : Promise<boolean> => {
    const settings = await ChromeStorage.get_experiment_settings()
    if(settings.session_type === "alone"){
        const obj = {
            device_id: settings.device_id,
            session_type: settings.session_type,
            subject_id: settings.subject_id,

            subject_sex: settings.subject_sex,
            subject_age: settings.subject_age,
            subject_selected_content: settings.subject_selected_content,
            subject_netflix_familiarity: settings.subject_netflix_familiarity,
            content_continuation: settings.content_continuation
        }
        const schema = Joi.object({
            device_id: Joi.number().allow().required(),
            session_type: Joi.string().allow("alone", "together").required(),
            subject_id: Joi.number().required(),
            
            subject_age: Joi.number().required(),
            subject_sex: Joi.string().allow("male", "female", "undisclosed").required(),
            subject_selected_content: Joi.boolean().required(),
            subject_netflix_familiarity: Joi.boolean().required(),
            content_continuation: Joi.boolean().required()
        })
    
        const {error} = schema.validate(obj)
        if(error){
            console.log(error)
            return false
        }else{
            return true
        }
    }
    else{
        const obj = {
            device_id: settings.device_id,
            session_type: settings.session_type,
            subject_id: settings.subject_id
        }
        const schema = Joi.object({
            device_id: Joi.number().allow().required(),
            session_type: Joi.string().required(),
            subject_id: Joi.number().required(),
        })
    
        const {error} = schema.validate(obj)
        if(error){
            console.log(error)
            return false
        }else{
            return true
        }
    }
}
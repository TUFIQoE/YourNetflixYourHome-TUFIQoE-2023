import Joi from "joi"
import { ChromeStorage } from "../custom/ChromeStorage"

export const validateStartupForm = async () : Promise<boolean> => {
    const settings = await ChromeStorage.get_experiment_settings()
    const obj = {
        subject_id: settings.subject_id,

        subject_sex: settings.subject_sex,
        subject_age: settings.subject_age,
        subject_netflix_familiarity: settings.subject_netflix_familiarity,
        content_continuation: settings.content_continuation
    }
    const schema = Joi.object({
        subject_id: Joi.number().required(),

        subject_age: Joi.number().required(),
        subject_sex: Joi.string().allow("male", "female", "undisclosed").required(),
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
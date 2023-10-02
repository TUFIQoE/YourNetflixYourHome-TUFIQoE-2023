import Joi from "joi"
import {sha256} from "js-sha256";
import { ChromeStorage } from "../custom/ChromeStorage"
import {secret_words} from "./secret-words";

export const validateStartupForm = async () : Promise<boolean> => {
    const settings = await ChromeStorage.get_experiment_settings()
    const obj = {
        subject_id: sha256(settings.secret_word),

        subject_sex: settings.subject_sex,
        subject_age: settings.subject_age,
        subject_netflix_familiarity: settings.subject_netflix_familiarity,
        content_continuation: settings.content_continuation
    }

    const schema = Joi.object({
        subject_id: Joi.any().valid(...secret_words).required(),

        subject_age: Joi.number().required(),
        subject_sex: Joi.string().allow("male", "female", "undisclosed").required(),
        subject_netflix_familiarity: Joi.boolean().required(),
        content_continuation: Joi.boolean().required()
    })

    const {error} = schema.validate(obj)
    return !error;
}
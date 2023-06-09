import Joi from "joi"
import { T_VIDEO } from "../../config/types/data-structures.type"

export const validateExperimentConfig = (videos : Array<T_VIDEO>) : boolean => {
    const configSchema = Joi.array().items(Joi.object({
        url: Joi.string().pattern(/https:\/\/www.netflix.com\/watch\/[0-9]+.+/m).required(),
        vmaf_template_scenario: Joi.array().min(1).items(Joi.number()).required(),
        bitrate_vmaf_map: Joi.array().items(Joi.object({
            vmaf: Joi.number().required(),
            bitrate: Joi.number().required()
        })).required(),
        scenario: Joi.array().items(Joi.object({
            bitrate: Joi.number().required(),
            vmaf: Joi.number().required(),
            vmaf_diff: Joi.number().required(),
            vmaf_template: Joi.number().required()
        })).required()
    })).min(1).required()
    
    const {error} = configSchema.validate(videos)
    if(error){
        return false
    }else{
        return true
    }
}
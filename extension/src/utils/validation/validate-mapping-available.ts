import Joi from "joi"

export const validateMappingAvailable = (urls : Array<string>) : boolean => {
    const schema = Joi.array().items(Joi.string().pattern(/https:\/\/www.netflix.com\/watch\/[0-9]+.+/m).required())
    
    const {error} = schema.validate(urls)
    if(error){
        return false
    }else{
        return true
    }
}
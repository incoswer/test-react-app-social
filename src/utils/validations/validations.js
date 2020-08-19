export const required = value =>{
    if(value) return undefined;
    return 'Field is required'
}

export const maxLengthCreator =(lengths) => value =>{
    if(value.length>=lengths) return (`Max length is ${lengths} symbols`);
    return undefined
}
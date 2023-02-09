export default function MatrixValidate(values){
    const errors = {};

    if(!values.matrix){
        errors.matrix = 'Required';
    } else if(!/[0-9\\[\\]]/.test(values.matrix)){
        errors.matrix = 'Invalid matrix';
    } 

    if(!values.target){
        errors.target = 'Required';
    } 

    return errors;
}
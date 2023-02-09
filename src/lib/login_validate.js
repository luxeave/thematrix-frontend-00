export default function LoginValidate(values){
    const errors = {};

    if(!values.email){
        errors.email = 'Required'
    } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)){
        errors.email = 'Invalid email address'
    }

    if(!values.password){
        errors.password = 'Required';
    } else if(values.password.length < 8 || values.password.length>20){
        errors.password = 'must 8-20 characters long';
    } else if(values.password.includes(' ')){
        errors.password = 'Invalid password';
    }

    return errors;
}
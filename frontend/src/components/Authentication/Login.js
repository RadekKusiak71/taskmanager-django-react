import React, { useState } from 'react'
import FormBox from '../UI/FormBox'
import Card from '../UI/Card'
import Input from '../UI/Input'
import Button from '../UI/Button'



const Login = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })
    const [formErrors, setFormErrors] = useState({
        username: '',
        password: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const validateForm = () => {
        let errors = {}
        let isValid = true;

        if (formData.username.trim() === '') {
            errors.username = 'Username is required';
            isValid = false;
        }
        if (formData.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
            isValid = false;
        }
        setFormErrors(errors);
        return isValid;
    }
    const submitHandler = (e) => {
        e.preventDefault()
        if (validateForm()) {
            console.log('Registration successful');
        }
    }


    return (
        <Card>
            <FormBox form-text={'You dont have an account yet? Sign up for free...'} path={'/register'} onSubmit={submitHandler}>
                <Input onChange={handleChange} type='text' id='username' name='username' placeholder='Username' value={formData.username} />
                {formErrors.username && (
                    <div className='error-message'>{formErrors.username}</div>
                )}
                <Input onChange={handleChange} type='password' id='password' name='password' placeholder='Password' value={formData.password} />
                {formErrors.password && (
                    <div className='error-message'>{formErrors.password}</div>
                )}
                <Button type={'submit'}>Login</Button>
            </FormBox>
        </Card>
    )
}

export default Login
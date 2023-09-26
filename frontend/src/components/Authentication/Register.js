import React, { useState } from 'react';
import Card from '../UI/Card';
import FormBox from '../UI/FormBox';
import Input from '../UI/Input';
import Button from '../UI/Button';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        firstname: '',
        lastname: '',
        password: '',
        passwordConfirm: '',
    });

    const [formErrors, setFormErrors] = useState({
        username: '',
        firstname: '',
        lastname: '',
        password: '',
        passwordConfirm: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validateForm = () => {
        let errors = {};
        let isValid = true;

        // Validation rules (you can customize these)
        if (formData.username.trim() === '') {
            errors.username = 'Username is required';
            isValid = false;
        }

        if (formData.firstname.trim() === '') {
            errors.firstname = 'First name is required';
            isValid = false;
        }

        if (formData.lastname.trim() === '') {
            errors.lastname = 'Last name is required';
            isValid = false;
        }

        if (formData.password.length < 6) {
            errors.password = 'Password must be at least 6 characters';
            isValid = false;
        }

        if (formData.password !== formData.passwordConfirm) {
            errors.passwordConfirm = 'Passwords do not match';
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    };

    const submitHandler = (e) => {
        e.preventDefault();

        if (validateForm()) {
            console.log('Registration successful');
            //api call
        }
    };

    return (
        <Card>
            <FormBox
                form-text={'You have an account already? Login'}
                path={'/login'}
                onSubmit={submitHandler}
            >
                <Input
                    onChange={handleChange}
                    type='text'
                    id='username'
                    name='username'
                    placeholder='Username'
                    value={formData.username}
                />
                {formErrors.username && (
                    <div className='error-message'>{formErrors.username}</div>
                )}

                <Input
                    onChange={handleChange}
                    type='text'
                    id='first_name'
                    name='firstname'
                    placeholder='First name'
                    value={formData.firstname}
                />
                {formErrors.firstname && (
                    <div className='error-message'>{formErrors.firstname}</div>
                )}

                <Input
                    onChange={handleChange}
                    type='text'
                    id='last_name'
                    name='lastname'
                    placeholder='Last name'
                    value={formData.lastname}
                />
                {formErrors.lastname && (
                    <div className='error-message'>{formErrors.lastname}</div>
                )}

                <Input
                    onChange={handleChange}
                    type='password'
                    id='password'
                    name='password'
                    placeholder='Password'
                    value={formData.password}
                />
                {formErrors.password && (
                    <div className='error-message'>{formErrors.password}</div>
                )}

                <Input
                    onChange={handleChange}
                    type='password'
                    id='password_confirm'
                    name='passwordConfirm'
                    placeholder='Re-type password'
                    value={formData.passwordConfirm}
                />
                {formErrors.passwordConfirm && (
                    <div className='error-message'>{formErrors.passwordConfirm}</div>
                )}

                <Button type={'submit'}>Register</Button>
            </FormBox>
        </Card>
    );
};

export default Register;

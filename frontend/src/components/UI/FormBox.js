import React from 'react'
import classes from './FormBox.module.css'
import { NavLink } from 'react-router-dom'

const FormBox = (props) => {
  return (
    <form className={classes.form}>
      <div className={classes['form-title']}>
        <h1>TASKMANAGER</h1>
      </div>
      <div className={classes['inputs-container']}>
        {props.children}
      </div>
      <NavLink to='/register' className={classes['form-text']}>
        {props['form-text']}
      </NavLink>
    </form>
  )
}

export default FormBox
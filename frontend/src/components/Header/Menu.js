import React from 'react'
import { NavLink } from 'react-router-dom'
import classes from './Menu.module.css'

const Menu = () => {
  return (
    <nav className={classes.menu}> 
      <NavLink to='/'>Dashboard</NavLink>
      <NavLink to='/completed'>Completed</NavLink>
      <NavLink to='/uncompleted'>Uncompleted</NavLink>
      <NavLink to='/create-task'>Create Task</NavLink>
      <NavLink to='/tasks'>Tasks</NavLink>
      <NavLink to='/logout'>Logout</NavLink>
      <NavLink to='/login'>Login</NavLink>
      <NavLink to='/register'>Register</NavLink>
    </nav>
  )
}

export default Menu
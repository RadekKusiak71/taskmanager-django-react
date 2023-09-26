import React from 'react'
import classes from './Input.module.css'

const Input = (props) => {
  return (
    <input
      className={classes.input}
        onChange={props.onChange}
        type={props.type}
        id={props.id}
        name={props.name}
        placeholder={props.placeholder}
    >
        {props.children}
    </input>
  )
}

export default Input
import React from 'react'
import classes from './Input.module.css'

const Input = (props) => {
  return (
    <input
        onChange={props.onChange}
        type={props.type}
        id={props.id}
        name={props.name}
    >
        {props.children}
    </input>
  )
}

export default Input
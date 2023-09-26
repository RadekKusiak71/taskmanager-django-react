import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Header from './components/Header/Header'
import Login from './components/Authentication/Login'
import Register from './components/Authentication/Register'
import Tasks from './components/Tasks/Task'
import Task from "./components/Tasks/Task";
import TasksCompleted from "./components/Tasks/TasksCompleted";
import TaskUncompleted from "./components/Tasks/TasksUncompleted";
function App() {
  return (
    <BrowserRouter>
      <div className='main-container'>
        <Header />
        <Routes>
          <Route path='/' element={Tasks}/>
          <Route path='/task' element={Task}/>
          <Route path='/tasks/completed' element={TasksCompleted}/>
          <Route path='/tasks/uncompleted' element={TaskUncompleted}/>
          <Route path='login' element={Login}/>
          <Route path='register' element={Register}/>
          <Route/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

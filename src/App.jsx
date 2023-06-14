import React from "react";
import {AiOutlinePlus} from "react-icons/ai";
import { useState, useEffect } from "react";
import TodoList from "./todo";
import {db} from "./firebase.js";
import { query, collection, onSnapshot, updateDoc, doc, addDoc, deleteDoc} from "firebase/firestore";

const style={
  bg: `h-screen w-screen p-4 bg-center bg-cover bg-bg-img`, 
  container: `bg-slate-100 max-w-[600px] w-full m-auto rounded-2xl shadow-xl`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl ml-2 rounded-2xl`,
  button: `border p-4 ml-2 mr-2 bg-[#bd784d] rounded-2xl text-white`,
  count: `text-center p-2`,
  info: `flex justify-between m-2 mr-16 ml-10`
}

function App() {
  const [task,settask]=useState([]);
  const [input,setInput]=useState('');

  useEffect(() => {
    const q=query(collection(db,'todos')); // q holds the path to the database
    const unsubscribe=onSnapshot(q, (querySnapshot)=>{ //takes snapshot of the database to render out
      let dataArr=[]
      querySnapshot.forEach((doc)=>{
        dataArr.push({...doc.data(), id: doc.id})
      })
      settask(dataArr);
    })
    return ()=>unsubscribe()
  }, [])
  
  const createTask=async (e)=>{
    e.preventDefault(e) //prevents webpage from reloading when we submit the form
    setInput('');
    if(input!=='')
    {
      await addDoc(collection(db, 'todos'),{
        text: input,
        completed: false,
        // priority: 'No priority',
        // deadline: Date.now()
      })
    }
  }

  //Update check in firebase
  const toggleCheck=async (task)=>{
    await updateDoc(doc(db,'todos', task.id),{
      completed: !task.completed,
    })
  }

  const deleteTask=async (task)=>{
    await deleteDoc(doc(db,'todos',task.id))
  }
  
  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>Todo List</h3>
        
        <form className={style.form} onSubmit={createTask}>
          <input className={style.input} type="text" placeholder="type something..." value={input} onChange={(e)=>setInput(e.target.value)}/>
          <button className={style.button}><AiOutlinePlus size={30}/></button>
        </form>
        <div className={style.info}>
          <h5>tasks</h5>
          <h5>priority</h5>
          <h5>deadline</h5>
        </div>
        <ul>
          {task.map((e,index)=>(
            <TodoList key={index} task={e} toggleCheck={toggleCheck} deleteTask={deleteTask}/>
          ))}
        </ul>
        <p className={style.count}>{task.length} tasks</p>
      </div>
    </div>
  );
}

export default App;

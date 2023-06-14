import React, { useState } from 'react';
import {FaRegTrashAlt} from 'react-icons/fa';

const style={
    col: `flex justify-between bg-slate-200 p-4 my-2 m-2 capitalize rounded-2xl`,
    row: `flex`,
    text: `ml-2 cursor-pointer`,
    text_complete: `ml-2 cursor-pointer line-through`,
    button: `cursor-pointer`,
    buttons: `justify-items-end`,
    select: `rounded-xl text-center mr-16`,
    input: `rounded-xl text-center mr-2`,
}

const TodoList = (props) => {
  return(
    <>
    <li className={style.col}>
        <div className={style.row}>
            <input type="checkbox" checked={props.task.completed?'checked':''} onChange={()=>props.toggleCheck(props.task)}/>
            <p className={props.task.completed?style.text_complete:style.text} onClick={()=>props.toggleCheck(props.task)}>{props.task.text}</p>
        </div>

        <div className={style.buttons}>
            <select className={style.select}
                //value={props.task.priority}
                >
                <option value="">No priority</option>
                <option value="low">Low priority</option>
                <option value="medium">Medium priority</option>
                <option value="high">High priority</option>
            </select>
            <input className={style.input}
            type='date'
                //value={props.task.deadline}
            />
            <button onClick={()=>props.deleteTask(props.task)}>{<FaRegTrashAlt/>}</button>
        </div>
    </li>
    </>
  )
}

export default TodoList;

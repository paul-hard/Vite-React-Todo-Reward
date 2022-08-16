import { useState, useEffect } from "react";
import Toggle from './Toggle'

export default function Form() {

    //creat todos, getting user type from input
    const [userInput, setUserInput] = useState("")
    // state todos get value from onSubmit, then this value trigger tigger useEffect, which send todos to localStorage, then i take data beck from local storage and save into todos
    const [todos, setTodos] = useState(() => {
        return JSON.parse(localStorage.getItem("todos"))
    }
    );
    const [rewards, setRewards] = useState(() => {
        return JSON.parse(localStorage.getItem("rewards"))
    }
    );
    const [isChecked, setIsChecked] = useState(null);

    //manage not itarable issue and null, also issue with array ressetting to empty array.
    if (!rewards) {
        setRewards([])
    }
    if (!todos) {
        setTodos([])
    }
    //take and save user input into state
    const handleInputChange = (e) => {
        setUserInput(e.target.value);

    }

    //save user input onto array in immutable way, onSubmit - this action will triger useEffect, because of [todos] dependency
    const handleFormSubmit = (e) => {
        e.preventDefault()
        if (isChecked) {
            setRewards([...rewards, {
                input: userInput,
                isTaken: false,
            }])
        } else {
            setTodos([...todos, {
                input: userInput,
                isDone: false,
            }])
        }
        setUserInput("");
    }

    //save todos into local storage, action start when todos state change
    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));

    }, [todos]);
    useEffect(() => {
        localStorage.setItem("rewards", JSON.stringify(rewards));

    }, [rewards])

    //Handle toogle change, make able to write rewards
    const handleCheckboxChange = () => {
        setIsChecked(true)
        if (isChecked === true) {
            setIsChecked(null)
        }
    }

    // Remove items from the list
    const handleDeleteTodoClick = (e) => {
        const removeTodo = todos.filter(todo => todo.input != e)
        setTodos(removeTodo)
    }
    const handleDeleteRewardClick = (e) => {
        const removeReward = rewards.filter(reward => reward.input != e)
        setRewards(removeReward)
    }

    //done and take button logic, text became line-through
    const handleDoneClick = (e) => {
        const doneStatus = todos.map(todo => {
            if (todo.input === e && todo.isDone === false) {
                return { ...todo, isDone: true }
            } else if (todo.input === e && todo.isDone === true) {
                return { ...todo, isDone: false }
            }
            return todo
        })
        setTodos(doneStatus)
    }
    const handleTakeClick = (e) => {
        const takeStatus = rewards.map(reward => {
            if (reward.input === e && reward.isTaken === false) {
                return { ...reward, isTaken: true }
            } else if (reward.input === e && reward.isTaken === true) {
                return { ...reward, isTaken: false }
            }
            return reward
        })
        setRewards(takeStatus)
    }

    return (
        <>
            <form id="form" onSubmit={handleFormSubmit}>
                <input className="input" type="text" value={userInput} onChange={handleInputChange} placeholder={isChecked ? "Reward yourself" : "What todo?"}></input>
                <input className="btn-submit" type="submit" value={isChecked ? "Add reward" : "Add todo"} disabled={userInput ? false : true} />
            </form>
            <div className="toggle-btn"><Toggle onCheckboxChange={handleCheckboxChange} /></div>
            <div className="flex-wrapper">
                <div>Todo's:{todos && todos.map((todo, i) => <span key={i}><p className={todo.isDone ? "done" : "undone"}>{todo.input}</p> <input className="btn-done" checked={todo.isDone} type="checkbox" onChange={() => handleDoneClick(todo.input)} /><button className="btn-remove" onClick={() => handleDeleteTodoClick(todo.input)}></button></span>)} </div>
                <div>Reward's:{rewards && rewards.map((reward, i) => <span key={i}><p className={reward.isTaken ? "done" : "undone"}>{reward.input}</p> <input className="btn-done" checked={reward.isTaken} type="checkbox" onChange={() => handleTakeClick(reward.input)} /><button className="btn-remove" onClick={() => handleDeleteRewardClick(reward.input)}></button></span>)}</div>
            </div>

        </>
    )
}   
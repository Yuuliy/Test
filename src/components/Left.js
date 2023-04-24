import { useContext, useRef } from "react";
import { TaskContext } from "../App";


export default function Left() {


    const { tasks, setTasks, checkedTasks, setCheckedTasks } = useContext(TaskContext);

    const nameRef = useRef();
    const descRef = useRef();
    const dateRef = useRef();
    const priorityRef = useRef();

    const check = (param) => {
        return param === '' ? false : true;
    }

    const handleAdd = () => {
        const name = nameRef.current.value;
        const desc = descRef.current.value;
        const date = dateRef.current.value;
        const priority = priorityRef.current.value;

        const due = new Date(date);
        const today = new Date();

        if (!check(name)) {
            alert('Name is required');
            nameRef.current.focus();
            return;
        } else if (due < today) {
            alert('Date is invalid');
            dateRef.current.focus();
            return;
        } else {
            const id = tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1;

            const newTasks = [...tasks, {
                id: id,
                name: name,
                description: desc,
                date: date,
                priority: priority,
            }]
            setTasks(newTasks)

            localStorage.setItem('tasks', JSON.stringify(newTasks))
        }
    }

    return (
        <>
            <div className='title'>
                New Task
            </div>

            <div className='body'>
                <div className='input-group'>
                    <input type='text' id='newTask' placeholder='Add New Task...' className='' ref={nameRef} />
                </div>

                <div>
                    <label htmlFor='description' style={{ marginLeft: '2rem' }}>Descriptions</label>
                    <div className='input-group'>
                        <textarea placeholder='Add Description...' id='description' ref={descRef} />
                    </div>


                </div>

                <div className='group'>
                    <div className='w-40 mr-4'>
                        <label htmlFor='description'>Due Date</label>
                        <input type='date' className='mt-1' defaultValue='2023-04-23' ref={dateRef} />
                    </div>
                    <div className='w-40 ml-4'>
                        <label htmlFor='description'>Priority</label>
                        <select className='mt-1' ref={priorityRef}>
                            <option value='normal'>Normal</option>
                            <option value='high'>High</option>
                            <option value='low'>Low</option>

                        </select>
                    </div>
                </div>
            </div>

            <div className='footer'>
                <button className='btn btn-success' onClick={handleAdd}>Add</button>
            </div>
        </>

    )
}
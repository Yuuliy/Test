import { useContext, useState, useRef } from "react";
import { TaskContext } from "../App";


export default function Right() {

    const { tasks, setTasks, checkedTasks, setCheckedTasks } = useContext(TaskContext);

    const [show, setShow] = useState([0]);

    const taskSortByDate = tasks.sort((a, b) => {
        return new Date(a.due) - new Date(b.due);
    })

    const handleShow = (id) => {
        if (show === id) {
            setShow(0);
        } else {
            setShow(id);
        }
    }


    const handleRemove = (id) => {
        const index = tasks.findIndex(task => task.id === id);
        tasks.splice(index, 1);
        setTasks([...tasks]);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    const handleCheck = (id) => {
        const exits = checkedTasks.find(task => task === id);

        if (exits) {
            const index = checkedTasks.findIndex(task => task === id);
            checkedTasks.splice(index, 1);
            setCheckedTasks([...checkedTasks]);
            return;
        } else {
            setCheckedTasks([...checkedTasks, id]);
        }
    }

    const handleDeleteChecked = () => {
        const newTasks = tasks.filter(task => !checkedTasks.includes(task.id));
        console.log(newTasks);
        setTasks(newTasks);
        localStorage.setItem('tasks', JSON.stringify(newTasks));
        setCheckedTasks([]);

    }

    const updateName = useRef();
    const updateDes = useRef();
    const updateDate = useRef();
    const updatePri = useRef();
    const inputSearch = useRef();

    const check = (param) => {
        return param === '' ? false : true;
    }
    const handleUpdate = (id) => {
        const index = tasks.findIndex(task => task.id === id);
        const name = updateName.current.value;
        const desc = updateDes.current.value;
        const date = updateDate.current.value;
        const priority = updatePri.current.value;

        const due = new Date(date);
        const today = new Date();

        if (!check(name)) {
            alert('Name is required');
            updateName.current.focus();
            return;
        } else if (due< today) {
            alert('Date is invalid');
            updateDate.current.focus();
            return;
        } else {
            tasks[index].name = name;
            tasks[index].description = desc;
            tasks[index].date = date;
            tasks[index].priority = priority;

            setTasks([...tasks]);
            localStorage.setItem('tasks', JSON.stringify(tasks));
            setShow(0);
        }

    }

    const handleSearch = () => {
        //search trong localStorage
        const search = inputSearch.current.value;
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        const newTasks = tasks.filter(task => task.name.toLowerCase().includes(search.toLowerCase()));
        setTasks(newTasks);
        
    }

    const isChecked = (id) => {
        const exits = checkedTasks.find(task => task === id);
        return exits ? true : false;
    }

    return (
        <div className=''>
            <div className='title'>
                ToDo List
            </div>

             <div className='body  '>{/*p-relative */}
                <div>
                    <div className='input-group'>
                        <input type='search' id='search' placeholder='Search...' onChange={()=>handleSearch()} ref={inputSearch}/>
                    </div>
                </div>

                <div className='group '>
                    <div className="list">
                        {
                            taskSortByDate.map((task, index) => {
                                return (
                                    <>
                                        <div key={index} className="item">
                                            <input type='checkbox' onClick={() => handleCheck(task.id)} checked={isChecked(task.id)}/>
                                            {task.name}
                                            <span style={{ float: 'right' }}>

                                                <span className='btn btn-info' onClick={() => handleShow(task.id)}>Details</span>
                                                <span className='btn btn-danger' onClick={() => handleRemove(task.id)}>Remove</span>
                                            </span>
                                        </div>

                                        {show === task.id && (
                                            <>
                                                <div className='body'>
                                                    <div className='input-group'>
                                                        <input type='text' id='newTask' placeholder='Add New Task...' className='' defaultValue={task.name} ref={updateName} />
                                                    </div>

                                                    <div>
                                                        <label htmlFor='description' style={{ marginLeft: '2rem' }}>Descriptions</label>
                                                        <div className='input-group'>
                                                            <textarea placeholder='Add Description...' defaultValue={task.description} ref={updateDes} />
                                                        </div>
                                                    </div>

                                                    <div className='group'>
                                                        <div className='w-40 mr-4'>
                                                            <label htmlFor='description'>Due Date</label>
                                                            <input type='date' className='mt-1' defaultValue={task.due} ref={updateDate} />
                                                        </div>
                                                        <div className='w-40 ml-4'>
                                                            <label htmlFor='description'>Priority</label>
                                                            <select className='mt-1' defaultValue={task.priority} ref={updatePri}>
                                                                <option value='normal' >Normal</option>
                                                                <option value='high'>High</option>
                                                                <option value='low' >Low</option>

                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='footer'>
                                                    <button className='btn btn-success' onClick={() => handleUpdate(task.id)}>Update</button>
                                                </div>
                                            </>
                                        )
                                        }
                                    </>
                                )
                            })
                        }
                    </div>


                </div>

                {
                    checkedTasks.length > 0 && checkedTasks[0] != 0 && (
                        <div className='footer bg'>
                            <div>
                                Bulk Actions:
                            </div>

                            <div>
                                <span className='btn btn-info'>Done</span>
                                <span className='btn btn-danger' onClick={handleDeleteChecked}>Remove</span>
                            </div>
                        </div>
                    )
                }

            </div>


        </div>
    )
}
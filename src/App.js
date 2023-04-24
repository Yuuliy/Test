import './App.css';
import Left from './components/Left';
import Right from './components/Right';
import { createContext, useEffect, useState } from 'react';
import data from './data.json';

export const TaskContext = createContext();

function App() {

	const [tasks, setTasks] = useState([]);

	const [checkedTasks, setCheckedTasks] = useState([]);
	useEffect(() => {
		setTasks(data);
		localStorage.setItem('tasks', JSON.stringify(data))
	}, []);

	useEffect(() => {
		const tasks = JSON.parse(localStorage.getItem('tasks'))
		setTasks(tasks)
	}, []);

	return (
		<TaskContext.Provider value={{ tasks, setTasks, checkedTasks, setCheckedTasks }}>
			<div className='container-fluid'>
				<div className='row'>
					<div className='card'>
						<Left />
					</div>
					<div className='card ov'>
						<Right />
					</div>
				</div>
			</div>

		</TaskContext.Provider>

	);
}

export default App;

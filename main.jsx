function App() {
	const [todos, setTodos] = React.useState([
		{ task: 'Задача 1', status: 'Todo', priority: 'High' },
		{ task: 'Задача 2', status: 'Todo', priority: 'High' },
		{ task: 'Задача 3', status: 'Todo', priority: 'High' },
		{ task: 'Задача 4', status: 'Todo', priority: 'Low' },
		{ task: 'Задача 5', status: 'Todo', priority: 'Low' }
	]);

	const addTodo = text => {
		const newTodos = [...todos, text];
		setTodos(newTodos);
	};

	const completeTodo = (item, need) => {
		todos[todos.indexOf(item, 0)].status = need;
	};

	const removeTodo = item => {
		const newTodos = [...todos];
		newTodos.splice(todos.indexOf(item, 0), 1);
		setTodos(newTodos);
	};


	return (
		<div>
			<div className="high__inner" id="high__content">
				<CreateText className="text__hight" text="HIGH" />
				<CreateHighForm classNameForm="form__high" idNameInput="form__high"
					classNameInput="input__place-high" classNameButton="add__btn" addTodo={addTodo} />
				<ListOfTasks PRIORITY='High' list={todos} completeTodo={completeTodo} removeTodo={removeTodo} />
			</div>

			<div className="low__inner" id="low__content">
				<CreateText className="text__low" text="LOW" />
				<CreateLowForm classNameForm="form__low" idNameInput="form__low"
					classNameInput="input__place-low" classNameButton="add__btn" addTodo={addTodo} />
				<ListOfTasks PRIORITY='Low' list={todos} completeTodo={completeTodo} removeTodo={removeTodo} />
			</div>
		</div>
	)
}


function CreateText(props) {
	return (
		<div className={props.className}>
			{props.text}
		</div>
	)
}


function CreateHighForm(props) {
	const [text, setText] = React.useState('');

	const toArray = e => {
		if (text.length < 3) {
			e.currentTarget.firstElementChild.classList.add('empty');
			e.preventDefault();
		} else {
			e.currentTarget.firstElementChild.classList.remove('empty');
			props.addTodo({ task: text, status: 'Todo', priority: 'High' });
			setText('');
			e.preventDefault();
		}
	}

	return (
		<form className={props.classNameForm} onSubmit={toArray}>
			<input id={props.idNameInput} value={text} className={props.classNameInput}
				type="text" placeholder="Добавить важные дела" onChange={(event) => { setText(event.target.value) }} />
			<button className={props.classNameButton} type="submit" />
		</form>
	)
}


function CreateLowForm(props) {
	const [text, setText] = React.useState('');

	const toArray = e => {
		if (text.length < 3) {
			e.currentTarget.firstElementChild.classList.add('empty');
			e.preventDefault();
		} else {
			e.currentTarget.firstElementChild.classList.remove('empty');
			props.addTodo({ task: text, status: 'Todo', priority: 'Low' });
			setText('');
			e.preventDefault();
		}
	}

	return (
		<form className={props.classNameForm} onSubmit={toArray}>
			<input id={props.idNameInput} value={text} className={props.classNameInput}
				type="text" placeholder="Добавить дела" onChange={(event) => { setText(event.target.value) }} />
			<button className={props.classNameButton} type="submit" />
		</form>
	)
}


function ListOfTasks(props) {
	const list = [];
	props.list.forEach((item) => {
		if (item.priority === props.PRIORITY) list.push(item);
	});

	return (
		list.map((item, index) =>
			<CreateTaskElement item={item} key={index} completeTodo={props.completeTodo} removeTodo={props.removeTodo} />)
	)
}


function CreateTaskElement(props) {

	const checkBoxChecked = item => {
		if (item.currentTarget.checked) {
			item.currentTarget.parentElement.parentElement.classList.add('done');
			props.completeTodo(props.item, 'Done');
		} else if (!item.currentTarget.checked) {
			item.currentTarget.parentElement.parentElement.classList.remove('done');
			props.completeTodo(props.item, 'Todo');
		}
	};


	return (
		<li key={props.index} className="new__task">
			<label className="label">
				<input className="checkbox" type="checkbox" onChange={checkBoxChecked} />
				<span className="fake"></span>
				<span className="text">{props.item.task}</span>
			</label>
			<button className="close__btn" onClick={() => { props.removeTodo(props.item) }}></button>
		</li>
	)
}


ReactDOM.render(
	<App />,
	document.getElementById('container')
);
import React from 'react'
import { connect } from 'react-redux'

import { addTodo, fetchTodo, markTodo } from './actions'
import ToDosList from './ToDosList'
import ToDosDone from './ToDosDone'


class ToDosContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            inputVal: ''
        },
        this.onTextChange = this.onTextChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onItemDone = this.onItemDone.bind(this);
    }

    componentDidMount() {
        this.getFetch()
    }

    getFetch() {
        fetch('http://localhost:2000/todos').then((data) => {
            return data.json()
        }).then((todos) => {
            this.props.fetchTodo(todos)
        })
    }

    onTextChange(ev) {
        this.setState({ inputVal: ev.target.value })
    }

    onClick(ev) {
        this.props.addTodo(this.state.inputVal)
        this.setState({ newTodoVal: '' })
    }

    onItemDone(id) {
        let refToDo = this.props.todos;
        let newTodos = refToDo.map(function (item) {
            if (item.id === id) {
                if (item.done === false) {
                    item.done = true;
                }
                else {
                    item.done = false;
                }
            }
            return item
        });
        this.props.markTodo(newTodos)
    }

    render() {
        return (
            <div>
                <input type="text" value={this.state.inputVal} id="todoVal" onChange={this.onTextChange} />
                <button className="button-secondary pure-button" onClick={this.onClick}>Add Todo</button>
                <ToDosList todos={this.props.todos} onItemDone={this.onItemDone} />
                <h1>Done:</h1>
                <ToDosDone todos={this.props.todos} onItemDone={this.onItemDone} />
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        todos: state.todos
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addTodo: value => dispatch(addTodo(value)),
        fetchTodo: value => dispatch(fetchTodo(value)),
        markTodo: value => dispatch(markTodo(value))
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(ToDosContainer);
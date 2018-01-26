import React from 'react'
import { connect } from 'react-redux'

import { addTodo, fetchTodo, markTodo, deleteTodo } from './actions'
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
        this.onItemDelete = this.onItemDelete.bind(this);
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
        this.setState({ inputVal: '' })
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

    onItemDelete(id) {
        console.log(id)
        let cont = 0
        let posDelete = 0
        this.props.todos.map(function (item) {
            if (item.id === id) {
                posDelete = cont
            }
            cont++
        })
        this.props.deleteTodo(posDelete)
    }

    render() {
        return (
            <div>
                <input type="text" value={this.state.inputVal} id="todoVal" onChange={this.onTextChange} />
                <button className="button-secondary pure-button" onClick={this.onClick}>Add Todo</button>
                <ToDosList todos={this.props.todos} onItemDone={this.onItemDone} onItemDelete={this.onItemDelete} />
                <h1>Done:</h1>
                <ToDosDone todos={this.props.todos} onItemDone={this.onItemDone} onItemDelete={this.onItemDelete} />
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
        markTodo: value => dispatch(markTodo(value)),
        deleteTodo: id => dispatch(deleteTodo(id))
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(ToDosContainer);
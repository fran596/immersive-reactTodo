import React from 'react'
import ToDosList from './ToDosList'
import ToDosDone from './ToDosDone'
import uuid from 'uuid'

class ToDosContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            inputVal: ''
        },
        this.onTextChange = this.onTextChange.bind(this);
        this.onClick = this.onClick.bind(this);
        this.onItemDone = this.onItemDone.bind(this);
    }

    componentDidMount(){
        fetch('http://localhost:2000/todos').then((data) => {
            //console.log(data)
            return data.json()
          }).then((todos) => {
            //console.log(todos)
            this.setState({ todos: todos })
          })
    }

    onTextChange(ev) {
        this.setState({ inputVal: ev.target.value })
    }

    onClick(ev) {
        let newTodo = {
            id: uuid(),
            value: this.state.inputVal,
            done: false
        }
        this.setState({ todos: [...this.state.todos, newTodo] })
    }

    onItemDone(id) {
        let refToDo = this.state.todos;
        refToDo.map(function (item) {
            if (item.id === id) {
                if (item.done == false) {
                    item.done = true;
                }
                else {
                    item.done = false;
                }
            }
        });
        this.setState({ todos: [...this.state.todos] })

        //console.log(id);
    }

    render() {
        return (
            <div>
                <input type="text" id="todoVal" onChange={this.onTextChange} />
                <button className="button-secondary pure-button" onClick={this.onClick}>Add Todo</button>
                <ToDosList todos={this.state.todos} onItemDone={this.onItemDone} />
                <h1>Done:</h1>
                <ToDosDone todos={this.state.todos} onItemDone={this.onItemDone} />
            </div>
        );
    }
}

export default ToDosContainer;
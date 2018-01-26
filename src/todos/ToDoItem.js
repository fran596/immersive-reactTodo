import React from 'react'
import PropTypes from 'prop-types'

class ToDoItem extends React.Component {

    render() {
        return (
            <div>
                <li>{this.props.todo.value} 
                <span> <input type="checkbox" onChange={()=>this.props.onItemDone(this.props.todo.id)} /></span>
                <span> <button onClick={()=>this.props.onItemDelete(this.props.todo.id)} >Delete</button> </span>
                </li> 
            </div>
        );
    }
}

ToDoItem.propTypes = {
    todos: PropTypes.array,
    onItemDone: PropTypes.func
}

ToDoItem.defaultProps = {
    todos: [],
    onItemDone: () => {}
}

export default ToDoItem;
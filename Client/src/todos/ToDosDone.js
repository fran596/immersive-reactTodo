import React from 'react'
import ToDoItem from './ToDoItem'
import PropTypes from 'prop-types'

class ToDosDone extends React.Component {

    render() {
        var props = this.props
        return (
            <ul>
                {
                    props.todos.map(function (item) {
                        if (item.done === true) {
                            return < ToDoItem key={item.id} todo={item} onItemDone={props.onItemDone} onItemDelete={props.onItemDelete} />
                        }
                    })
                }
            </ul>
        );
    }
}

ToDosDone.propTypes = {
    todos: PropTypes.array,
    onItemDone: PropTypes.func
}

ToDosDone.defaultProps = {
    todos: [],
    onItemDone: () => {}
}

export default ToDosDone;
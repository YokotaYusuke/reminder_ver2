import {useEffect, useState} from 'react'
import ReminderRepository from './repository/ReminderRepository.ts'

export default function App(
    props: { todoRepository: ReminderRepository }
) {

    const {
        draftTodo,
        setDraftTodo,
        todoList,
        onClickSaveButton,
    } = useApp(props.todoRepository)

    return (
        <>
            <label>
                <input value={draftTodo} type="text" onChange={e => setDraftTodo(e.target.value)}/>
                新規TODO
            </label>
            <button onClick={onClickSaveButton}>保存</button>
            <div role="todoList">
                {todoList.map(todo => (
                    <div key={todo}>{todo}</div>
                ))}
            </div>
        </>
    )
}

function useApp(todoRepository: ReminderRepository) {
    const [draftTodo, setDraftTodo] = useState<string>('')
    const [todoList, setTodoList] = useState<string[]>([])

    const onClickSaveButton = () => {
        setTodoList([...todoList, draftTodo])
        setDraftTodo('')
        todoRepository.saveTodo(draftTodo)
    }

    useEffect(() => {
        todoRepository.getTodo()
            .then(todo => setTodoList(todo))
    }, [])

    return {
        draftTodo,
        setDraftTodo,
        todoList,
        onClickSaveButton,
    }
}
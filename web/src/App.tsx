import {useState} from 'react'

export interface TodoRepository {
    saveTodo(todo: string): void
}

function App(
    props: {todoRepository: TodoRepository}
) {
    const [draftTodo, setDraftTodo] = useState<string>('')
    const [todoList, setTodoList] = useState<string[]>([])

    const onClickSaveButton = () => {
        setTodoList([...todoList,draftTodo])
        setDraftTodo('')
        props.todoRepository.saveTodo(draftTodo)
    }

    return (
        <>
            <label>
                <input value={draftTodo} type="text" onChange={e => setDraftTodo(e.target.value)}/>
                新規TODO
            </label>
            <button onClick={onClickSaveButton}>保存</button>
            <div role='todoList'>
                {todoList.map(todo => (
                    <div key={todo}>{todo}</div>
                ))}
            </div>
        </>
    )
}

export default App

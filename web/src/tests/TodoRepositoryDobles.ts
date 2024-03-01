import {TodoRepository} from '../App.tsx'

export class SpyTodoRepository implements TodoRepository {
    saveTodo_argument_todo: string | null = null

    saveTodo(todo: string) {
        this.saveTodo_argument_todo = todo
    }
}

export class DummyTodoRepository implements TodoRepository {
    saveTodo() {
    }
}
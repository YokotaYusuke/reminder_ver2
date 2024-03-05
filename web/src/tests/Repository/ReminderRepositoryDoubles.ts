import ReminderRepository from '../../repository/ReminderRepository.ts'

export class SpyReminderRepository implements ReminderRepository {
    saveReminder_argument_title: string | null = null
    getTodo_wasCalled: boolean = false

    saveTodo(todo: string) {
        this.saveReminder_argument_title = todo
    }

    getTodo(): Promise<string[]> {
        this.getTodo_wasCalled = true
        return Promise.resolve([])
    }
}

export class StubReminderRepository implements ReminderRepository{
    getReminder_return_value: Promise<string[]> = Promise.resolve([])

    saveTodo() {
    }

    getTodo(): Promise<string[]> {
        return this.getReminder_return_value
    }
}

export class DummyReminderRepository implements ReminderRepository {
    saveTodo() {
    }

    getTodo(): Promise<string[]> {
        return Promise.resolve([])
    }
}
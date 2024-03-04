import {ReminderRepository} from '../../App.tsx'

export class SpyReminderRepository implements ReminderRepository {
    saveReminder_argument_title: string | null = null

    saveTodo(title: string) {
        this.saveReminder_argument_title = title
    }
}

export class DummyReminderRepository implements ReminderRepository {
    saveTodo() {
    }
}
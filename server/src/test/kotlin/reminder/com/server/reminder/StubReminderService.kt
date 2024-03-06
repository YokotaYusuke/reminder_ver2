package reminder.com.server.reminder

class StubReminderService: ReminderService {
    var getTodo_returnValue: List<String> = emptyList()
    override fun saveTodo(todo: String) {

    }

    override fun getTodo(): List<String> {
        return getTodo_returnValue
    }
}
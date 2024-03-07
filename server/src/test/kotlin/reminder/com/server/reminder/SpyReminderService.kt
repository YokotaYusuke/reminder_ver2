package reminder.com.server.reminder

class SpyReminderService: ReminderService {
    var saveTodo_argment_title: String? = null
    var getTodo_wasCalled: Boolean = false
    override fun saveTodo(todo: String) {
        saveTodo_argment_title = todo
    }

    override fun getTodo(): List<String> {
        getTodo_wasCalled = true
        return listOf()
    }
}
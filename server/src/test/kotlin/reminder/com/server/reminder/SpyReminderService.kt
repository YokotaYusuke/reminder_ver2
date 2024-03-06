package reminder.com.server.reminder

class SpyReminderService: ReminderService {
    var saveTodo_argment_title: String? = null
    override fun saveTodo(todo: String) {
        saveTodo_argment_title = todo
    }

    override fun getTodo(): List<String> {
        return listOf()
    }
}
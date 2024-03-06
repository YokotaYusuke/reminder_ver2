package reminder.com.server.reminder

import org.springframework.stereotype.Service

interface ReminderService {
    fun saveTodo(todo: String)
    fun getTodo(): List<String>
}

@Service
class DefaultReminderService():ReminderService {
    override fun saveTodo(todo: String) {
    }

    override fun getTodo(): List<String> {
        return listOf()
    }
}

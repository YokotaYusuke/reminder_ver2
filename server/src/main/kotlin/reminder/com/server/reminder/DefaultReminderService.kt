package reminder.com.server.reminder

import org.springframework.stereotype.Service
import reminder.com.server.reminder.entity.ReminderRecord

interface ReminderService {
    fun saveTodo(todo: String)
    fun getTodo(): List<String>
}

@Service
class DefaultReminderService(
        private val reminderRepository: DefaultReminderRepository
):ReminderService {
    override fun saveTodo(todo: String) {
        reminderRepository.save(ReminderRecord(todo = todo))
    }

    override fun getTodo(): List<String> {
        return reminderRepository.findAll().map { it.todo }
    }
}

package reminder.com.server.reminder

import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Test
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest
import reminder.com.server.reminder.entity.ReminderRecord

@DataJpaTest
class DefalutReminderServiceTest {
    @Autowired
    private lateinit var reminderRepository: DefaultReminderRepository
    private lateinit var reminderService: ReminderService

    @Test
    fun `returns all reminders that repository returns`() {
        reminderRepository.saveAll(listOf(
                ReminderRecord(todo = "todo1"),
                ReminderRecord(todo = "todo2"),
        ))
        reminderService = DefaultReminderService(reminderRepository)


        val reminders = reminderService.getTodo()


        assertEquals(2, reminders.count())
        assertEquals("todo1", reminders.first())
        assertEquals("todo2", reminders.last())
    }

    @Test
    fun `saves received toto in the database`() {
        reminderService = DefaultReminderService(reminderRepository)


        reminderService.saveTodo("todo1")
        reminderService.saveTodo("todo2")


        assertEquals(2, reminderRepository.count())
        assertEquals("todo1", reminderRepository.findAll().first().todo)
        assertEquals("todo2", reminderRepository.findAll().last().todo)
    }
}
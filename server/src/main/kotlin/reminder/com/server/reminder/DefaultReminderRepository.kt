package reminder.com.server.reminder

import jakarta.transaction.Transactional
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import reminder.com.server.reminder.entity.ReminderRecord

@Repository
@Transactional
interface DefaultReminderRepository: JpaRepository<ReminderRecord, String> {
}
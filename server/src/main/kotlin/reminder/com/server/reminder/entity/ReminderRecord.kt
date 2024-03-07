package reminder.com.server.reminder.entity

import jakarta.persistence.*
import java.util.UUID

@Entity
@Table(name = "reminder")
class ReminderRecord(
        @Id
        @GeneratedValue(strategy = GenerationType.UUID)
        val id: UUID = UUID.randomUUID(),
        val todo: String,
)

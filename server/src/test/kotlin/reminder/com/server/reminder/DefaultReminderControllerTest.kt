package reminder.com.server.reminder

import org.hamcrest.Matchers.equalTo
import org.junit.jupiter.api.Assertions.assertEquals
import org.junit.jupiter.api.Assertions.assertTrue
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Test
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import org.springframework.test.web.servlet.result.MockMvcResultMatchers.status
import org.springframework.test.web.servlet.setup.MockMvcBuilders.standaloneSetup

@SpringBootTest
@AutoConfigureMockMvc
class DefaultReminderControllerTest {

    private lateinit var spyReminderService: SpyReminderService
    private lateinit var stubReminderService: StubReminderService

    @Nested
    inner class Get {
        @Test
        fun `calls ReminderService getTodo correctly`() {
            spyReminderService = SpyReminderService()


            val reminderController = DefaultReminderController(spyReminderService)
            standaloneSetup(reminderController)
                    .build()
                    .perform(get("/api/reminder"))


            assertTrue(spyReminderService.getTodo_wasCalled)
        }

        @Test
        fun `returns the reminder to ReminderService getTodo`() {
            stubReminderService = StubReminderService()
            stubReminderService.getTodo_returnValue = listOf(
                    "todo1",
                    "todo2",
            )


            val reminderController = DefaultReminderController(stubReminderService)
            val result = standaloneSetup(reminderController)
                    .build()
                    .perform(get("/api/reminder"))


            result
                    .andExpect(status().isOk)
                    .andExpect(jsonPath("$[0]", equalTo("todo1")))
                    .andExpect(jsonPath("$[1]", equalTo("todo2")))
        }
    }

    @Nested
    inner class Post {
        @Test
        fun `pass the correct TODO to ReminderService postTodo method`() {
            spyReminderService = SpyReminderService()


            val defaultReminderController = DefaultReminderController(spyReminderService)
            val result = standaloneSetup(defaultReminderController)
                    .build()
                    .perform(
                            post("/api/reminder")
                                    .content("hoge")
                                    .contentType(MediaType.TEXT_PLAIN)
                    )


            result.andExpect(status().isCreated)
            assertEquals("hoge", spyReminderService.saveTodo_argment_title)
        }

    }

}
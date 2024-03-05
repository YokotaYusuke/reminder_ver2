import SpyHttp from '../http/SpyHttp.ts'
import {DefaultReminderRepository} from '../../repository/ReminderRepository.ts'
import {expect} from 'vitest'
import {StubHttp} from '../http/StubHttp.ts'



describe('reminderRepository', () => {
    describe('saveTodo', () => {
        test('Httpに正しいリクエストを渡す', () => {
            const spyHttp = new SpyHttp()
            const repository = new DefaultReminderRepository(spyHttp)


            repository.saveTodo('hello,world')


            expect(spyHttp.save_argument_url).toEqual('/api/reminder')
            expect(spyHttp.save_argument_body).toEqual('hello,world')
        })
    })

    describe('getTodo', () => {
        test('Httpに正しいリクエストを渡す', () => {
            const spyHttp = new SpyHttp()
            const repository = new DefaultReminderRepository(spyHttp)


            repository.getTodo()


            expect(spyHttp.save_argument_url).toEqual('/api/reminder')
        })

        test('Httpの返り値をキャストして返す', async () => {
            const stubHttp = new StubHttp()
            stubHttp.get_returnValue = Promise.resolve(['hoge', 'huga'])
            const repository = new DefaultReminderRepository(stubHttp)


            const reminders = await repository.getTodo()


            expect(reminders).toEqual(['hoge', 'huga'])
        })
    })
})
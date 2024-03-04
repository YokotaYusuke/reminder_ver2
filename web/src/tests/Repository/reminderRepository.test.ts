import SpyHttp from '../http/SpyHttp.ts'
import {DefaultReminderRepository} from '../../repository/ReminderRepository.ts'
import {expect} from 'vitest'

describe('reminderRepository', () => {

    describe('saveReminder', () => {
        test('Httpに正しいリクエストを渡す', () => {
            const spyHttp = new SpyHttp()
            const repository = new DefaultReminderRepository(spyHttp)


            repository.saveReminder('hello,world')


            expect(spyHttp.save_argument_url).toEqual('/api/reminder')
            expect(spyHttp.save_argument_body).toEqual('hello,world')
        })
    })
})
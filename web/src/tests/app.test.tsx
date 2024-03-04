import {render, screen, within} from '@testing-library/react'
import App from '../App.tsx'
import {expect, test} from 'vitest'
import userEvent from '@testing-library/user-event'
import {DummyReminderRepository, SpyReminderRepository} from './Repository/ReminderRepositoryDoubles.ts'


describe('App', () => {
    test('TODOを入力するインプットがある', () => {
        const dummyReminderRepository = new DummyReminderRepository()
        render(<App todoRepository={dummyReminderRepository}/>)


        expect(screen.getByLabelText('新規TODO')).toBeInTheDocument()
    })

    test('TODOを保存するボタンがある', () => {
        const dummyReminderRepository = new DummyReminderRepository()
        render(<App todoRepository={dummyReminderRepository}/>)


        expect(screen.getByText('保存')).toBeInTheDocument()
    })

    test('テキストを入力して保存ボタンを押すとTODOListエリアにTODOが追加される', async () => {
        const dummyReminderRepository = new DummyReminderRepository()
        render(<App todoRepository={dummyReminderRepository}/>)


        await userEvent.type(screen.getByLabelText('新規TODO'),'Macを再起動する')
        await userEvent.click(screen.getByText('保存'))


        const todoListArea = screen.getByRole('todoList')
        expect(within(todoListArea).getByText('Macを再起動する')).toBeInTheDocument()
    })

    test('まだ何も保存していない状態のときはTODOListエリアには何も表示されない', ()=> {
        const dummyReminderRepository = new DummyReminderRepository()
        render(<App todoRepository={dummyReminderRepository}/>)


        const todoListArea = screen.getByRole('todoList')
        expect(todoListArea.children.length).toEqual(0)
    })

    test('TODOは複数登録できる', async ()=> {
        const dummyReminderRepository = new DummyReminderRepository()
        render(<App todoRepository={dummyReminderRepository}/>)


        await userEvent.type(screen.getByLabelText('新規TODO'),'OneUpする')
        await userEvent.click(screen.getByText('保存'))
        await userEvent.type(screen.getByLabelText('新規TODO'),'マンマミーヤ')
        await userEvent.click(screen.getByText('保存'))

        const todoListArea = screen.getByRole('todoList')
        expect(within(todoListArea).getByText('OneUpする')).toBeInTheDocument()
        expect(within(todoListArea).getByText('マンマミーヤ')).toBeInTheDocument()
    })

    test('保存ボタンを押したらTODOを保存する', async () => {
        const spyTaskRepository = new SpyReminderRepository()
        render(<App todoRepository={spyTaskRepository}/>)


        await userEvent.type(screen.getByLabelText('新規TODO'),'OneUpする')
        await userEvent.click(screen.getByText('保存'))


        expect(spyTaskRepository.saveReminder_argument_title).toEqual('OneUpする')
    })
})
import {act, render, screen, within} from '@testing-library/react'
import App from '../App.tsx'
import {expect, test} from 'vitest'
import userEvent from '@testing-library/user-event'
import {
    DummyReminderRepository,
    SpyReminderRepository,
    StubReminderRepository
} from './Repository/ReminderRepositoryDoubles.ts'
import ReminderRepository from '../repository/ReminderRepository.ts'


describe('App', () => {
    test('初期レンダリング時にrepositoryが返す', async () => {
        const stubReminderRepository = new StubReminderRepository()
        stubReminderRepository.getReminder_return_value = Promise.resolve(['default reminder'])


        await renderApplication(stubReminderRepository)


        const todoList = screen.getByRole('todoList')
        expect(within(todoList).getByText('default reminder'))
    })

    test('初期レンダリング時にgetTodoを呼ぶ', async () => {
        const spyReminderRepository = new SpyReminderRepository()


        await renderApplication(spyReminderRepository)


        expect(spyReminderRepository.getTodo_wasCalled)
    })

    test('TODOを入力するインプットがある', async () => {
        await renderApplication()


        expect(screen.getByLabelText('新規TODO')).toBeInTheDocument()
    })

    test('TODOを保存するボタンがある', async () => {
        await renderApplication()


        expect(screen.getByText('保存')).toBeInTheDocument()
    })

    test('テキストを入力して保存ボタンを押すとTODOListエリアにTODOが追加される', async () => {
        await renderApplication()


        await userEvent.type(screen.getByLabelText('新規TODO'), 'Macを再起動する')
        await userEvent.click(screen.getByText('保存'))


        const todoListArea = screen.getByRole('todoList')
        expect(within(todoListArea).getByText('Macを再起動する')).toBeInTheDocument()
    })

    test('まだ何も保存していない状態のときはTODOListエリアには何も表示されない', async () => {
        await renderApplication()


        const todoListArea = screen.getByRole('todoList')
        expect(todoListArea.children.length).toEqual(0)
    })

    test('TODOは複数登録できる', async () => {
        await renderApplication()


        await userEvent.type(screen.getByLabelText('新規TODO'), 'OneUpする')
        await userEvent.click(screen.getByText('保存'))
        await userEvent.type(screen.getByLabelText('新規TODO'), 'マンマミーヤ')
        await userEvent.click(screen.getByText('保存'))


        const todoListArea = screen.getByRole('todoList')
        expect(within(todoListArea).getByText('OneUpする')).toBeInTheDocument()
        expect(within(todoListArea).getByText('マンマミーヤ')).toBeInTheDocument()
    })

    test('保存ボタンを押したらTODOを保存する', async () => {
        const spyTaskRepository = new SpyReminderRepository()
        render(<App todoRepository={spyTaskRepository}/>)


        await userEvent.type(screen.getByLabelText('新規TODO'), 'OneUpする')
        await userEvent.click(screen.getByText('保存'))


        expect(spyTaskRepository.saveReminder_argument_title).toEqual('OneUpする')
    })

    async function renderApplication(todoRepository: ReminderRepository = new DummyReminderRepository()) {
        await act(async () => {
            render(<App todoRepository={todoRepository}/>)
        })
    }
})
import NetworkHttp, {Http} from '../http/NetworkHttp.ts'

export default interface ReminderRepository {
    saveTodo(todo: string): void
    getTodo(): Promise<string[]>
}

export class DefaultReminderRepository implements ReminderRepository {
    http:Http
    constructor(http: Http = new NetworkHttp()) {
        this.http = http;
    }

    saveTodo(title: string):void {
        this.http.post('/api/reminder', title)
    }

    async getTodo(): Promise<string[]> {
        return await this.http.get('/api/reminder') as string[]
    }
}
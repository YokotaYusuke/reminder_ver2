import NetworkHttp, {Http} from '../http/NetworkHttp.ts'

export default interface ReminderRepository {
    saveReminder(title: string): void
}

export class DefaultReminderRepository implements ReminderRepository {
    http:Http
    constructor(http: Http = new NetworkHttp()) {
        this.http = http;
    }

    saveReminder(title: string):void {
        this.http.post('/api/reminder', title)
    }
}
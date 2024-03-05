import {Http} from '../../http/NetworkHttp.ts'

export class StubHttp implements Http {
    get_returnValue: Promise<object> = Promise.resolve([])

    post(): void {
    }

    get(_: string): Promise<object> {
        return this.get_returnValue
    }
}
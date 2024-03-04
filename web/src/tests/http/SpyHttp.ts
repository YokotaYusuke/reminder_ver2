import {Http} from '../../http/NetworkHttp.ts'

export default class SpyHttp implements Http {
    save_argument_url?: string
    save_argument_body?: string
    post(url: string, body: string): void {
        this.save_argument_url = url
        this.save_argument_body = body
    }
}
export interface Http {
    post(url: string, body: string): void
}

export default class NetworkHttp implements Http {
    post(url: string, body: string): void {
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain'
            },
            body: body
        })
    }
}
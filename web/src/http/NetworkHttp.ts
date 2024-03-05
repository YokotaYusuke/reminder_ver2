export interface Http {
    post(url: string, body: string): void
    get(url: string): Promise<object>
}

export default class NetworkHttp implements Http {
    async get(url: string): Promise<object> {
        const response = await fetch(url)
        return await response.json()
    }
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
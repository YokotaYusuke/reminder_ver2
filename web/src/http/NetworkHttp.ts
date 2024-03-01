export interface Http {
    get(url: string):Promise<object>
}

export default class NetworkHttp implements Http {
    async get(url: string): Promise<object> {
        const response = await fetch(url)
        return await response.json()
    }
}
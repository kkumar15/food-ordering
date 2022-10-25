export class ReturnObjectGenerator {
    constructor(override = {}) {
        override = (override && typeof override == "object" && !Array.isArray(override)) ? override : {}
        this.status = override.status || 400
        this.message = override.message || ""
        this.data = override.data || []
    }
}

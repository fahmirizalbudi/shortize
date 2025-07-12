class Cached {
    constructor() {
        this.cache = null;
    }

    set(params) {
        this.cache = params;
    }

    get() {
        return this.cache;
    }

    has() {
        return this.cache !== null;
    }

    reset() {
        this.cache = null;
    }
}

export default Cached
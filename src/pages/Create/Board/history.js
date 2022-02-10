export const history = {
    records: [],
    index: 0,
    max: 50,

    record(curImageData) {
        window.records = this.records;
        if (this.index > 0) {
            this.records.splice(0, this.index);
            this.index = 0;
        }
        this.records.unshift(Uint8ClampedArray.of(...curImageData));
        if (this.records.length > this.max) {
            this.records.length = this.max;
        }
    },

    undo() {
        if (!this.records.length) {
            return 0;
        }
        if (this.index >= Math.min(this.max - 1, this.records.length)) {
            return this.records[this.max - 1];
        }

        return this.records[++this.index];
    },

    redo() {
        if (!this.records.length) {
            return 0;
        }
        if (this.index <= 0) {
            return this.records[0];
        }

        return this.records[--this.index];
    }

}

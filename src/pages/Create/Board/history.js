export const history = {
    records: [],
    index: 0,
    max: 50,

    init() {
        this.records.length = 0;
        this.index = 0;
    },

    record(curImageData) {
        if (this.index > 0) {
            this.records.splice(0, this.index);
            this.index = 0;
        }
        this.records.unshift(Uint8ClampedArray.of(...curImageData));
        if (this.records.length > this.max) {
            this.records.length = this.max;
        }
    },

    canUndo() {
        return !(!this.records.length || this.index + 1 >= Math.min(this.max - 1, this.records.length));
    },

    canRedo() {
        return !(!this.records.length || this.index <= 0);
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

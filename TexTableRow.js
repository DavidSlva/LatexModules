"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TexTableRow {
    constructor(cells) {
        this.cells = cells;
    }
    toString() {
        return this.cells.join(" & ") + " \\\\";
    }
}
exports.default = TexTableRow;

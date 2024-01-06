"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const TexTableRow_1 = __importDefault(require("./TexTableRow"));
class TexTable {
    constructor(columnHeaders) {
        this.rows = [];
        this.columnHeaders = columnHeaders;
    }
    addRow(row) {
        this.rows.push(row);
    }
    toString() {
        let tableString = "";
        if (this.columnHeaders) {
            tableString += new TexTableRow_1.default(this.columnHeaders).toString() + "\n";
        }
        this.rows.forEach((row) => {
            tableString += row.toString() + "\n";
        });
        return tableString;
    }
}
exports.default = TexTable;

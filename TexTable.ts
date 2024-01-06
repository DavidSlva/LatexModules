import TexTableRow from "./TexTableRow";

export default class TexTable {
  rows: TexTableRow[];
  columnHeaders?: string[];

  constructor(columnHeaders?: string[]) {
    this.rows = [];
    this.columnHeaders = columnHeaders;
  }

  addRow(row: TexTableRow): void {
    this.rows.push(row);
  }

  toString(): string {
    let tableString = "";
    if (this.columnHeaders) {
      tableString += new TexTableRow(this.columnHeaders).toString() + "\n";
    }
    this.rows.forEach((row) => {
      tableString += row.toString() + "\n";
    });
    return tableString;
  }
}

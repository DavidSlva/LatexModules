export default class TexTableRow {
  cells: string[];

  constructor(cells: string[]) {
    this.cells = cells;
  }

  toString(): string {
    return this.cells.join(" & ") + " \\\\";
  }
}

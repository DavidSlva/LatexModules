import * as fs from "fs";
import latex from "node-latex";
import TexTable from "./TexTable";
import TexMath from "./TextMath";

// Clase principal LatexGenerator
export class LatexGenerator {
  content: string;

  constructor() {
    this.content = "\\documentclass[a4paper]{article}\n\\begin{document}\n";
  }

  addCover(title: string, author: string, date: string): void {
    this.content += `
    \\begin{titlepage}
    \\centering
    \\vspace*{\\fill}
    \\Huge \\textbf{${title}}\\\\[0.5cm]
    \\Large ${author}\\\\[0.5cm]
    \\large ${date}
    \\vspace*{\\fill}
    \\end{titlepage}
    \\newpage
    `;
  }

  addSection(title: string, body: string): void {
    this.content += "\\section{" + title + "}\n" + body + "\n";
  }

  addTable(table: TexTable): void {
    this.content +=
      "\\begin{tabular}{|" +
      "c|".repeat(table.columnHeaders?.length || 2) +
      "}\n";
    this.content += table.toString();
    this.content += "\\end{tabular}\n";
  }

  finishDocument(): void {
    this.content += "\\end{document}";
  }
  addInlineMath(math: string): void {
    this.content += TexMath.inline(math);
  }
  addDisplayMath(math: string): void {
    this.content += TexMath.display(math);
  }

  generatePDF(outputPath: string): void {
    this.finishDocument();
    const input = fs.createReadStream("temp.tex");
    const output = fs.createWriteStream(outputPath);

    fs.writeFileSync("temp.tex", this.content);

    const options = {
      errorLogs: "./logfile.log",
      inputs: "./",
    };

    const pdf = latex(input, options);

    pdf.pipe(output);
    pdf.on("error", (err) => console.error(err));
    pdf.on("finish", () => console.log("PDF generado en " + outputPath));
  }
}

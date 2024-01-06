"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LatexGenerator = void 0;
const fs = __importStar(require("fs"));
const node_latex_1 = __importDefault(require("node-latex"));
const TextMath_1 = __importDefault(require("./TextMath"));
// Clase principal LatexGenerator
class LatexGenerator {
    constructor() {
        this.content = "\\documentclass[a4paper]{article}\n\\begin{document}\n";
    }
    addCover(title, author, date) {
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
    addSection(title, body) {
        this.content += "\\section{" + title + "}\n" + body + "\n";
    }
    addTable(table) {
        var _a;
        this.content +=
            "\\begin{tabular}{|" +
                "c|".repeat(((_a = table.columnHeaders) === null || _a === void 0 ? void 0 : _a.length) || 2) +
                "}\n";
        this.content += table.toString();
        this.content += "\\end{tabular}\n";
    }
    finishDocument() {
        this.content += "\\end{document}";
    }
    addInlineMath(math) {
        this.content += TextMath_1.default.inline(math);
    }
    addDisplayMath(math) {
        this.content += TextMath_1.default.display(math);
    }
    generatePDF(outputPath) {
        this.finishDocument();
        const input = fs.createReadStream("temp.tex");
        const output = fs.createWriteStream(outputPath);
        fs.writeFileSync("temp.tex", this.content);
        const options = {
            errorLogs: "./logfile.log",
            inputs: "./",
        };
        const pdf = (0, node_latex_1.default)(input, options);
        pdf.pipe(output);
        pdf.on("error", (err) => console.error(err));
        pdf.on("finish", () => console.log("PDF generado en " + outputPath));
    }
}
exports.LatexGenerator = LatexGenerator;

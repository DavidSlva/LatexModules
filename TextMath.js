"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TexMath {
    // Función para crear una fórmula matemática en línea
    static inline(formula) {
        return `$${formula}$`;
    }
    // Función para crear una fórmula matemática en su propio párrafo (modo display)
    static display(formula) {
        return `\\[${formula}\\]`;
    }
}
exports.default = TexMath;

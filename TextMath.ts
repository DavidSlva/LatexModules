export default class TexMath {
  // Función para crear una fórmula matemática en línea
  static inline(formula: string): string {
    return `$${formula}$`;
  }

  // Función para crear una fórmula matemática en su propio párrafo (modo display)
  static display(formula: string): string {
    return `\\[${formula}\\]`;
  }
}

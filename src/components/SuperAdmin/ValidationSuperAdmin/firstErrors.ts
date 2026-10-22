import { z } from "zod";

// Primer error de cada campo: { campo: "mensaje" }. Zod devuelve los errores de un campo en el orden
// en que están las reglas, así que el primero es el más importante (igual que el middleware del back)
export const firstErrors = <T>(error: z.ZodError<T>): Partial<Record<keyof T, string>> => {
    const { fieldErrors } = z.flattenError(error);
    const errors: Partial<Record<keyof T, string>> = {};
    for (const [field, messages] of Object.entries(fieldErrors) as [keyof T, string[]][]) {
        if (messages?.length) errors[field] = messages[0];
    }
    return errors;
};

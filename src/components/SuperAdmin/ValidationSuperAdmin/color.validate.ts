import { z } from "zod";
import type { Color } from "@/types";
import { firstErrors } from "./firstErrors";

// Copia de las reglas de Back-DaiTec_dev/src/Schemas/products.schema.ts (colorSchema)
export const colorSchema = z.object({
    name: z
        .string()
        .trim()
        .min(1, "Debe agregar un color")
        .max(100, "El nombre del color es demasiado largo!"),
    availity: z
        .number({ error: "La disponibilidad tiene que ser un número" })
        .min(0, "La disponibilidad no puede ser menor a 0")
        .multipleOf(0.01, "La disponibilidad puede tener hasta dos decimales"),
});

export type ColorErrors = Partial<Record<keyof Color, string>>;

const colorValidate = (color: Color): ColorErrors => {
    const result = colorSchema.safeParse(color);
    return result.success ? {} : firstErrors(result.error);
};

export default colorValidate;

import { z } from "zod";
import type { Source } from "@/types";
import { colorSchema } from "./color.validate";
import { firstErrors } from "./firstErrors";

// Valores del form de producto: los numéricos pueden estar vacíos (null) mientras se completa
export interface ProductForm {
    name: string;
    price: number | null;
    discount: number | null;
    description: string;
    img: string[];
    available: number;
    source: Source | "";
    skinType: string;
    crema: string;
}

export type ProductErrors = Partial<Record<keyof ProductForm, string>>;

// Copia de las reglas de Back-DaiTec_dev/src/Schemas/products.schema.ts (productCreateSchema).
// El orden de las reglas de cada campo es la prioridad del mensaje que se muestra
const productBase = z.object({
    name: z
        .string()
        .trim()
        .min(4, "El nombre del producto debe tener por lo menos 4 letras")
        .max(100, "El nombre del producto es demasiado largo!"),
    price: z
        .number({ error: "Por favor determine un precio" })
        .min(1, "Por favor determine un precio mayor a 0")
        .multipleOf(0.01, "El precio puede tener hasta dos decimales"),
    discount: z
        .number()
        .min(0, "El descuento no puede ser negativo")
        .lt(100, "El descuento no puede ser o superar el %100")
        .multipleOf(0.01, "El descuento puede tener hasta dos decimales")
        .nullable(),
    description: z
        .string()
        .trim()
        .min(10, "Ponga alguna descripción de por lo menos 10 caracteres"),
    img: z.array(z.string()).min(1, "Por favor agregue por lo menos una imagen"),
    available: z
        .number({ error: "La disponibilidad tiene que ser un número" })
        .min(0, "La disponibilidad no puede ser menor a 0")
        .multipleOf(0.01, "La disponibilidad puede tener hasta dos decimales"),
    colors: z.array(colorSchema).optional(),
    source: z.enum(["skincares", "makeups", "generals"], {
        error: "Seleccione el tipo de producto",
    }),
    skinType: z.string(),
    crema: z.string(),
});

// Los skincares necesitan tipo de piel y de crema. `when` hace que se chequee aunque fallen otros campos
const sourceOnly = productBase.pick({ source: true });

export const productFormSchema = productBase
    .refine((p) => p.source !== "skincares" || p.skinType.trim() !== "", {
        path: ["skinType"],
        message: "Seleccione el tipo de piel",
        when: (payload) => sourceOnly.safeParse(payload.value).success,
    })
    .refine((p) => p.source !== "skincares" || p.crema.trim() !== "", {
        path: ["crema"],
        message: "Ponga que tipo de crema es, si hidratante, reparadora, etc.",
        when: (payload) => sourceOnly.safeParse(payload.value).success,
    });

const creteValidate = (product: ProductForm): ProductErrors => {
    const result = productFormSchema.safeParse(product);
    return result.success ? {} : firstErrors(result.error);
};

export default creteValidate;

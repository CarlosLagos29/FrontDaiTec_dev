import { z } from "zod";
import { firstErrors } from "./firstErrors";

export interface ImageErrors {
    currentImg?: string;
}

// Vacío es válido (todavía no se cargó). Si hay algo, tiene que ser una URL https a una imagen
export const imageUrlSchema = z
    .string()
    .trim()
    .refine(
        (url) => url === "" || /^https:\/\//i.test(url),
        "Este campo debe completarse con una URL",
    )
    .refine(
        (url) => url === "" || /\.(jpg|jpeg|png|gif)$/i.test(url),
        "La imagen debe estar en formato .jpg, jpeg, png o gif",
    );

const imageValidate = (currentImage: string): ImageErrors => {
    const result = z.object({ currentImg: imageUrlSchema }).safeParse({ currentImg: currentImage });
    return result.success ? {} : firstErrors(result.error);
};

export default imageValidate;

// Espejo de Back-DaiTec_dev/src/Types/products.types.ts (lo que devuelve la API)

export type Source = "skincares" | "makeups" | "generals";
export type SkinType = "Facial" | "Corporal" | "Facial y Corporal";

export interface Color {
    name: string;
    availity: number;
}

export interface Product {
    _id: string;
    name: string;
    img: string[];
    price: number;
    // available, discount y colors siempre llegan: Mongoose les pone default (0 / 0 / [])
    available: number;
    colors: Color[];
    description: string;
    source: Source;
    discount: number;
    skinType?: SkinType;
    crema?: string;
}

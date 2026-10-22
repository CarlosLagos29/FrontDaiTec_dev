// Espejo de Back-DaiTec_dev/src/Types/promos.types.ts

export interface Promo {
    _id: string;
    name: string;
    url: string;
    // Llega como string ISO en el JSON
    date: string;
}

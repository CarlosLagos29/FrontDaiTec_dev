import axios from "axios";
import { BASE_URL } from "@/api/config";

const deleteCloud = async (img: string) => {
    try {
        if (img.trim() !== "") {
            await axios.delete(`${BASE_URL}images/`, { data: { imageUrl: img } });
        }
    } catch (error) {
        console.error(error);
    }
};

export default deleteCloud;

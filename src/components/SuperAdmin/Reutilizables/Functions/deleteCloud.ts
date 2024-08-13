import axios from "axios";
import { BASE_URL } from '@/GlobalState/store';

const deleteCloud = async (img: string | Array<string>) => {
    try {
        const imgToDelete = img as string;
        
        if(imgToDelete.trim() !== ""){
        await axios.delete(`${BASE_URL}images/`, { data: { imageUrl: imgToDelete } } );
    }
    } catch (error) {
        console.error(error)
    }
};

export default deleteCloud;
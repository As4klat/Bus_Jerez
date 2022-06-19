import axios from "axios";
class LoadLineas {
    async LoadData() {
        let data:any
        try {
            let res = await axios.get(`http://127.0.0.1:3000/api/lineas`);
            data = res.data
        } catch (error) {
            data = error
        }
        return data
    }
}

export const loadLineas = new LoadLineas();




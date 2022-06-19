import axios from "axios";
class LoadParadas {
    async LoadData(id:any) {
        let data:any
        try {
            let res = await axios.get(`http://127.0.0.1:3000/api/paradas?id=${id}`);
            data = res.data
        } catch (error) {
            data = error
        }
        return data
    }
}

export const loadParadas = new LoadParadas();
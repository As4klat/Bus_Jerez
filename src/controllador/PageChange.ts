import axios from "axios";
class PageChange {
    async LoadData(ruta: any) {
        let data:any
        switch(ruta){
            case "lineas": {
                try {
                    let res = await axios.get(`http://127.0.0.1:3000/api/${ruta}`);
                    data = res.data
                } catch (error) {
                    data = error
                }
                break;
            }
            case "paradas": {
                try {
                    let res = await axios.get(`http://127.0.0.1:3000/api/${ruta}`);
                    data = res.data
                } catch (error) {
                    data = error
                }
                break;
            }
            
        }
        return data
    }
}

export const page = new PageChange();

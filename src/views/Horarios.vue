<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button color="primary"></ion-menu-button>
        </ion-buttons>
        <ion-title>{{ name }}</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">{{ name }}</ion-title>
        </ion-toolbar>
      </ion-header>

      <div id="container">
        <ion-grid>
          <ion-row>
            <ion-col size="3">
              <ion-item>
                <ion-label>Lineas</ion-label>
                <ion-select interface="popover" v-model="selectLinea" :selected-text="lineaDefaul" @ionChange="itChangedLinea">
                  <ion-select-option 
                    v-for="(linea,index) in lineasData" 
                    :key="index"
                    :value="linea"
                    >{{ linea }}
                  </ion-select-option>
                </ion-select>
              </ion-item>
            </ion-col>
            <ion-col size="4">
              <ion-item>
                <ion-select interface="popover" :selected-text="tipoDefault" @ionChange="itChangedTipo">
                  <ion-select-option value="Laborales">Laborales</ion-select-option>
                  <ion-select-option value="Sabados y Festivos">Sabados y Festivos</ion-select-option>
                </ion-select>
              </ion-item>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col>
              <ion-item class="contenedorIMG">
                <ion-img :src="getImgUrl(selectLinea)" v-bind:alt="selectLinea"/>
              </ion-item>
            </ion-col>
          </ion-row>
        </ion-grid>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar,IonItem, IonLabel, 
IonList, IonListHeader, IonSelect, IonSelectOption,IonImg,IonThumbnail,IonGrid, IonRow,IonCol } from '@ionic/vue';
import { page } from "../controllador/PageChange"

export default defineComponent({
  name: 'Horarios',
  components: {
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    IonItem, 
    IonLabel, 
    IonList,
    IonListHeader,
    IonSelect,
    IonSelectOption,
    IonImg,
    IonThumbnail,
    IonGrid,
    IonRow,
    IonCol
  },
  data() {
    let name = 'Horarios'
    let result: any
    return {
      name,
      result,
      selectLinea: '',
    };
  },
  setup() {
    const lineas =[]
    for (let i = 1; i <= 18; i++) {
      lineas.push("Linea " + i)
    }

    const lineasData = ref(lineas);
    const lineaDefaul = ref("Linea 1");

    const itChangedLinea = (v: any) => {
      lineaDefaul.value = v.detail.value;
    };
    const tipoDefault = ref("Laborales")
    const itChangedTipo = (v: any) => {
      tipoDefault.value = v.detail.value;
    };

    return {
      itChangedLinea,
      lineasData,
      lineaDefaul,
      itChangedTipo,
      tipoDefault
    }
  },
  async mounted() {
    this.result = await page.LoadData(this.name.toLowerCase())
  },
  methods:{
    getImgUrl(linea:string){
      let arr = linea.split(" ")
      let urlimg = ""
      if(linea === ""){
        linea = "1"
      }else{
        linea = arr[1]
      }
      if(this.tipoDefault==="Laborales"){
        urlimg = "https://www.comujesa.es/fileadmin/Documentos/Autobuses_Urbanos/horario_invierno/LINEA_"+ linea +"_LAB.png"
      }else{
        urlimg = "https://www.comujesa.es/fileadmin/Documentos/Autobuses_Urbanos/horario_invierno/LINEA_"+ linea +"_SAB.png"
      }
       
      return urlimg
    }
  }
  
});
</script>

<style scoped>
img{
  object-fit: cover;
  width:100%;
  height:100%;
}
.contenedorIMG{
  position: relative;
  width:100%;
  height: 100%;
}
#container {
  text-align: center;
  position: absolute;
  left: 0;
  right: 0;
  top: 50;
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;
  color: #8c8c8c;
  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>

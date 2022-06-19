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
                <ion-label>Linea</ion-label>
                <ion-select interface="popover" :selected-text="lineaDefaul.nombre" @ionChange="itChangedLinea">
                  <ion-select-option 
                    v-for="(linea, index) in lineas"
                    :key="index" 
                    :value="linea">
                  {{ linea.nombre }}
                  </ion-select-option>
                </ion-select>
              </ion-item>
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col size="6">
              <ion-item>
                <iframe :src="loadMap(lineaDefaul.nombre)" width="660" height="500"></iframe>
              </ion-item>
            </ion-col>
            <ion-col/>
            <ion-col v-if="paradas" size="4">
              <ion-item>
                <ion-list>
                  <ion-label>{{lineaDefaul.nombrePrimerSentido}}</ion-label>
                  <ion-item 
                  v-for="paradaPS in paradas.paradasPrimerSentido"
                  >{{paradaPS.nombre}}</ion-item>
                </ion-list>
              </ion-item>
              <ion-item>
                <ion-list>
                  <ion-label>{{lineaDefaul.nombreSegundoSentido}}</ion-label>
                  <ion-item 
                  v-for="paradaSS in paradas.paradasSegundoSentido"
                  >{{paradaSS.nombre}}</ion-item>
                </ion-list>
              </ion-item>
            </ion-col>
            <ion-col/>
          </ion-row>
        </ion-grid>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar, IonSelect, IonSelectOption, IonGrid, IonRow, IonCol, IonItem, IonLabel,IonList } from '@ionic/vue';
import { loadLineas } from "../services/lineasService"
import { loadParadas } from "../services/paradasService"

export default defineComponent({
  name: 'Lineas',
  components: {
    IonButtons,
    IonContent,
    IonHeader,
    IonMenuButton,
    IonPage,
    IonTitle,
    IonToolbar,
    IonSelect,
    IonSelectOption,
    IonGrid,
    IonRow,
    IonCol,
    IonItem,
    IonLabel,
    IonList
  },
  data() {
    let name = 'Lineas'
    let lineas: any
    return {
      name,
      lineas
    };
  },
  setup() {
    let paradas = ref<any>()
    paradas.value = {}
    const lineaDefaul = ref<any>('No se ha encontrado lineas');
    const itChangedLinea = async (v: any) => {
      lineaDefaul.value = v.detail.value
      paradas.value = await loadParadas.LoadData(lineaDefaul.value._id)
    };

    return {
      itChangedLinea,
      lineaDefaul,
      paradas
    }
  },
  async mounted() {
    
    this.lineas = await loadLineas.LoadData()
    this.lineaDefaul = this.lineas.find((e:any) => e.nombre === 'Linea 1')
    this.paradas = await loadParadas.LoadData(this.lineas[0]._id)
    
    if (this.lineas.message == 'Network Error') {
      this.lineaDefaul = {nombre: 'No se ha encontrado lineas'}
      this.lineas = [{ nombre: 'No se ha encontrado lineas.' }]
    }
  },
  methods: {

    loadMap(linea: string) {
      let mapsrc: string = ''
      switch (linea) {
        case 'Linea 1':
          mapsrc = 'https://www.google.com/maps/d/embed?mid=1cVe0lNVcBPY5RMtt-wSR3Ltl2hAVXcoo&ehbc=2E312F'
          break;
        case 'Linea 2':
          mapsrc = ''
          break;
        case 'Linea 3':
          mapsrc = 'https://www.google.com/maps/d/embed?mid=10RiaVTScAGNEGWFEnOmEItUqOj07Mu6S&ehbc=2E312F'
          break;
        case 'Linea 4':
          mapsrc = 'https://www.google.com/maps/d/embed?mid=1UinEv9nfbE7SufvwDY26xB_xFPW8hMkj&ehbc=2E312F'
          break;
        case 'Linea 5':
          mapsrc = 'https://www.google.com/maps/d/embed?mid=1WM2Eb5A6mzboa1JLUE2RYEVEOyydhNxE&ehbc=2E312F'
          break;
        case 'Linea 6':
          mapsrc = 'https://www.google.com/maps/d/embed?mid=1XD0AKDskO8J5UtoF4CoUHzG-WAOs_vtn&ehbc=2E312F'
          break;
        case 'Linea 7':
          mapsrc = 'https://www.google.com/maps/d/embed?mid=1NXHqCrUJw6lnfPwSCTxlZ9S22r77yswj&ehbc=2E312F'
          break;
        case 'Linea 8':
          mapsrc = 'https://www.google.com/maps/d/embed?mid=1cutGrSOUtnZPPt7Zi4_XTTitCC93Eng7&ehbc=2E312F'
          break;
        case 'Linea 9':
          mapsrc = 'https://www.google.com/maps/d/embed?mid=1XdgV8TS6Di8WZEBs3zEE1N1r41v577KP&ehbc=2E312F'
          break;
        case 'Linea 10':
          mapsrc = 'https://www.google.com/maps/d/embed?mid=1BfhM_heTK11hS_p0-w7mnOsBHbKA9689&ehbc=2E312F'
          break;
        case 'Linea 11':
          mapsrc = 'https://www.google.com/maps/d/embed?mid=1MM5AjA_T2QvQ_KPtCpAzeYBJdKKeq1RN&ehbc=2E312F'
          break;
        case 'Linea 12':
          mapsrc = 'https://www.google.com/maps/d/embed?mid=1q6qhp2BzfHO3KkpbyWQ9HiKfBk4GnphV&ehbc=2E312F'
          break;
        case 'Linea 13':
          mapsrc = 'https://www.google.com/maps/d/embed?mid=1Dw6yCWMFvfuHhYfbHRaYa3kto2EXtg4t&ehbc=2E312F'
          break;
        case 'Linea 14':
          mapsrc = 'https://www.google.com/maps/d/embed?mid=1ymy26ONtFYyUGLWWFXxEbJCaTyFWRkOD&ehbc=2E312F'
          break;
        case 'Linea 15':
          mapsrc = 'https://www.google.com/maps/d/embed?mid=1yYHNdH321xtKUdg3tC9cUbPDjEjQYDXm&ehbc=2E312F'
          break;
        case 'Linea 16':
          mapsrc = 'https://www.google.com/maps/d/embed?mid=1fywIL7mGQgOW_fF4q9ediwJjKRKZinFv&ehbc=2E312F'
          break;
        case 'Linea 17':
          mapsrc = 'https://www.google.com/maps/d/embed?mid=16xwdmU4EAlTHo7qS-QLG-X6Rr5-uKrVJ&ehbc=2E312F'
          break;
        case 'Linea 18':
          mapsrc = 'https://www.google.com/maps/d/embed?mid=1xJmWZCkgm8nLa6bqBedWNqfNOz9Zosvc&ehbc=2E312F'
          break;
      }
      return mapsrc
    }
  }
});
</script>

<style scoped>
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

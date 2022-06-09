<template>
  <div
    id="map"
    class="map"/>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { Loader } from '@googlemaps/js-api-loader'

const loader = new Loader({
  apiKey: 'AIzaSyC29QfPQV5R8YIA9BPr5ecPQ7hXW78BBdA',
  version: 'weekly',
  libraries: ['places']
})



const map = ref([])

onMounted(async () => {
  await loader
    .load()
    .then(google => {
      map.value = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8
      })
    })
    .catch(error => {
      console.log(error)
    })
    .then(function () {
    // always executed
    })
})
</script>

<style>
  html,
  body,
  #map {
    height: 100%;
    margin: 0;
    padding: 0;
  }
</style>
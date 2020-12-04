<template>
  <div id="app">
    <menuBar />
    <br>
    <div class="container">    
      <router-view />
    </div>
  </div>
</template>
<script>
import menuBar from './components/BarMenu'

export default {
  name: 'App',
  components: {
    menuBar
    }
}
</script>

<style>
#app{
  /* border:1px blue solid; */
}
</style>

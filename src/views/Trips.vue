<template>
<div class="container">
    <header class="jumbotron">
      <h3>
        <strong>Viajes</strong> 
      </h3>
    </header>
    <br>
    <b-form>
      <b-container class="bv-example-row">
        <b-row align-h="between">
          <b-col cols="6" class="bcols">
            <v-md-date-range-picker
              max-year="2020"
              min-year="2021"
              show-year-select
              single-data-picker
            ></v-md-date-range-picker>
          </b-col>
          <b-col cols="2" id="example-1">
            <b-button v-on:click="counter += 1" variant="primary" > Buscar</b-button>
            <!--<p>Se ha hecho clic en el botón de arriba {{ counter }} veces.</p>-->
          </b-col>
        </b-row>
      </b-container>
    </b-form>
     <!--************************************************************+-->
    <br>
     <div>
    <b-table responsive :items="prueba" :fields="fields"></b-table>
  </div>
</div>
</template>
<script>
import userService from '../services/user.service';

export default {
    data() {
      
      return {
        el: '#example-1',
        counter: 0,
        prueba:'',
        items33: [
          {
            heading1: 'table cell', heading2: 'table cell',heading3: 'table cell',heading4: 'table cell',heading5: 'table cell',heading6: 'table cell',heading7: 'table cell',heading8: 'table cell',heading9: 'table cell', heading10: 'table cell', heading11: 'table cell',heading12: 'table cell'
          }, 
        ],
        fields: [
          {
            key: "id",
            label: "id Trip",
          },
          {
            key: "distance",
            label: "Distancia",
          },
          {
            key: "vid",
            label: "id vehi",
          },
          {
            key: "duration",
            label: "Duración",
          }, 
          {
            key: "moving",
            label: "tipo",
          },
          {
            key: "start_time",
            label: "Inicio",
          }
      ],
      items: [{
      id: 0,
      name: "Test 0"
    }, {
      id: 1,
      name: "Test 1"
    }, {
      id: 2,
      name: "Test 2"
    }]
      }
    },
    mounted() {
     
    userService.getTrips().then(
      response => {
        this.prueba = response.data
        console.log('trips: ', response.data);

      },
      
      error => {
        this.content =
          (error.response && error.response.data && error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
   }
}
</script>
<style scoped>

</style>


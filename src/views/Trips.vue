<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        <strong>Viajes</strong>
      </h3>
    </header>
    <br />
    <b-form>
      <b-container class="bv-example-row">
        <b-row align-h="between">
          <b-col cols="6" class="bcols">
            <!--Documentacion data-range-piker: https://ly525.github.io/material-vue-daterange-picker/examples.html#position-->
            <v-md-date-range-picker
              :opens="opens"
              @change="handleChange"
            ></v-md-date-range-picker>
          </b-col>
          <b-col>
            <b-form-select
              v-model="selected"
              :options="options"
              size="sm"
              class="mt-3"
            ></b-form-select>
          </b-col>
          <b-col cols="2" id="example-1">
            <b-button v-on:click="getTest" variant="primary"> Buscar</b-button>
          </b-col>
        </b-row>
      </b-container>
    </b-form>
    <!--************************************************************+-->
    <br />
    <div>
      <!-- <b-table
        responsive
        :items="prueba3"
        :fields="fields"
        :bordered="bordered"
      ></b-table> -->
      <!---------------------------------------------------------------->
      <div>
        <b-tabs content-class="mt-3" small overflow: auto >
          <b-tab v-bind:title="namevcle.name" active v-for="namevcle in this.vehicles" :key="namevcle.id"><p>I'm the first tab </p></b-tab>
        </b-tabs>
      </div>
      <!----------------------------------------------------------------->
      <b-table-simple hover small caption-top responsive :bordered="bordered">
        <caption>
          Viajes y paradas de los vehículos seleccionados:
        </caption>
        <b-thead head-variant="light">
          <b-tr>
            <b-th v-for="item in titles" :key="item.key">
              {{ item.label }}
            </b-th>
          </b-tr>
        </b-thead>
        <tbody>
          <b-tr v-for="items in prueba3" :key="items.id">
            <b-td>{{ items.id }}</b-td>
            <b-td>{{ items.distance }}</b-td>
            <b-td>{{ items.namev }}</b-td>
            <b-td>{{ items.duration }}</b-td>
            <b-td v-bind:style="items.moving ? 'color: green' : 'color: red'">{{
              items.moving ? "viaje" : "parada"
            }}</b-td>
            <b-td>{{ items.start_time }}</b-td>
          </b-tr>
        </tbody>
      </b-table-simple>
      <!----------------------------------------------------------------->
    </div>
    <div class="vld-parent">
      <loading :active.sync="isLoading" :is-full-page="fullPage"></loading>
    </div>
  </div>
</template>
<script>
import userService from "../services/user.service";
//https://momentjs.com/docs/
import moment from "moment";
import axios from "axios";
import authHeader from "../services/auth-header";
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";

export default {
  data() {
    return {
      nameV: 'Hola Michell',
      activeClass: "danger",
      errorClass: "text-primary",
      striped: true,
      bordered: true,
      isLoading: false,
      fullPage: true,
      selected: null,
      options: [
        { value: null, text: "Grupo" },
        { value: "260", text: "Energisur" },
      ],
      opens: "left",
      urlTrips: "",
      values: [],
      el: "#example-1",
      counter: 0,
      //prueba:'',
      //prueba: [{id: prueba.id},{distance: prueba.distance},{vid: prueba.vid},{duration: prueba.duration},{moving:prueba.moving},{start_time:prueba.start_time}],
      vehicles: "",
      prueba: "",
      prueba3: [],
      titles: [
        {
          key: "id",
          label: "id Trip",
        },
        {
          key: "distance",
          label: "Distancia KM",
        },
        { key: "vid", label: "Vehículo" },
        { key: "duration", label: "Duración" },
        {
          key: "moving",
          label: "tipo",
        },
        { key: "start_time", label: "Inicio" },
      ],
    };
  },
  mounted() {
    // userService.getTrips().then(
    //   response => {
    //     //this.prueba = response.data
    //     console.log('trips: ', response.data);
    //   },
    //   error => {
    //     this.content =
    //       (error.response && error.response.data && error.response.data.message) ||
    //       error.message ||
    //       error.toString();
    //   }
    // );
    userService.getVehicles().then(
      (response) => {
        const veh = response.data.data;
        let vehAux = {};
        veh.map((i) => {
          vehAux[i.id] = i;
        });
        this.vehicles = vehAux;
        console.log("vehiculos: ", this.vehicles);
        // for(var j = 0; j < this.vehicles.length; j++){
        //   console.log('id-v: ',this.vehicles[j].id,'Nombre-v: ', this.vehicles[j].name);
        // }
      },
      (error) => {
        this.content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
      }
    );
  },
  components: {
    Loading,
    //template:'<b>template etiqueta</b>'
  },
  methods: {
    handleChange(values) {
      console.log("moment: ", values);
      this.values = values;
      console.log("date format: ", moment(values[0]._d).format());
    },
    getTest: function (urlTrips) {
      this.prueba3 = [];
      this.isLoading = true;
      this.urlTrips = urlTrips;
      //urlTrips = "https://diesel.grupoitsur.com/api/trips" +
      urlTrips =
        "https://pegasus82.peginstances.com//api/trips" +
        "?groups=" +
        this.selected +
        "&from=" +
        moment(this.values[0]._d).format("yyyy-MM-DDTHH:MM:SS") +
        "&to=" +
        moment(this.values[1]).format("yyyy-MM-DDTHH:MM:SS") +
        "&fields=id,vid,aid,groups,distance,mean_speed,duration,moving,start_time&distance=km&time=second&speed=kph";

      console.log("sdasd: ", urlTrips);
      axios.get(urlTrips, { headers: authHeader() }).then((result) => {
        const prueba = result.data;

        // const formatoTiempo = (minutos) => {
        //   if (minutos === null || minutos <= 0) return "NA";

        //   let horas = minutos / 60;

        //   if (horas > 24) {
        //     return Math.floor(horas / 24) + " dias";
        //   }
        //   if (horas < 1) {
        //     return Math.floor(minutos) + " minutos";
        //   }

        //   return Math.floor(horas) + " horas";
        // };
        //https://wesbos.com/template-strings-html
        // const funColor = () => {
        //   let s = '<div id="myDiv">hola</div>';
        //   let htmlObject = document.createElement("div");
        //   htmlObject.innerHTML = s;
        //   htmlObject.getElementById("myDiv").style.color="blue";
        //   return s;
        // };
        for (var i = 0; i < prueba.length; i++) {
          this.prueba3.push({
            id: prueba[i].id,
            distance: prueba[i].distance || "NA",
            vid:this.vehicles[prueba[i].vid].id,
            namev: this.vehicles[prueba[i].vid].name,
            duration: moment(prueba[i].duration).format("HH:MM:ss") || "NA",
            moving: prueba[i].moving,
            //moving: prueba[i].moving,
            start_time: prueba[i].start_time,
          });
        }

        this.isLoading = false;
        console.log("sasdas ", this.prueba3);
      });
    },
  },
  created() {},
};
</script>
<style >
.cambio {
  color: red;
}

.nav-tabs {
  flex-wrap: nowrap;
  white-space: nowrap;
  overflow: auto;

}
::-webkit-scrollbar {
      width: 14px;
     height: 14px;
}
/* Buttons */
::-webkit-scrollbar-button:horizontal:single-button:decrement {
  display: block;
  border-style: solid;
  height: 13px;
  width: 16px;
  border-width: 7px 14px 7px 0px;
  border-color: transparent #404040 transparent transparent;
}
::-webkit-scrollbar-button:horizontal:single-button:decrement {
  display: block;
  border-style: solid;
  height: 13px;
  width: 16px;
  border-width: 7px 0 7px 14px;
  border-color: transparent #404040 transparent transparent;
}
</style>


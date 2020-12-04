
<template>
<div class="container">
    <header class="jumbotron">
      <b-container class="bv-example-row">
      <b-row align-h="start">
        <b-col cols="2">
            <b-button variant="success" @click="prueba=false,prueba2=true" class="btn-options">Registrar</b-button>
        </b-col>
        <b-col cols="2">
            <b-button variant="info" @click="prueba2=false,prueba=true,show=false" class="btn-options">Buscar</b-button>
        </b-col>
      </b-row>
</b-container>
    </header>
    <b-form v-if="prueba == true">
      <b-container class="bv-example-row">
      <b-row align-h="between">
    <b-col cols="4" class="bcols">
       <b-form-select v-model="selected" :options="options"></b-form-select>
    </b-col>
    <b-col cols="6" class="bcols">
      <v-md-date-range-picker></v-md-date-range-picker>
    </b-col>
    <b-col cols="2">
      <b-button variant="primary" @click="show=false"> Buscar</b-button>
    </b-col>
    </b-row>
    </b-container>
    </b-form>
    <br>
    <b-container class="bv-example-row" v-if="prueba2 == true">
      <b-row align-h="end">
    <b-col cols="4" class="bcols">
      <p>Agregar</p>
    </b-col>
    <b-col cols="2" class="bcols">
      <b-button :disabled="show" variant="primary" @click="show = true" class="plusCircle" title="Nuevo servicio">
       <font-awesome-icon icon="plus" />
      </b-button>    
    </b-col>
    </b-row>
    </b-container>    
  <b-card v-if="show">
      <b-aspect :aspect="aspect">
        <div>
    <b-form @submit="onSubmit" @reset="onReset" >
      <!-- <b-form-group
        id="input-group-1"
        label=" Vehículo:"
        label-for="input-1"
        description=" "
      >
        <b-form-input
          id="input-1"
          v-model="form.vehicle"
          type="text"
          required
          placeholder="Nombre del vehículo"
        ></b-form-input>
      </b-form-group> -->
      <b-form-group id="input-group-1" label="Vehículo:" label-for="input-1">
        <b-form-select
          id="input-1"
          v-model="form.vehicle"
          :options="options"
          required
        ></b-form-select>
      </b-form-group>
      <b-form-group id="input-group-2" label="Kilometraje:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.kmgps"
          required
          placeholder="Kilometraje gps (se seleccionará automático)"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-3" label="Kilometraje vehículo:" label-for="input-2">
        <b-form-input
          id="input-3"
          v-model="form.kmvhcl"
          required
          placeholder="ingrese Kilometraje de la unidad"
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-4" label="Tipo de servicio:" label-for="input-3">
        <b-form-select
          id="input-4"
          v-model="form.tiposerv"
          :options="tiposervs"
          required
        ></b-form-select>
      </b-form-group>
      <b-form-group id="input-group-5" label="Proveedor:" label-for="input-3">
        <b-form-select
          id="input-5"
          v-model="form.prove"
          :options="proves"
          required
        ></b-form-select>
      </b-form-group>
      <b-form-group id="input-group-6" label="Costo:" label-for="input-2">
        <b-form-input
          id="input-6"
          v-model="form.costo"
          required
          placeholder="ingrese el costo del serv."
        ></b-form-input>
      </b-form-group>
      <b-form-group id="input-group-7">
        <b-form-input
          id="input-7"
          v-model="form.fecharegis"
          type="date"
          required
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Guardar</b-button>&nbsp;
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    <!-- <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card> -->
  </div>
      </b-aspect>
    </b-card>
    <!--************************************************************+-->
    <br>
      <div class="overflow-auto">
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
    ></b-pagination>

    <p class="mt-3">Página actual: {{ currentPage }}</p>

    <b-table
      id="my-table"
      :items="items"
      :per-page="perPage"
      :current-page="currentPage"
      small
    ></b-table>
  </div>
</div>
</template>
<script>
export default {
  data(){
    return{
      aspect: '21:9',
      form: [{ vehicle: '',kmgps: '', kmvhcl:'',tiposerv: null, prove: null, costo:'',fecharegis: ''}],
        tiposervs: [
          { text: 'Selecciona un servicio', value: null }, 'Preventivo', 'Correctivo', 'Siniestro', 'Corn'
          ],
        proves: [
          { text: 'Selecciona un proveedor', value: null }, 'Agencia AMSA', 'Agencia IZUSU', 'MecanicaTec', 'otro'
          ],
        show: false,
        prueba: false,
        prueba2: false,
        modomant: 'Registro',
        perPage: 3,
        currentPage: 1,
        items: [

        ],
        selected: null,
        options:[
          { value: null, text: 'Seleciona el vehículo' },'YZA06548','YZA01530', 'YZA12037', 'YZA20274','Caddy yzaaddy yza tabasco','YZA20273',
          'YZA12034',
          'YZA43730',
          'YZA09367',
          'YZA04317',
          'YZA12033',
          'YZA20275',
          'YZA NP300',
          'YZA09972',
          'Nissan NPssan NP300 yza',
          'YZA12036',
          'YZA12035',
          'YZA58052',
          'YZA02390',
          'YZA58053',
          'YZA01018 1018 Caddy',
          'YZA70966',
          'YZA01111',
          'YZA01113',
          'YZA20276',
          'YZA22640',

        ]
    }
    
  },
  computed: {
      rows() {
        return this.items.length
      }
  },
  methods: {
      onSubmit(evt) {
        this.items.push({
          Vehiculo: this.form.vehicle,
          kmgps: this.form.kmgps,
          kmvehiculo: this.form.kmvhcl,
          tiposerv: this.form.tiposerv,
          proveedor: this.form.prove,
          costo: this.form.costo,
          mantenimiento: this.form.fecharegis

        })
        evt.preventDefault()
        //alert(JSON.stringify(this.form))
        console.log(this.form);
      },
      onReset(evt) {
        evt.preventDefault()
        // Reset our form values
        this.form.vehicle,
        this.form.kmgps,
        this.form.kmvhcl,
        this.form.tiposerv,
        this.form.prove,
        this.form.costo,
        this.form.fecharegis
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
  }  
}
</script>
<style scoped>
.plusCircle{
  font-size: 20px;
  border-radius: 100px;

}
.bv-example-row{
  /* border:1px solid green; */
}
.bcols{
  text-align: end;
  /* border:1px orange solid; */
}
.btn-options{
  border-radius: 5px;
  font-weight: bolder;
  font-size: 20px;
  width: 100%;
  padding:15px 0px;
}
</style>
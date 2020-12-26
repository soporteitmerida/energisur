<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        <strong>Perfil <span :class="[boxColor? 'is-blue': 'is-red']">{{content}}</span></strong> 
      </h3>
    </header>
    <!--<p>
      <strong>Token:</strong>
      {{currentUser.accessToken.substring(0, 20)}} ... {{currentUser.accessToken.substr(currentUser.accessToken.length - 20)}}
    </p>-->
    <p>
      <strong>Id:</strong>
      D-{{prueba}}
    </p>
    <p>
      <strong>Email:</strong>
      {{emailuser}}
    </p>
    <p>
      <strong>Permiso:</strong>
      {{permiso}}
    </p>
    <!-- <ul>
      <li v-for="(role,index) in currentUser.roles" :key="index">{{role}}</li>
    </ul> -->
  </div>
</template>

<script>
import userService from '../services/user.service'; 
export default {
  name: 'Profile',
  data(){
    return{
      content: '',
      prueba: '',
      boxColor: true,
      emailuser: '',
      permiso: ''
    }
  },
  computed: {
    currentUser() {
      console.log('currente: ',this.$store.state.auth.user.auth);
      return this.$store.state.auth.user;
    }
  },
   mounted() {
     if (!this.currentUser) {
      console.log('Ruta perfil ', this.$router);
    }
    else{
      console.log('else mounted ');
    }
    userService.getAdminBoard().then(
      response => {
        this.prueba = response.data.id;
        this.emailuser = response.data.email;
        this.content = response.data.is_active;
        this.permiso = (response.data.is_staff == false ) ? 'Básico' : 'Admin' ;
        console.log('permiso: ', response.data.is_staff);
        //this.permiso = response.data.is_staff;
        if(this.content == true){
          console.log('Activo');
          this.content = 'Activo';

        }else{
          console.log('inactivo');
          this.content = !this.boxColor
        }
        console.log('asfas: ', response.config.url);
        //console.log("total users: ", response.data['data'].length);
        console.log("tokens sesion: ", response.data);
        console.log("datos : ", response);
        
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
<style  scoped>
.is-red {
    color: red;
  }
  .is-blue {
   color: green;
  }
</style>
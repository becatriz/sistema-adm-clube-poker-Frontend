<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="290">
      <template v-slot:activator="{ on, attrs }">
     <v-btn 
          v-bind="attrs"
          v-on="on" 
          icon 
          small 
          color="red">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
        
      </template>
      <v-card>
        <v-card-title class="headline">Remover</v-card-title>
        <v-card-text>Tem Certeza que deseja excluir este item?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Cancelar</v-btn>
          <v-btn color="red darken-1" text @click="dialog = false">Remover</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  export default {
    data () {
      return {
        dialog: false,
      }
    },
  }
</script>

 


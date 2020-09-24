export default class Usuario {
   id
   login
   senha
   cliente
   tipo_usuario

   constructor() {
    this.cliente = {
      id: "",
      nome_aplicativo: ""
      
    };
    this.tipo_usuario = {
      id: "",
      tipo: ""
    }
  }

}
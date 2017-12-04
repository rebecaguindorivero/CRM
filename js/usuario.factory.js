(function () {
    'use strict';
    angular
        .module('CrmUsuario')
        .factory('UsuarioFactoria', usuario);

    usuario.$inject = [];

    /* @ngInject */
    function usuario() {
        var exports = {
            cargarUsuarios: cargarUsuarios,
            nuevoUsuario: nuevoUsuario,
            eliminarUsuario: eliminarUsuario,
            editarUsuario : editarUsuario
        };

        return exports;

        ////////////////

        function cargarUsuarios() {
            if ('lista' in localStorage)
                return JSON.parse(localStorage.getItem("lista"));
            else {
                return [];
            }

        }
        
        function nuevoUsuario(nuevoUsuario) {

            // Paso 1 : Recoger el array con todos 
            /* Forma 2 para recuperar la lista y luego actualizarla */
            var lista = cargarUsuarios();

            // Paso 2:  Meter uno nuevo 
            nuevoUsuario.identificador = Date.now();
            lista.push(nuevoUsuario);

            // Paso 3:  Guardar el array nuevo 
            actualizarUsuarios(lista);
            return nuevoUsuario.identificador;

        }


        function editarUsuario(usuarioAEditar) {
            // recoger todos 
            var lista = cargarUsuarios();
            // recorrerlos 
            for (var i = 0; i < lista.length; i++) {
                var ahora = lista[i];
                if (usuarioAEditar.identificador == ahora.identificador) {
                    lista[i] = usuarioAEditar;
                    // Oye, esta es la nueva lista, actualiza el localStorage
                    actualizarUsuarios(lista);
                }
            }
        }



        // hecho
        function eliminarUsuario(usuario) {
            // recoger todos 
            var lista = cargarUsuarios();

            // recorrerlos 
            for (var i = 0; i < lista.length; i++) {
                var ahora = lista[i];
                var aEliminar = usuario;
                // y si o encuentro   id == id 
                if (aEliminar.identificador == ahora.identificador) {
                    console.log('Entré por aquí ');
                    
                    // lo borro
                    lista.splice(i, 1);
                    // actualizo localstorage
                    actualizarUsuarios(lista);
                }
            }
        }
        
        
        function actualizarUsuarios(list) {
            localStorage.setItem("lista", JSON.stringify(list));
        }

    }
})();

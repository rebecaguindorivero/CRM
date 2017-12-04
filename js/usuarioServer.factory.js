(function () {
    'use strict';
    angular
        .module('CrmUsuario')
        .factory('usuarioServer', usuario);

    usuario.$inject = ['$http'];

    /* @ngInject */
    function usuario($http) {
        var exports = {
            cargarUsuarios: getAll,
            cargarEsteUsuario: get,
            nuevoUsuario: post,
            eliminarUsuario: remove,
            editarUsuario: put
        };

        var urlServer = 'http://localhost:3000/api/customers';

        return exports;

        ////////////////


        // este es el enlace de $http: http://localhost:3000/api/customers.

        function get(conseguirUnUsuario) {
            return $http.get(urlServer + '/' + conseguirUnUsuario.id)
        }

        function put(nuevoUsuario) {

            // Paso 1: Yo hago una petición al servidor
            return $http.put(urlServer + '/' + nuevoUsuario.id, nuevoUsuario)
        }


        function remove(aEliminar) {
            return $http.delete(urlServer + '/' + aEliminar.id)
        }

        function seEditoBien(response) {
            return 'Mira, todo salio bien ';
        }

        function post(nuevoUsuario) {

            // Paso 1: Yo hago una petición al servidor
            return $http.post(urlServer, nuevoUsuario)
                .then(elServidorRespondio)
                .catch(elServidorTuvoUnError)
        }

        function getAll() {

            // Paso 1: Yo hago una petición al servidor
            return $http.get(urlServer)
                .then(elServidorRespondio)
                .catch(elServidorTuvoUnError)

        }




        // Paso 2: Cuando le responde el server, limpia los datos y los devuelve con un return
        function elServidorRespondio(response) {
            // Esto lo recibe el Paso 3: que está en el controlador
            return response.data;
        }


        function elServidorTuvoUnError(error) {
            console.error(error);
        }
    }
})();

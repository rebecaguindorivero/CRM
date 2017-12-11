(function () {
    'use strict';


    angular.module('CrmUsuario')
        .controller('MainController', MainController);

    MainController.$inject = ['$scope', 'usuarioServer'];

    /* @ngInject */
    function MainController($scope, usuarioServer) {
        $scope.list = [];
        $scope.modificando = false;
        $scope.usuarioNuevo = {};
        $scope.adduser = adduser;
        $scope.modifyUser = modifyUser;
        $scope.editar = editar;
        $scope.eliminar = eliminar;

        var seEstaEliminando = {};

        activate();

        ////////////////

        function activate() {

            // Llamo a la factoría para que busque a los customers
            usuarioServer.cargarUsuarios()
                // Paso 3: Cuando la factoría termine, se ejecutará este .then() 
                .then(terminoDeCargar);
        

        }

        // Método del Paso 3: Cuando la factoría termine, se ejecutará este .then() 
        function terminoDeCargar(users) {
            console.log('La factoría me envió estos usuarios como resultado ,', users);

            // Los pongo en la pantalla 
            $scope.list = users;
            
            var usuarioPrimero = users[0];
            usuarioServer.get(usuarioPrimero)
                .then(meTrajoAUno)
            
        }
        //conseguir que el usuario llegue limpio.
        function meTrajoAUno( usuario ){

            console.log(`El get de uno individual funcionó y trajo esto `, usuario)
        }

        function adduser() {
            /*  Opcion 1: le pongo yo el identificador 
           $scope.usuarioNuevo.identificador = Date.now();
            

            // Esto es para actualizar la pantalla ( $scope.list )
            $scope.list.push($scope.usuarioNuevo);
            
            // Esto es para que la factoría guarde el nuevo usuario ( en este caso en localStorage )
            usuario.nuevoUsuario($scope.usuarioNuevo);

            // vaciar el formulario
            $scope.usuarioNuevo = {};
            
            */

            
            
            usuarioServer.nuevoUsuario($scope.usuarioNuevo)
                .then(laFactoriaTerminoDeAnadir)



        }

        function laFactoriaTerminoDeAnadir(elUsuarioNuevoCreado) {
            var elNuevo = $scope.usuarioNuevo;
            
            // Yo le pongo el identificador que la factoría me dijo a mi objeto nuevoUsuario
            elNuevo.id = elUsuarioNuevoCreado.id;

            // Esto es para actualizar la pantalla ( $scope.list )
            $scope.list.push(elNuevo);

            
            // vaciar el formulario
            $scope.usuarioNuevo = {};
        }

        function editar(usuario) {
            console.log(usuario);
            $scope.usuarioNuevo = angular.copy(usuario);
            $scope.modificando = true;
        }

        function modifyUser() {
            usuarioServer.editarUsuario($scope.usuarioNuevo)
                .then(seEditoBien)
                .catch(algoSalioMal)
            
        }
        
        function algoSalioMal(error){
            alert('Hubo un error actualizando al usuario blablacar')
        }
        
        // Aqui actualizamos la pantalla buscandolo en $scope.list 
        function seEditoBien(response){
            for (var i = 0; i < $scope.list.length; i++) {
                var elActual = $scope.list[i];
                var elQueSeEstaEditando = $scope.usuarioNuevo;

                if (elQueSeEstaEditando.id == elActual.id) {
                    // Lo encontré 

                    // Para actualizar la pantalla, $scope.list
                    $scope.list[i] = elQueSeEstaEditando;

                    // Poner el formulario en blanco y que no salga el botón modificando
                    $scope.usuarioNuevo = {};
                    $scope.modificando = false;

                }
            }
            
        }

        function eliminar(usuario) {
            var confirmRes = confirm('Estás seguro de que quieres borrarlo?');
            if (confirmRes == true) {
                seEstaEliminando = usuario;
                // le pido a la factoria que lo borre
                usuarioServer.eliminarUsuario(usuario)
                    .then(seEliminaBien)
                // cuando ella termine hago esto de aqui abajo
                
            } else {
                return false;
            }
        }

        function seEliminaBien(){
// Lo estamos haciendo para eliminarlo de $scope.list 
                for (var i = 0; i < $scope.list.length; i++) {
                    var elActual = $scope.list[i];
                    var elQueSeVaEliminar = seEstaEliminando;
                    if (elQueSeVaEliminar.id == elActual.id) {
                        $scope.list.splice(i, 1);
                    }
                }
        }

        
    }
})();

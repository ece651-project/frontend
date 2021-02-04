(function () {
    angular.module('app', ['modalservice'])
        .controller('index_ctrl', IndexController);
    
    function IndexController($scope, ModalService){
        $scope.navbutton1 = "Log in";
        $scope.navbutton2 = "Sign up";
        $scope.to_login = function(){
            ModalService.open_login();
        }
        $scope.to_signup = function(){
            ModalService.open_signup();
        }
    }
})();
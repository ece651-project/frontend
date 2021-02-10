(function () {
    angular.module('app', ['modalservice'])
        .controller('index_ctrl', IndexController);
    
    function IndexController($scope, $window, ModalService){
        if(localStorage.hasOwnProperty("uid")){
            $scope.navbutton1 = "Profile";
            $scope.navbutton2 = "Log out";
            $scope.to_login = function(){$window.location.href = "/page/page.html";}
            $scope.to_signup = function(){
                localStorage.removeItem("uid");
                location.reload();
            }
        } 
        else{
            $scope.navbutton1 = "Log in";
            $scope.navbutton2 = "Sign up";
            $scope.to_login = function(){ModalService.open_login();}
            $scope.to_signup = function(){ModalService.open_signup();}
        }
        $scope.to_aptlist = function(){
            $window.location.href = "/page/page.html";
        }
    }
})();
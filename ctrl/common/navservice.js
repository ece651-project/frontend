(function () {
    'use strict';

    angular
        .module('navservice', ['modalservice'])
        .factory('NavHeaderService', NavHeaderService);

    function NavHeaderService($rootScope, $window, ModalService){
        var service = {};
        service.navheader_init = function(back){
            $rootScope.to_index = function(){$window.location.href = "/index.html";}
            if(localStorage.hasOwnProperty("uid")){
                $rootScope.navbutton1 = "Profile";
                $rootScope.navbutton2 = "Log out";
                $rootScope.to_login = function(){$window.location.href = "/page/profile.html";}
                $rootScope.to_signup = function(){
                    localStorage.removeItem("uid");
                    back ? $window.location.href = "/index.html" : location.reload();
                }
            } 
            else{
                $rootScope.navbutton1 = "Log in";
                $rootScope.navbutton2 = "Sign up";
                $rootScope.to_login = ModalService.open_login;
                $rootScope.to_signup = ModalService.open_signup;
            }
        }
        return service;
    }
})();

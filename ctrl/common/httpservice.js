const url = 'http://13.229.54.197:8080';

(function () {
    'use strict';

    angular
        .module('httpservice', [])
        .factory('UserHttpService', UserHttpService)
        .factory('AptHttpService', AptHttpService);

    UserHttpService.$inject = ['$http'];
    function UserHttpService($http){
        var service = {};
        service.login = function(data){
            return $http.post(url+'/user/login', data);
        };
        service.getUser = function(uid){
            return $http.get(url+'/user/get_user/'+uid);
        };
        service.getUserApt = function(uid){
            return $http.get(url+'/user/get_apt/'+uid);
        }
        service.deleteUser = function(uid){
            return $http.delete(url+'/user/delete_user/'+uid);
        };
        service.createUser = function(data){
            return $http.post(url+'/user/add_user', data);
        };
        service.updateUser = function(data){
            return $http.put(url+'/user/update_user', data);
        };
        return service;
    }

    AptHttpService.$inject = ['$http'];
    function AptHttpService($http){
        var service = {};
        service.getApt = function(aid){
            return $http.get(url+'/apt/get_apt/'+aid);
        }
        service.getAllApt = function(){
            return $http.get(url+'/user/get_all/');
        }
        service.deleteApt = function(uid, aid){
            return $http.delete(url+'/apt/delete_apt/'+uid+'/'+aid);
        };
        service.createApt = function(data){
            return $http.post(url+'/apt/add_apt', data);
        };
        service.updateApt = function(data){
            return $http.put(url+'/apt/update_apt', data);
        };
        return service;
    }
})();

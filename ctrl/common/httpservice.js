const url = 'http://127.0.0.1:80';

(function () {
    'use strict';

    angular
        .module('name')
        .factory('UserHttpService', UserHttpService)
        .factory('AptHttpService', AptHttpService);

    UserHttpService.$inject = ['$http'];
    function UserHttpService($http){
        var service = {};
        service.login = function(data){
            return $http.post(url+'/login', data).then(successCallback, errorCallback);
        };
        service.getUser = function(uid){
            return $http.get(url+'/user/get_user/'+uid).then(successCallback, errorCallback);
        };
        service.getUserApt = function(uid){
            return $http.get(url+'/user/get_apt/'+uid).then(successCallback, errorCallback);
        }
        service.deleteUser = function(uid){
            return $http.get(url+'/user/delete_user/'+uid).then(successCallback, errorCallback);
        };
        service.createUser = function(data){
            return $http.post(url+'/user/add_user', data).then(successCallback, errorCallback);
        };
        service.updateUser = function(data){
            return $http.put(url+'/user/update_user', data).then(successCallback, errorCallback);
        };
        return service;
    }

    AptHttpService.$inject = ['$http'];
    function AptHttpService($http){
        var service = {};
        service.getApt = function(aid){
            return $http.get(url+'/apt/get_apt/'+aid).then(successCallback, errorCallback);
        }
        service.getAllApt = function(){
            return $http.get(url+'/user/get_all/').then(successCallback, errorCallback);
        }
        service.deleteApt = function(uid, aid){
            return $http.get(url+'/apt/delete_apt/'+uid+'/'+aid).then(successCallback, errorCallback);
        };
        service.createApt = function(data){
            return $http.post(url+'/apt/add_apt', data).then(successCallback, errorCallback);
        };
        service.updateApt = function(data){
            return $http.put(url+'/apt/update_apt', data).then(successCallback, errorCallback);
        };
        return service;
    }

    function successCallback(res){
        return res.data;
    }
    function errorCallback(res){
        return res.status;
    }
})();

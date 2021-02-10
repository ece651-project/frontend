(function () {
    'use strict';

    angular
        .module('modalservice', ['ui.bootstrap', 'ngAnimate', 'httpservice'])
        .factory('ModalService', ModalService)
        .controller('ModalLoginCtrl', ModalLoginCtrl)
        .controller('ModalSignupCtrl', ModalSignupCtrl);

    function ModalService($uibModal){
        var service = {};
        service.open_login = function(){
            $uibModal.open({
                size:'md modal-dialog-centered',
                templateUrl: '/page/login.html',
                controller: 'ModalLoginCtrl',
            }).result.catch(function(){});
        }
        service.open_signup = function(){
            $uibModal.open({
                size:'md modal-dialog-centered',
                templateUrl: '/page/signup.html',
                controller: 'ModalSignupCtrl',
            }).result.catch(function(){});
        }
        return service;
    }

    function ModalLoginCtrl($scope, UserHttpService, ModalService, $uibModalInstance){
        var email_nexist, pwd_incorr;
        $scope.typepwd = false;
        $scope.togglepwd = function(){$scope.typepwd = ! $scope.typepwd}
        $scope.f_ine = function(){email_nexist = false;}
        $scope.f_inp = function(){pwd_incorr = false;}
        $scope.login_email_errmsg = function(){
            if(email_nexist){return "Email not exist";}
            return $scope.login_form.login_email.$error.email ? "Invalid email address" : "Email is required";
        }
        $scope.login_pwd_errmsg = function(){
            if(pwd_incorr){return "Password incorrect";}
            return "Password is required";
        }
        $scope.login_click = function(){
            $scope.login_email_err = function(){return email_nexist || $scope.login_form.login_email.$invalid;}
            $scope.login_pwd_err = function(){return pwd_incorr || $scope.login_form.login_pwd.$invalid;}
            $scope.login_disable = function(){return $scope.login_form.$invalid;}
            if($scope.login_form.$valid){
                UserHttpService.login($scope.user_in).then(function(res){
                    if(res.success){
                        localStorage.setItem("uid", res.uid);
                        location.reload();
                    }
                    else{
                        res.msg.includes("Password") ? pwd_incorr = true : email_nexist = true;
                    }
                },function(res){
                    // TODO
                    console.log(res);
                });
            }
        }
        $scope.to_signup = function(){
            $uibModalInstance.dismiss();
            ModalService.open_signup();
        }
    }

    function ModalSignupCtrl($scope, UserHttpService, ModalService, $uibModalInstance){
        var email_exist, name_exist;
        $scope.pattern_pwd = /^(?=.*[a-z])(?=.*\d)[A-Za-z\d\W]{8,}$/;
        $scope.typepwd = false;
        $scope.togglepwd = function(){$scope.typepwd = ! $scope.typepwd}
        $scope.f_upe = function(){email_exist = false;}
        $scope.f_upn = function(){name_exist = false;}
        $scope.signup_email_errmsg = function(){
            if(email_exist){return "Email already exist";}
            return $scope.signup_form.signup_email.$error.email ? "Invalid email address" : "Email is required";
        }
        $scope.signup_name_errmsg = function(){
            if(name_exist){return "Username already exist";}
            return "Username is required";
        }
        $scope.signup_pwd_errmsg = function(){
            return $scope.signup_form.signup_pwd.$error.required ? "Password is required" : "At lease 8 characters with 1 letter and 1 number";
        }
        $scope.signup_email_err= function(){return $scope.signup_form.signup_email.$dirty && (email_exist || $scope.signup_form.signup_email.$invalid);}
        $scope.signup_name_err= function(){return $scope.signup_form.signup_name.$dirty && (name_exist || $scope.signup_form.signup_name.$invalid);}
        $scope.signup_pwd_err= function(){return $scope.signup_form.signup_pwd.$dirty && $scope.signup_form.signup_pwd.$invalid;}
        $scope.signup_disable = function(){return $scope.signup_form.$invalid;}
        $scope.signup_click = function(){
            UserHttpService.createUser($scope.user_up).then(function(res){
                if(res.success){
                    localStorage.setItem("uid", res.uid);
                    location.reload();
                }
                else{
                    res.msg.includes("email") ? email_exist = true : name_exist = true;
                }
            }, function(res){
                // TODO
                console.log(res);
            });
        }
        $scope.to_login = function(){
            $uibModalInstance.dismiss();
            ModalService.open_login();
        }
    }

})();

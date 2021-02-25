(function () {
    angular.module('app', ['ui.bootstrap', 'ngAnimate', 'httpservice'])
        .controller('index_ctrl', IndexController)
        .controller('ModalSignupCtrl', ModalSignupCtrl);

    function IndexController($scope, $uibModal){
        $scope.show_picture = function(a){
            if(a==1)
            $uibModal.open({
                size:'md modal-dialog-centered',
                templateUrl: 'signup1.html',
                controller: 'ModalSignupCtrl',
            }).result.catch(function(){});
            else if(a==2)
            $uibModal.open({
                size:'md modal-dialog-centered',
                templateUrl: 'signup2.html',
                controller: 'ModalSignupCtrl',
            }).result.catch(function(){});
            else if(a==3)
            $uibModal.open({
                size:'md modal-dialog-centered',
                templateUrl: 'signup3.html',
                controller: 'ModalSignupCtrl',
            }).result.catch(function(){});
            else if(a==4)
            $uibModal.open({
                size:'md modal-dialog-centered',
                templateUrl: 'signup4.html',
                controller: 'ModalSignupCtrl',
            }).result.catch(function(){});           
        }
    }

    function ModalSignupCtrl(){
    }
    


})();
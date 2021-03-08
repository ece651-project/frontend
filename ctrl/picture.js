

(function () {

    


})();


(function () {





    angular.module('apt-info', ['ui.bootstrap', 'ngAnimate', 'httpservice'])
        .controller('index_ctrl', IndexController)
        .controller('ModalSignupCtrl', ModalSignupCtrl)

    .controller('RatingDemoCtrl', RatingDemoCtrl); 
    
    
    function RatingDemoCtrl($scope)
    {
      $scope.rate = 7;
      $scope.max = 10;
      $scope.isReadonly = false;
    
      $scope.hoveringOver = function(value) {
        $scope.overStar = value;
        $scope.percent = 100 * (value / $scope.max);
      };
    
      $scope.ratingStates = [
        {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
        {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
        {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
        {stateOn: 'glyphicon-heart'},
        {stateOff: 'glyphicon-off'}
      ];}
        
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
                templateUrl: 'rate_submit.html',
                controller: 'ModalSignupCtrl',
            }).result.catch(function(){});       
            else if(a==5)
            $uibModal.open({
                size:'md modal-dialog-centered',
                templateUrl: 'reserve.html',
                controller: 'ModalSignupCtrl',
            }).result.catch(function(){});       
        }
    }

    function ModalSignupCtrl(){
    }
    


})();



(function () {
    angular.module('profile', ['ui.bootstrap', 'ngAnimate'])
        .controller('profile_ctrl', ProfileController);
    
    function ProfileController($scope, $window){
        
        $scope.user = {
            email: '123@gmail.com',
            nickname: '321',
            phoneNum: '213121312'
        };
    }
})();
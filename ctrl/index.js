(function () {
    angular.module('app', ['navservice'])
        .controller('index_ctrl', IndexController);
    
    function IndexController($scope, $window, NavHeaderService){
        NavHeaderService.navheader_init(true);
        $scope.to_aptlist = function(){
            $window.location.href = "/page/apt-list.html";
        }
    }
})();
(function () {
    angular.module('apt-info', ['ui.bootstrap', 'ngAnimate', 'ngSanitize', 'httpservice'])
        .controller('info_ctrl', InfoController)
        .controller('RatingDemoCtrl', RatingDemoCtrl)
        .controller('CarouselDemoCtrl', CarouselDemoCtrl)
        .controller('siteCtrl', siteCtrl);

    function siteCtrl($scope, $http) {
        $http({
            method: 'GET',
            url:'data.json',

            //url: 'http://ec2-18-140-13-225.ap-southeast-1.compute.amazonaws.com:8080/user/get_user/'+'bfb95a98-083a-4537-b2c5-63d100f3b6b9',
        }).then(function successCallback(response) {
                $scope.data_info = response.data;
            }, function errorCallback(response) {
                alert("Note Valid");// 请求失败执行代码 
        });
        }

    function RatingDemoCtrl($scope) {
        $scope.rate = 7;
        $scope.max = 10;
        $scope.isReadonly = false;

        $scope.hoveringOver = function (value) {
            $scope.overStar = value;
            $scope.percent = 100 * (value / $scope.max);
        };

        $scope.ratingStates = [
            { stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle' },
            { stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty' },
            { stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle' },
            { stateOn: 'glyphicon-heart' },
            { stateOff: 'glyphicon-off' }
        ];
    }

    function InfoController($scope, $uibModal) {
        $scope.show_picture = function (a) {
            if (a == 1)
                $uibModal.open({
                    size: 'md modal-dialog-centered',
                    templateUrl: 'picture.html',
                }).result.catch(function () { });
            else if (a == 4)
                $uibModal.open({
                    size: 'md modal-dialog-centered',
                    templateUrl: 'rate_submit.html',
                }).result.catch(function () { });
            else if (a == 5)
                $uibModal.open({
                    size: 'md modal-dialog-centered',
                    templateUrl: 'reserve.html',
                }).result.catch(function () { });
        }
    }

    function CarouselDemoCtrl($scope){
        $scope.myInterval = 5000;
        $scope.noWrapSlides = false;
        $scope.active = 0;
        var slides = $scope.slides = [];
        var currIndex = 0;
        var picture_id = 4;
        $scope.addSlide = function() {
          slides.push({
            
            image: '../src/'+picture_id+'.jpg',
            text: ['Nice image','Awesome photograph','That is so cool','I love that'][slides.length % 4],
            id: currIndex++
          });
        };
      
      
        for (var i = 0; i < 4; i++) {
            picture_id =picture_id+1;
            $scope.addSlide();
        }
      
        // Randomize logic below
      }








})();



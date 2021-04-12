(function () {
    angular.module('apt-info', ['ui.bootstrap', 'ngAnimate', 'ngSanitize', 'httpservice','navservice'])
        .controller('InfoController', InfoController)
        .controller('RatingDemoCtrl', RatingDemoCtrl)
        .controller('siteCtrl', siteCtrl);


    function siteCtrl($scope, $uibModal, NavHeaderService, UserHttpService, AptHttpService) {
        $scope.Showcomment=true;
        $scope.apt_info = {address:""};
        $scope.slides = [];
        NavHeaderService.navheader_init(false);
        let aid = localStorage.getItem("aid");
        AptHttpService.getApt(aid).then(function(res){
            $scope.apt_info = res.data;
            UserHttpService.getUser($scope.apt_info.landlordId).then(function(res){
                $scope.user_info = res.data;
            }, function(res){
                alert("Error: "+res.status);
            });
            for(i=0;i<$scope.apt_info.images.length;i++){
                $scope.addSlide($scope.apt_info.images[i]);
            }
        }, function(res){
            alert("Error: "+res.status);
        });

        $scope.show_address = function(address, short=false){
            var addr = address.split('|');
            if(short){
                addr.pop();addr.pop();
            }
            return addr.filter(x => x).join();
        }
        // images
        $scope.myInterval = 5000;
        $scope.noWrapSlides = false;
        $scope.active = 0;
        var currIndex = 0;
        $scope.addSlide = function(src) {
            $scope.slides.push({
                image: src,
                id: currIndex++
          });
        };
        $scope.show_picture = function(){
            $uibModal.open({
                size: 'md modal-dialog-centered',
                templateUrl: 'picture.html',
            }).result.catch(function(){});
        }
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
        $scope.show = function (a) {
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
})();



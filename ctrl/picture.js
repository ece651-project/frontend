(function () {
    angular.module('apt-info', ['ui.bootstrap', 'ngAnimate', 'httpservice'])
        .controller('info_ctrl', InfoController)
        .controller('ModalImgCtrl', ModalImgCtrl)
        .controller('RatingDemoCtrl', RatingDemoCtrl);


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
                    templateUrl: 'signup1.html',
                    controller: 'ModalImgCtrl',
                }).result.catch(function () { });
            else if (a == 2)
                $uibModal.open({
                    size: 'md modal-dialog-centered',
                    templateUrl: 'signup2.html',
                    controller: 'ModalImgCtrl',
                }).result.catch(function () { });
            else if (a == 3)
                $uibModal.open({
                    size: 'md modal-dialog-centered',
                    templateUrl: 'signup3.html',
                    controller: 'ModalImgCtrl',
                }).result.catch(function () { });
            else if (a == 4)
                $uibModal.open({
                    size: 'md modal-dialog-centered',
                    templateUrl: 'rate_submit.html',
                    controller: 'ModalImgCtrl',
                }).result.catch(function () { });
            else if (a == 5)
                $uibModal.open({
                    size: 'md modal-dialog-centered',
                    templateUrl: 'reserve.html',
                    controller: 'ModalImgCtrl',
                }).result.catch(function () { });
        }
    }

    function ModalImgCtrl() {
    }



})();



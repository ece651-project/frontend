(function () {
    angular.module('apt-list', ['ui.bootstrap', 'ngAnimate', 'ngSanitize', 'httpservice', 'navservice'])
        .controller('ListCtrl', ListCtrl)
        .controller('DatepickerCtrl', DatepickerCtrl);
    
    function ListCtrl($scope, $http, $window, NavHeaderService, UserHttpService){
        NavHeaderService.navheader_init(false);
        let uid = localStorage.getItem("uid");

        $http({
            method: 'GET',
            url: 'http://18.140.13.225:8080/apt/get_all'
        }).then(function successCallback(response) {
            $scope.data_info = response.data;
        }, function errorCallback(response) {
            alert("Request Failed!"); 
        });

        $scope.to_aptinfo = function(aid) {
            localStorage.setItem("aid", aid);
            $window.location.href = "/page/apt-info.html";
        };

        $scope.addFavor = function(aid) {
            localStorage.setItem("aid", aid);
            if ($scope.islActive === "") {
                $scope.islActive = aid;
            }
            else if ($scope.islActive === aid){
                $scope.islActive = "";
            }  
            else {
                $scope.islActive = aid;
            }

            var favor = {'uid': uid, 'aid': aid};
            UserHttpService.addFavor(favor).then(function(res){
                console.log(res);
            }, function(res){
                console.log(res);
            });
        };
    }

    function DatepickerCtrl($scope){
        $scope.today = function() {
            $scope.dt = new Date();
        };
        $scope.today();
      
        $scope.clear = function() {
            $scope.dt = null;
        };
      
        $scope.options = {
            customClass: getDayClass,
            minDate: new Date(),
            showWeeks: true
        };
      
        // Disable weekend selection
        function disabled(data) {
            var date = data.date,
                mode = data.mode;
            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
        }
      
        $scope.toggleMin = function() {
            $scope.options.minDate = $scope.options.minDate ? null : new Date();
        };
      
        $scope.toggleMin();
      
        $scope.setDate = function(year, month, day) {
            $scope.dt = new Date(year, month, day);
        };
      
        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date(tomorrow);
        afterTomorrow.setDate(tomorrow.getDate() + 1);
        $scope.events = [
            {
                date: tomorrow,
                status: 'full'
            },
            {
                date: afterTomorrow,
                status: 'partially'
            }
        ];
      
        function getDayClass(data) {
            var date = data.date,
                mode = data.mode;
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0,0,0,0);
      
                for (var i = 0; i < $scope.events.length; i++) {
                    var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);
      
                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
                }
            }
            return '';
        }
    }
})();
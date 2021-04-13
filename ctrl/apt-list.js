(function () {
    angular.module('apt-list', ['ui.bootstrap', 'ngAnimate', 'ngSanitize', 'httpservice', 'navservice'])
        .controller('ListCtrl', ListCtrl)
        .controller('DatepickerCtrl', DatepickerCtrl);
    
    function ListCtrl($scope, $window, NavHeaderService, UserHttpService, AptHttpService){
        NavHeaderService.navheader_init(false);
        let uid = localStorage.getItem("uid");
        AptHttpService.getAllApt().then(function(res){
            $scope.data_info = res.data;
        }, function(res){
            alert("Error: "+res.status);
        });
        UserHttpService.getFavor(uid).then(function(res){
            $scope.favor = res.data;
            $scope.favor_list = $scope.favor.map(x => (x.aid));
        }, function(res){
            alert("Error: "+res.status);
        });

        $scope.to_aptinfo = function(aid) {
            localStorage.setItem("aid", aid);
            $window.location.href = "/page/apt-info.html";
        };
        $scope.show_address = function(address){
            var addr = address.split('|');
            addr.pop();
            return addr.filter(x => x).join();
        }
        $scope.star_acti = function(aid){
            if($scope.favor_list.includes(aid)){return true;}
            else{return false;}
        }
        $scope.addFavor = function(aid) {
            var favor = {'uid': uid, 'aid': aid};
            UserHttpService.addFavor(favor).then(function(res){
                if(res.data.success){location.reload();}
                else{alert(res.data.msg);}
            }, function(res){
                alert("Error: "+res.status);
            });
        };

        $scope.priceSelect = "Price";
        $scope.pricefilter = function(x) {
            if($scope.priceSelect != "Price") {
                if($scope.priceSelect == '<400') {
                    var arr = $scope.priceSelect.split("<");
                    var max = arr[1];
                    if(x.price > max) {
                        return false;
                    }
                    else {
                        return true;
                    }
                }
                else if($scope.priceSelect == '>1000') {
                    var arr = $scope.priceSelect.split(">");
                    var min = arr[1];
                    if(x.price < min) {
                        return false;
                    }
                    else {
                        return true;
                    }
                }
                else {
                    var arr = $scope.priceSelect.split("~");
                    var min = arr[0];
                    var max = arr[1];
                    if(x.price < min || x.price > max) {
                        return false;
                    }
                    else {
                        return true;
                    }
                }
            }
            else {
                return true;
            }
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
        }
    }
})();
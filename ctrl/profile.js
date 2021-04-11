(function () {
    angular.module('profile', ['ui.bootstrap', 'ngAnimate', 'navservice', 'httpservice'])
        .controller('profile_ctrl', ProfileController)
        .directive('imageUpload', ImageUpload)
        .directive('fileSelect', FileSelect);

    function ProfileController($scope, $window, NavHeaderService, UserHttpService, AptHttpService){
        NavHeaderService.navheader_init(true);
        let uid = localStorage.getItem("uid")
        UserHttpService.getUser(uid).then(function(res){
            $scope.user = res.data;
        },function(res){
            alert("Error: "+res.status);
        });
        UserHttpService.getUserApt(uid).then(function(res){
            $scope.rent_aptlist = res.data;
        },function(res){
            alert("Error: "+res.status);
        });
        UserHttpService.getFavor(uid).then(function(res){
            $scope.favor_aptlist = res.data;
        },function(res){
            alert("Error: "+res.status);
        });

        // For Rent
        var isnew= true;
        $scope.apt = {};
        $scope.images = [];
        $scope.apt_show_form = false;
        $scope.apt_add_new = function(){$scope.apt_show_form = true; isnew = true;}
        DatepickerPopup($scope);
        $scope.apt_view = function(aid){
            localStorage.setItem('aid', aid);
            $window.location.href = "/page/apt-info.html";
        }
        $scope.show_address = function(address){
            var addr = address.split('|');
            addr.pop();
            return addr.filter(x => x).join();
        }
        $scope.apt_update = function(aid){
            isnew = false;
            $scope.apt_show_form = true;
            AptHttpService.getApt(aid).then(function(res){
                $scope.apt = res.data;
                if($scope.apt.images == undefined){$scope.apt.images = [];}
                for(i=0; i<$scope.apt.images.length; i++){$scope.images.push({src: $scope.apt.images[i]});}
                $scope.apt.addr = {};
                var addr_split = $scope.apt.address.split('|');
                $scope.apt.addr.line1 = addr_split[0];$scope.apt.addr.line2 = addr_split[1];
                $scope.apt.addr.city = addr_split[2];$scope.apt.addr.province = addr_split[3];$scope.apt.addr.zip = addr_split[4];
                var date_split = $scope.apt.startDate.split('-');
                $scope.apt.date = new Date(date_split[0], date_split[1]-1, date_split[2]);
            }, function(res){
                alert("Error: "+res.status);
            });
        }
        $scope.apt_delete = function(aid){
            AptHttpService.deleteApt(uid, aid).then(function(res){
                if(res.data.success){location.reload();}
                else{alert(res.data.msg);}
            }, function(res){
                alert("Error: "+res.status);
            });
        }

        $scope.$on('imageSelected', function(event, args){
            var image = args;
            $scope.images.push(image);
            var reader = new FileReader();
            reader.addEventListener('load', function(){
                $scope.$apply(function(){
                    image.src = reader.result;
                })
            }, false);
            if(image.file){reader.readAsDataURL(image.file);}
        });
        $scope.addr_err = function(rent_addr){
            return (rent_addr.addr1.$dirty && rent_addr.addr1.$invalid) || (rent_addr.city.$dirty && rent_addr.city.$invalid) ||
                (rent_addr.province.$touched && rent_addr.province.$invalid) || (rent_addr.zip.$dirty && rent_addr.zip.$invalid);
        }
        $scope.addr_errmsg = function(rent_addr){
            if(rent_addr.addr1.$error.required){return "Address Line 1 cannot be empty";}
            else if(rent_addr.city.$error.required){return "City cannot be empty";}
            else if(rent_addr.province.$error.required){return "Province cannot be empty";}
            else if(rent_addr.zip.$error.required){return "Postal code cannot be empty";}
        }
        $scope.info_err = function(rent_info){
            return (rent_info.type.$touched && rent_info.type.$invalid) || (rent_info.date.$touched && rent_info.date.$invalid) ||
                (rent_info.term.$dirty && rent_info.term.$invalid) || (rent_info.vacancy.$dirty && rent_info.vacancy.$invalid) || (rent_info.price.$dirty && rent_info.price.$invalid);
        }
        $scope.info_errmsg = function(rent_info){
            if(rent_info.type.$error.required){return "Type cannot be empty";}
            else if(rent_info.date.$error.required){return "Start Date cannot be empty";}
            else if(rent_info.term.$error.required){return "Lease Term cannot be empty";}
            else if(rent_info.term.$invalid){return "Lease Term can only be numbers";}
            else if(rent_info.vacancy.$error.required){return "Availability cannot be empty";}
            else if(rent_info.vacancy.$invalid){return "Availability can only be numbers";}
            else if(rent_info.price.$error.required){return "Rent cannot be empty";}
            else if(rent_info.price.$invalid){return "Rent can only be decimals";}
        }

        $scope.apt_submit = function(){
            $scope.apt.landlordId = uid;
            var images_src = [];
            for(i=0; i<$scope.images.length; i++){images_src.push($scope.images[i].src);}
            $scope.apt.images = images_src;
            if($scope.apt.addr.line2 == undefined){$scope.apt.addr.line2 = "";}
            $scope.apt.address = $scope.apt.addr.line1+'|'+$scope.apt.addr.line2+'|'+$scope.apt.addr.city+'|'+$scope.apt.addr.province+'|'+$scope.apt.addr.zip;
            $scope.apt.startDate = $scope.apt.date.toLocaleDateString('fr-CA');
            delete $scope.apt['addr'];
            delete $scope.apt['date'];
            $scope.apt.term = parseInt($scope.apt.term);
            $scope.apt.vacancy = parseInt($scope.apt.vacancy);
            $scope.apt.price = parseInt($scope.apt.price);
            if(isnew){
                AptHttpService.createApt($scope.apt).then(function(res){
                    if(res.data.success){location.reload();}
                    else{alert(res.data.msg);}
                }, function(res){
                    alert("Error: "+res.status);
                });
            } else{
                delete $scope.apt['uploadTime'];
                AptHttpService.updateApt($scope.apt).then(function(res){
                    if(res.data.success){location.reload();}
                    else{
                        alert(res.data.msg);
                    }
                }, function(res){
                    alert("Error: "+res.status);
                });
            }
            //console.log($scope.apt);
        }
        $scope.apt_cancel = function(){
            $scope.apt_show_form = false;
        }
        //Favourite
        $scope.delete_favor = function(aid){
            UserHttpService.deleteFavor(uid,aid).then(function(res){
                if(res.data.success){location.reload();}
                else{alert(res.data.msg);}
            }, function(res){
                alert("Error: "+res.status);
            });
        }
        
        // Edit Profile
        var nickname_exist;
        $scope.change_user = {};
        $scope.focus_name = function(){nickname_exist = false;}
        $scope.pwdtype = true;
        $scope.pwdtoggle = function(){$scope.pwdtype = ! $scope.pwdtype}
        $scope.pwd_pattern = /^(?=.*[a-z])(?=.*\d)[A-Za-z\d\W]{8,}$/;
        $scope.edit_name_errmsg = "Nickname already exist";
        $scope.edit_phone_errmsg = "Phone number can only be numbers";
        $scope.edit_pwd_errmsg = "At lease 8 characters with 1 letter and 1 number";
        $scope.edit_name_err = function(){return nickname_exist;}

        $scope.avater_name = "Choose File";
        var avater = [];
        $scope.$on("fileSelected", function(event, args){
            var item = args;
            avater.unshift(item);
            var reader = new FileReader();
            reader.addEventListener("load", function(){
                $scope.$apply(function(){
                    item.src = reader.result;
                }, false);
            });
            if(item.file){reader.readAsDataURL(item.file);}
            $scope.avater_name = item.file.name;
        });

        $scope.edit_update = function(){
            $scope.change_user.uid = localStorage.getItem("uid");
            if(avater.length>0){
                $scope.change_user.avater = avater[0].src;
            }
            for (x in $scope.change_user){
                if(!$scope.change_user[x]){delete $scope.change_user[x];}
            }
            UserHttpService.updateUser($scope.change_user).then(function(res){
                if(res.data.success){
                    location.reload();
                }
                else{
                    if(res.data.msg.includes('name')){nickname_exist = true;}
                }
            }, function(res){
                alert("Error: "+res.status);
            });
        }
        $scope.edit_cancel = function(){
            location.reload();
        }
    }

    function ImageUpload(){
        return {
            scope: true,
            link: function(scope, el){
                el.bind('change', function(event){
                    var files = event.target.files;
                    for (var i=0; i<files.length; i++){
                        scope.$emit("imageSelected", {
                            file: files[i]
                        });
                    }
                });
            }
        };
    }

    function FileSelect(){
        return{
            scope: true,
            link: function postLink(scope, el){
                el.on('change', function(event){
                    var files = event.target.files;
                    scope.$emit("fileSelected", {file: files[0]});
                });
            }
        }
    }

    function DatepickerPopup($scope){
        $scope.date_format = 'dd-MMMM-yyyy';
        $scope.today = function(){
            $scope.apt.date = new Date();
        }
        $scope.today();
        $scope.clear = function(){
            $scope.apt.date = null;
        }
        $scope.date_options = {
            customClass: getDayClass,
            minDate: new Date(),
            showWeeks: false
        };
        $scope.popup = {opened: false};
        $scope.date_open = function(){
            $scope.popup.opened = true;
        }
        $scope.events = [];
        function getDayClass(data){
            var date = data.date;
            var mode = data.mode;
            if(mode === 'day'){
                var dayToCheck = new Date(date).setHours(0,0,0,0);
                for(i=0; i<$scope.events.length; i++){
                    var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);
                    if (dayToCheck === currentDay) {return $scope.events[i].status;}
                }
            }
        }
    }
})();
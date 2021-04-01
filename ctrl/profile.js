(function () {
    angular.module('profile', ['ui.bootstrap', 'ngAnimate', 'navservice', 'httpservice'])
        .controller('profile_ctrl', ProfileController)
        .directive('imageUpload', ImageUpload)
        .directive('fileSelect', FileSelect);

    function ProfileController($scope, $window, NavHeaderService, UserHttpService, AptHttpService){
        NavHeaderService.navheader_init(true);
        $scope.user = {
            email: '123@gmail.com',
            nickname: '321',
            phoneNum: '213121312'
        };
        // For Rent

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
            return (rent_info.type.$touched && rent_info.type.$invalid) ||
                (rent_info.term.$dirty && rent_info.term.$invalid) || (rent_info.vacancy.$dirty && rent_info.vacancy.$invalid) || (rent_info.price.$dirty && rent_info.price.$invalid);
        }
        $scope.info_errmsg = function(rent_info){
            if(rent_info.type.$error.required){return "Type cannot be empty";}
            else if(rent_info.term.$error.required){return "Lease Term cannot be empty";}
            else if(rent_info.term.$invalid){return "Lease Term can only be numbers";}
            else if(rent_info.vacancy.$error.required){return "Availability cannot be empty";}
            else if(rent_info.vacancy.$invalid){return "Availability can only be numbers";}
            else if(rent_info.price.$error.required){return "Rent cannot be empty";}
            else if(rent_info.price.$invalid){return "Rent can only be decimals";}
        }
        //Favourite

        
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
            console.log($scope.change_user);
            UserHttpService.updateUser($scope.change_user).then(function(res){
                if(res.data.success){
                    location.reload();
                }
                else{
                    if(res.data.msg.includes('name')){nickname_exist = true;}
                }
            }, function(res){
                //
                console.log(res.status);
            })
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

})();
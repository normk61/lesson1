angular.module('starter.controllers', [])
.controller('LoginCtrl',['$scope', '$state', 'UserService', '$ionicHistory', function($scope, $state, UserService, $ionicHistory) {
    $scope.user = {};
    $scope.loginSubmitForm = function(form)
    {
        if(form.$valid)
        {  
           UserService.login($scope.user)
            .then(function(response) {
                if (response.status === 200) {
                    //Should return a token
                    console.log(response);
                    $ionicHistory.nextViewOptions({
                      historyRoot: true,
                      disableBack: true
                    });
                    $state.go('lobby');
                } else {
                    // invalid response
                    alert("Something went wrong, try again.");
                }
            }, function(response) {
                // Code 401 corresponds to Unauthorized access, in this case, the email/password combination was incorrect.
                if(response.status === 401)
                {
                    alert("Incorrect username or password");
                }else if(response.data === null) {
//If the data is null, it means there is no internet connection.
                    alert("The connection with the server was unsuccessful, check your internet connection and try again later.");
                }else {
                    alert("Something went wrong, try again.");
                }
            });
        }
    };
}])
.controller('RegisterCtrl',['$scope', '$state', 'UserService', '$ionicHistory', function($scope, $state, UserService, $ionicHistory) {
    $scope.repeatPwd = {};
    $scope.user = {};
    $scope.registerSubmitForm = function(form)
    {
        if (form.password.$viewValue != form.repeatPassword.$viewValue) {
            form.$valid = false;
            //form.password.$valid = false;
            alert("password fields do not match");
        }
        if(form.$valid)
        {  
           UserService.create($scope.user)
            .then(function(response) {
                if (response.status === 200) {
                    //Should return a token
                    console.log(response);
                    $ionicHistory.nextViewOptions({
                      historyRoot: true,
                      disableBack: true
                    });
                    $state.go('lobby');
                } else {
                    // invalid response
                    alert("Something went wrong, try again.");
                }
            }, function(response) {
                // Code 401 corresponds to Unauthorized access, in this case, the email/password combination was incorrect.
                if(response.status === 422)
                {
                    alert("User already registered with specified email");
                }else if(response.data === null) {
//If the data is null, it means there is no internet connection.
                    alert("The connection with the server was unsuccessful, check your internet connection and try again later.");
                }else {
                    alert("Something went wrong, try again.");
                }
            });
        }
    };
}]);



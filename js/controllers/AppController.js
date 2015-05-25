"use strict";

socialNetwork.controller( "AppController",
    function HomeController( $scope, $location, userService, authentication, notyService ) {
        $scope.authentication = authentication;
    }
);
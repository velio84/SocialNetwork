"use strict";

socialNetwork.controller( "AppController",
    function HomeController( $scope, $location, $routeParams, userService, authentication, notyService ) {
        $scope.authentication = authentication;
        $scope.isOwnWall = authentication.getUsername() === $routeParams[ "username" ];
        $scope.isOwnFeed = $location.path() === '/';
    }
);
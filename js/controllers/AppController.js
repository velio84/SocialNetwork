"use strict";

socialNetwork.controller( "AppController",
    function HomeController( $scope, $location, $interval, $routeParams, userService, authentication, profileService, notyService ) {
        $scope.authentication = authentication;
        $scope.isOwnWall = authentication.getUsername() === $routeParams[ "username" ];
        $scope.isOwnFeed = $location.path() === '/';

        function getFriendRequests() {
            if ( authentication.isLogged() ) {
                profileService( authentication.getSessionToken() ).getPendingRequests()
                    .$promise
                    .then(
                    function( data ){
                        $scope.pendingRequests = data;
                    }, function( error ){
                        notyService.showError( "Failed to load friend requests!", error );
                    }
                );
            }
        }

        $scope.acceptFriendRequest = function( request ) {
            if ( authentication.isLogged() ) {
                profileService( authentication.getSessionToken() ).acceptRequest( request.id )
                    .$promise
                    .then(
                    function() {
                        var index =  $scope.pendingRequests.indexOf( request );
                        $scope.pendingRequests.splice(index,1);
                        notyService.showInfo( "Friend request successfully accepted." );
                        getFriendRequests;
                    }, function( error ) {
                        notyService.showError( "Failed to accept friend request!", error );
                    }
                );
            }
        };

        $scope.rejectFriendRequest = function( request ) {
            if( authentication.isLogged() ) {
                profileService( authentication.getSessionToken() ).rejectRequest( request.id )
                    .$promise
                    .then(
                    function() {
                        var index =  $scope.pendingRequests.indexOf( request );
                        $scope.pendingRequests.splice( index, 1 );
                        notyService.showInfo( "Friend request successfully rejected." );
                    }, function( error ) {
                        notyService.showError( "Failed to reject friend request!", error );
                    }
                );
            }
        };

        //$scope.toLocalTimeZone = function(item){
        //    item.date = new Date(item.date);
        //};

        getFriendRequests();
        var interval = $interval( getFriendRequests, 100000 );

        $scope.$on( "$destroy", function () { $interval.cancel( interval ); });
    }
);
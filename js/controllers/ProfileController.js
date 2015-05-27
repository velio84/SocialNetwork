"use strict";

socialNetwork.controller( "ProfileController",
    function ProfileController( $scope, $location, userService, authentication, notyService, profileService, PAGE_SIZE ) {
        var feedStartPostId;
        $scope.posts = [];

        $scope.loadNewsFeed = function(){
            if(authentication.isLogged()) {

                profileService( authentication.getSessionToken() ).getNewsFeed( PAGE_SIZE, feedStartPostId )
                    .$promise
                    .then(
                    function (data) {
                        $scope.posts = $scope.posts.concat( data );
                        if( $scope.posts.length > 0 ){
                            feedStartPostId = $scope.posts[ $scope.posts.length - 1 ].id;
                        }
                        $scope.isNewsFeed = true;
                    },
                    function ( error ) {
                        notyService.showError( "Failed to load news feed.", error );
                    }
                );
            }
        };

        $scope.getOwnFiendsList = function() {
            if( authentication.isLogged() ) {
                profileService( authentication.getSessionToken() ).getFriendsList()
                    .$promise
                    .then(
                        function ( data ) {
                            $scope.friendsList = data;
                        },
                        function ( error ) {
                            notyService.showError( "Failed to load friends", error );
                        }
                    );
            }
        };

        $scope.getOwnFriendsListPreview = function() {
            if( authentication.isLogged() ) {
                profileService( authentication.getSessionToken() ).getFriendsListPreview()
                    .$promise
                    .then(
                        function ( data ) {
                            data.userFriendsUrl = "#/user/" + $scope.username + "/friends/";
                            $scope.friendsListPreview = data;
                        },
                        function ( error ) {
                            notyService.showError( "Failed to load friends", error );
                        }
                    );
            }
        };


    }
);
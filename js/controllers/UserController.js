"use strict";

socialNetwork.controller( "UserController", 
	function UserController( $scope, $location, $timeout, $routeParams, userService, authentication, notyService, PAGE_SIZE ) {

        var feedStartPostId;
        $scope.posts = [];

		$scope.login = function() {
			if( !authentication.isLogged() ) {
				userService().login( $scope.userLogin )
					.$promise
					.then(
						function( data ) {
							authentication.setUserToStorage( data );
                            notyService.showInfo( "Welcome, " + data.userName + "!" );
						},
						function( error ) {
                            notyService.showError( "Login failed!", error );
						}
					);
			}
		};

		$scope.register = function() {
			if( !authentication.isLogged() ) {
				userService().register( $scope.userRegister )
					.$promise
					.then(
						function( data ) {
							authentication.setUserToStorage( data );
                            notyService.showInfo( "Welcome, " + data.userName + "!" );
						},
						function( error ) {
                            notyService.showError( "Registration failed!", error );
						}
					);
			}
		};

        $scope.logout = function() {
            if( authentication.isLogged() ) {
                userService( authentication.getSessionToken() ).logout()
                    .$promise
                    .then(
                        function() {
                            authentication.clearUserFromStorage();
                            $location.path( "/" );
                            notyService.showInfo( "Goodbye and have fun in the real life!" );
                        },
                        function( error ) {
                            notyService.showError( "Logout failed!", error );
                        }
                    );
            }
        };

        $scope.searchUser = function(){
            if( authentication.isLogged() && $scope.searchTerm.trim() !== "" ) {
                userService( authentication.getSessionToken() ).searchUser( $scope.searchTerm )
                    .$promise
                    .then(
                        function( data ) {
                            $scope.searchResults = data;
                        }
                    );
            } else {
                $scope.searchResults = undefined;
            }
        };

        $scope.clearSearchResults = function() {
            $timeout( function() {
                $scope.searchResults = undefined;
                $scope.searchTerm = "";
            }, 300);
        };

        $scope.getWallOwner = function() {
            if ( authentication.isLogged() ) {
                userService( authentication.getSessionToken() ).getUserFullData( $routeParams[ "username" ] )
                    .$promise
                    .then(
                    function( data ) {
                        $scope.wallOwner = data;
                        if( authentication.getUsername() !== $scope.wallOwner.username ) {
                            if ( data.isFriend ) {
                                $scope.wallOwner.status = "friend";
                            } else if( data.hasPendingRequest ) {
                                $scope.wallOwner.status = "pending";
                            } else {
                                $scope.wallOwner.status = "invite";
                            }
                        }

                        if( $scope.wallOwner.isFriend && $location.path() === "/user/" + $routeParams[ "username" ] + "/wall/" ) {
                            $scope.getUserFriendsListPreview();
                        }

                        if( !$scope.wallOwner.isFriend && $routeParams[ "username"] !== $scope.username && $location.path() === "/user/" + $routeParams[ "username" ] + "/friends/") {
                            $location.path( "/" );
                        }
                    },
                    function( error ) {
                        notyService.showError( "Failed to load user data!", error );
                    }
                );
            }
        };

        $scope.loadUserWall = function() {
            if( authentication.isLogged() ) {
                userService( authentication.getSessionToken() ).getUserWall( $routeParams[ "username" ], PAGE_SIZE, feedStartPostId )
                    .$promise
                    .then(
                    function ( data ) {
                        $scope.posts = $scope.posts.concat( data );
                        if( $scope.posts.length > 0 ) {
                            feedStartPostId = $scope.posts[ $scope.posts.length - 1 ].id;
                        }
                        console.log( data );
                    },
                    function ( error ) {
                        notyService.showError( "Failed to load user wall!", error );
                    }
                );
            }
        };

        $scope.getUserFriendsListPreview = function() {
            if ( authentication.isLogged() ) {
                userService( authentication.getSessionToken() ).getUserFriendsPreview( $routeParams[ "username" ] )
                    .$promise
                    .then(
                    function( data ) {
                        data.userFriendsUrl = "#/user/" + $routeParams[ "username" ] + "/friends/";
                        $scope.friendsListPreview = data;
                    },
                    function( error ) {
                        notyService.showError( "Failed to load user friends!", error );
                    }
                );
            }
        };

        $scope.getUserFriends = function() {
            if( authentication.isLogged() ) {
                userService( authentication.getSessionToken() ).getUserFriends ($routeParams[ "username" ] )
                    .$promise
                    .then(
                    function( data ) {
                        $scope.friendsList = data;
                    },
                    function( error ) {
                        notyService.showError( "Failed to load user friends!", error );
                    }
                );
            }
        };

        $scope.username = authentication.getUsername();
    }
);
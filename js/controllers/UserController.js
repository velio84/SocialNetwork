"use strict";

socialNetwork.controller( "UserController", 
	function UserController( $scope, $location, $timeout, userService, authentication, notyService ) {

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


        $scope.username = authentication.getUsername();
    }
);
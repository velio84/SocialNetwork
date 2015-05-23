"use strict";

socialNetwork.controller( "UserController", 
	function UserController( $scope, userService, authentication, baseUrl ) {

		$scope.login = function() {
			if( !authentication.isLogged() ) {
				userService.login( $scope.userLogin )
					.$promise
					.then(
						function( data ) {
							authentication.setUserToStorage( data );
							console.log('login successful!!!');
							//TODO noty for login success
						},
						function( error ) {
							//TODO login failed
						}
					);
			}
		};

		$scope.register = function() {
			if( !authentication.isLogged() ) {
				userService.register( $scope.userRegister )
					.$promise
					.then(
						function( data ) {
							authentication.setUserToStorage( data );
							console.log('register successful!!!');
							console.log( data );
							//TODO noty for register success
						},
						function( error ) {
							//TODO register failed
						}
					);
			}
		}
	} 
);
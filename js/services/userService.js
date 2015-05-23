"use strict";

socialNetwork.factory( "userService",
	function( $http, $resource, baseUrl ) {

		$http.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage[ "sessionToken" ];

		var user = $resource(
			baseUrl + "users/:option1/:option2/:option3",
			{
				option1: "@option1",
				option2: "@option2",
				option3: "@option3"
			},
			{
				edit: {
					method: "PUT"
				}
			}
		);

		return {
			login: function( loginData ) {
				return user.save( { option1: "login" }, loginData );
			},
			register: function( registerData ) {
				return user.save( { option1: 'register' }, registerData );
			} ,
			logout: function() {
				return user.save( { option1: 'logout' } );
			}
		};
	}
);
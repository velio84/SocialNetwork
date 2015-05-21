"use strict";

var socialNetwork = angular
	.module( "socialNetwork", [ "ngResource", "ngRoute" ] )
	.config( function( $routeProvider ) {

		$routeProvider
			.when( "/", {
				templateUrl: "/partials/login-register.html"
			})
			.otherwise({redirectTo: "/"});
	});
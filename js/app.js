"use strict";

var socialNetwork = angular
	.module( "socialNetwork", [ "ngResource", "ngRoute" ] )
	.config( function( $routeProvider ) {

		$routeProvider
			.when( "/", {
				templateUrl: "/partials/login-register.html"
			})
			.otherwise({redirectTo: "/"});
	})
	.constant( "baseUrl", "http://softuni-social-network.azurewebsites.net/api/" );
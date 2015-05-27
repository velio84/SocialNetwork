"use strict";

var socialNetwork = angular
	.module( "socialNetwork", [ "ngResource", "ngRoute" ] )
	.config( function( $routeProvider ) {

		$routeProvider
			.when( "/", {
				templateUrl: "/partials/home.html",
				resolve:{
					isLogged: function($location){
						if( localStorage.getItem( "sessionToken" ) ){
							$location.path('/');
						}
					}
				}
			})
            .otherwise({redirectTo: '/'})
	})
	.constant( {
        "baseUrl": "http://softuni-social-network.azurewebsites.net/api/",
        "PAGE_SIZE": 5
    } );
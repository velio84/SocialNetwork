"use strict";

var socialNetwork = angular
	.module( "socialNetwork", [ "ngResource", "ngRoute" ] )
	.config( function( $routeProvider ) {

		$routeProvider
			.when( "/", {
				templateUrl: "/partials/home.html",
				resolve: {
					isLogged: function($location) {
						if( localStorage.getItem( "sessionToken" ) ) {
							$location.path( "/" );
						}
					}
				}
			})
            .when( "/profile/", {
                templateUrl: "/partials/profile-details.html",
                resolve: {
                    isLogged: function($location) {
                        if( !localStorage.getItem( "sessionToken" ) ) {
                            $location.path( "/" );
                        }
                    }
                }
            })
            .when( "/profile/password/", {
                templateUrl: "/partials/profile-password.html",
                resolve: {
                    isLogged: function($location) {
                        if( !localStorage.getItem( "sessionToken" ) ) {
                            $location.path( "/" );
                        }
                    }
                }
            })
            .when( "/user/:username/wall/", {
                templateUrl: "/partials/wall.html",
                resolve: {
                    isLogged: function($location) {
                        if( !localStorage.getItem( "sessionToken" ) ) {
                            $location.path( "/" );
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
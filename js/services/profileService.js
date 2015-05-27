"use strict";

socialNetwork.factory( "profileService",
    function( $http, $resource, baseUrl ) {
        return function( token ) {
            $http.defaults.headers.common[ "Authorization" ] = "Bearer " + token;

            var profile = {},
                request = $resource(
                    baseUrl + "me/:option1/:option2",
                    {
                        option1: "@option1",
                        option2: "@option2"
                    },
                    {
                        edit: {
                            method: "PUT"
                        }
                    }
                );

            profile.me = function() {
                return request.get();
            };

            profile.update = function( data, option1 ) {
                return request.edit( { option1: option1 }, data );
            };

            profile.getNewsFeed = function( pageSize, startPostId ) {
                var option1 = "feed?StartPostId" + ( startPostId ? "=" + startPostId : "" ) + "&PageSize=" + pageSize;

                return request.query( { option1: option1} );
            };

            profile.getFriendsList = function() {
                return request.query( { option1: "friends"} );
            };

            profile.getFriendsListPreview = function() {
                return request.get( { option1: "friends", option2: "preview" } );
            };

            profile.sendFriendRequest = function( username ) {
                return request.save( { option1: "requests", option2: username } );
            };

            profile.getPendingRequests = function() {
                return request.query( { option1: "requests" } );
            };

            profile.acceptRequest = function( requestId ) {
                var option2 = "" + requestId + "?status=approved";

                return request.edit( { option1: "requests", option2: option2 } );
            };

            profile.rejectRequest = function( requestId ) {
                var option2 = "" + requestId + "?status=rejected";

                return request.edit( { option1: "requests", option2: option2 } );
            };

            return profile;
        }
    }
);
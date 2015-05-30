"use strict";

socialNetwork.controller( "PostController",
    function UserController( $scope, $routeParams, userService, authentication, notyService, postService ) {

        $scope.addPost = function() {
            $scope.postData.username = $routeParams[ "username"];

            if( authentication.isLogged() ) {
                postService( authentication.getSessionToken() ).addPost( $scope.postData )
                    .$promise
                    .then(
                    function( data ) {
                        $scope.postData.postContent = "";
                        $scope.posts.unshift( data );
                        notyService.showInfo( "Post added successfully." );
                    },
                    function( error ) {
                        $scope.postData.postContent = "";
                        notyService.showError( "Failed to add post!", error );
                    }
                );
            }
        };

        $scope.editPost = function( post ) {
            if( authentication.isLogged() ) {
                postService( authentication.getSessionToken() ).editPost( post.id, post.newPostContent )
                    .$promise
                    .then(
                    function() {
                        post.postContent = post.newPostContent;
                        notyService.showInfo( "Post edited successfully." );
                    },
                    function( error ) {
                        notyService.showError( "Failed to edit post!", error );
                    }
                );
            }
        };

        $scope.deletePost = function( post ) {
            if( authentication.isLogged() ) {
                postService( authentication.getSessionToken() ).removePost( post.id )
                    .$promise
                    .then(
                    function() {
                        var index =  $scope.posts.indexOf( post );
                        $scope.posts.splice( index, 1 );
                        notyService.showInfo( "Post deleted successfully." );
                    },
                    function( error ) {
                        notyService.showError( "Failed to delete post!", error );
                    }
                );
            }
        };

        $scope.likePost = function( post ) {
            if( authentication.isLogged() ) {
                postService( authentication.getSessionToken() ).like( post.id )
                    .$promise
                    .then(
                    function() {
                        notyService.showInfo( "Post liked successfully." );
                        post.liked = true;
                        post.likesCount += 1;
                    },
                    function( error ){
                        notyService.showError( "Failed to like post!", error );
                    }
                );
            }
        };

        $scope.unlikePost = function( post ) {
            if( authentication.isLogged() ) {
                postService( authentication.getSessionToken() ).unlike( post.id )
                    .$promise
                    .then(
                    function() {
                        notyService.showInfo( "Post unliked successfully." );
                        post.liked = false;
                        post.likesCount -= 1;
                    },
                    function( error ){
                        notyService.showError( "Failed to unlike post!", error );
                    }
                );
            }
        };
    }
);
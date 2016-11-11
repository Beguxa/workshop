app.config(function($routeProvider,$locationProvider) {
	
	console.log("Here");
    $routeProvider
	.when("/", {
        templateUrl : "/app/components/home/home.html",
		controller : "myCtrl"
    })
    .when("/x/:id", {
		templateUrl : "/app/components/author/authorData.html",
		controller : "authorController"
    })
    .when("/addBook", {
        templateUrl : "/app/components/book/addBook.html",
		controller : "bookController"
    })
	.when("/editBook/:book", {
        templateUrl : "/app/components/book/addBook.html",
		controller : "bookController"
    })
	.when("/addAuthor", {
        templateUrl : "/app/components/author/addAuthor.html",
		controller : "authorController"
    })
	.when("/editAuthor/:author", {
        templateUrl : "/app/components/author/addAuthor.html",
		controller : "authorController"
    });
	
	// enable HTML5mode to disable hashbang urls
       /*  $locationProvider.html5Mode(true); */
});
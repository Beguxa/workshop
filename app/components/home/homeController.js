
app.controller('myCtrl', function($scope,$http,formatArrayFilter,$rootScope,CRUIDService) {
	$scope.searchContent = "";
	$scope.myWelcome = [];
	var bookList = [];
	$scope.showAuthor = function()
	{
		alert("Inside showAuthor");
	$http({
            method :'POST',
            url:"http://172.27.12.104:3000/author/byname",
            data: { name : "Jerin John"},
            headers: {'Content-Type': 'application/json'}
        }).success(function (data) {
           
            console.log('data',data);
           
        });
	
	};
	
	$scope.x = function(){
	alert("Hi");
	};

    $http.get("http://172.27.12.104:3000/book/list")
    .then(function(response) {
        $scope.myWelcome = response.data;
		bookList = response.data;
    });
	$scope.search = function()
	{
/* 			 || $scope.myWelcome[x].isbn == $scope.searchContent || $scope.myWelcome[x].author == $scope.searchContent
 */		console.log("req 1 : ",$scope.searchContent);
 var arr = [];
 	
		for(x in bookList)
		{
			
			if(bookList[x].title.search($scope.searchContent) > -1 || bookList[x].isbn.search($scope.searchContent) > -1 ||bookList[x].author.search($scope.searchContent) > -1)
			{
				arr.push(bookList[x]);
				
			}
		}
		console.log(arr);
		if(arr.length != 0)
		{
			$scope.myWelcome = arr;
		}
	};
	
	
	
});


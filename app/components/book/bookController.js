app.controller("bookController",function($routeParams,$scope,$http,$rootScope,$timeout,$location,CRUIDService){
	
	$scope.avail = [{name:"Flipkart",value:false},
	{name:"Amazon",value:false},
	{name:"eBay",value:false},
	{name:"Google",value:false}];
	$scope.book = {};
	$scope.book.availableOn = [];
	
	if($location.path() == "/addBook") //requested view is addBook view
	{
		$scope.editForm = false; //hide the deleteButton
		$scope.disable = false;
	}
	else
	{
		var jsObj = JSON.parse($routeParams.book); 
		$scope.book = jsObj;	//convert the object coming from url for editing, into Javascript Object
		$scope.editForm = true; //show the deleteButton
		$scope.disable = true;
		var i = 0;
				for(x in $scope.avail)
				{
					
					if($scope.book.availableOn[i] === $scope.avail[x].name)
					{
						$scope.avail[x].value = true;
						i++;
					}
					
				}
		   
		
	}
	
	$scope.submit = function()
	{
		var id = $scope.book;
		var url = "";
		var method = 'GET';
		
		for(x in $scope.avail)  // code for adding the selected checkboxes values in data to be send
		{
			if($scope.avail[x].value === true)
			{
				$scope.book.availableOn.push($scope.avail[x].name);
				
			}
			
		}
		
		
		if($location.path() == "/addBook") // Do add Book 
		{
			url = "http://172.27.12.104:3000/book/new";
			method = 'POST';
			console.log($scope.book.availableOn);
		}
		else  // Do edit Book
		{
			url = "http://172.27.12.104:3000/book/update";
			url = encodeURI(url);
			method = 'PUT';
			
			
			   
			
			
		}
		
		callCRUIDService(id,url,method);		
	};
	
	
	
	$scope.delete = function() // delete data
	{
		
		var data = {"isbn":$scope.book.isbn};
		
		callCRUIDService(data,"http://172.27.12.104:3000/book/remove","DELETE");	
	};
	
	
	
	
	var callCRUIDService = function(id,url,method) //this function call CRUID Service for CRUID operations
	{
		CRUIDService.CRUIDServiceFunction(id,url,method) 
				.then(function(data){
					console.log("Got response : "+data);
					window.location.assign("http://127.0.0.1:8080/");
        
				},function(reason){
					console.log("Something went wrong : "+reason);
				});
	}
	
});


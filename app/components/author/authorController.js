app.controller("authorController",function($routeParams,$http,$scope,formatArrayFilter,$location,CRUIDService){
	
	var id = $routeParams.id;
$scope.names = ["Engineering","HR","Management"];

	$scope.Author = {};
	
	$scope.skills = [{name:"Angular",value:false},
	{name:"Backbone",value:false},
	{name:"css",value:false},
	{name:"HTML",value:false},
	{name:"Java",value:false},
	{name:"Javascript",value:false},
	{name:"Knockout",value:false}];
	$scope.Author.skills = [];
	$scope.editForm = false;
	$scope.disable = false;
	
	
	if($routeParams.author != null)
	{
		var jsObj = JSON.parse($routeParams.author);
		$scope.Author = jsObj;
		$scope.editForm = true;
		$scope.disable = true;
	}
	
	$http({
            method :'POST',
            url:"http://172.27.12.104:3000/author/byname",
            data: { name : id},
            headers: {'Content-Type': 'application/json'}
        }).success(function (data) {
			
           $scope.author = data;
		   
		  
		   if($location.path() != "/addAuthor")
		   {
			   var i = 0;
				for(x in $scope.skills)
				{
					
					if($scope.Author.skills[i] === $scope.skills[x].name)
					{
						$scope.skills[x].value = true;
						i++;
					}
					
				}
		   }
		   
        });
		
	
	$scope.submit = function()
	{
		
		var id = $scope.Author;
		var url = "";
		var method = 'GET';
		
		
		var arr = $scope.Author.skills;
		$scope.Author.skills = [];
		for(x in $scope.skills)  // code for adding the selected checkboxes values in data to be send
		{
			if($scope.skills[x].value === true)
			{
				$scope.Author.skills.push($scope.skills[x].name);
				
			}
			
		}
		
		
		if($location.path() == "/addAuthor") // Do add Book 
		{
			url = "http://172.27.12.104:3000/author/new";
			method = 'POST';
			
			if($scope.Author.department == null)
			{
				$scope.Author.department = "Engineering";
			}
			console.log("In Add : ",$scope.Author.skills);
		}
		else  // Do edit Book
		{
			url = "http://172.27.12.104:3000/author/update";
			url = encodeURI(url);
			method = 'PUT';
			
		}
		
		callCRUIDService(id,url,method);		
	};
	
	
	
	$scope.delete = function() // delete data
	{
		var data = {"empid": $scope.Author.empid};
		callCRUIDService(data,"http://172.27.12.104:3000/author/remove","DELETE");	
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


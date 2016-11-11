var app = angular.module('myApp', ["ngRoute"]);
app.filter("formatArray",function(){
	return function(array)
	{
		var str = "";
		
		for(i in array)
		{
			str = str+array[i]+", ";
		}
		str = str.slice(0,-2);
		return str;
	}
});


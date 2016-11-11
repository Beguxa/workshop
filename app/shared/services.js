app.service("CRUIDService",function($http,$q)
{
   this.CRUIDServiceFunction = function(id,url,method)
        {
            var deferred = $q.defer();
            console.log("deleteServiceFunction called");

                $http({
            method :method,
            url:url,
            data: id,
            headers: {'Content-Type': 'application/json;charset=utf-8'}
        }).success( function(response, status, headers, config) 
                {
                    deferred.resolve(response);
                    
                })
                .error(function(errResp) 
                {
                    deferred.reject({ message: "Cant fetch data this time" });
                });
                console.log("deffered promise : "+deferred.promise);
                return deferred.promise;

        };

});

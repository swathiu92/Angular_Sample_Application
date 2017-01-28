var app = angular.module('myApp', []);

app.controller('MainCtrl', function($scope) {
});

app.directive('validNumber', function($filter) {
  return {
    require: '?ngModel',
    link: function(scope, element, attrs, ngModelCtrl) {
      if(!ngModelCtrl) {
        return; 
      }
      
      ngModelCtrl.$parsers.push(function(val) {
        
       //clean = clean.toString();
       var test = val.toString().split('.');
       //console.log(test);
       //console.log("1::::"+val)
       test[0] = test[0].replace(/,/g , "");;
       var one = $filter('number')(test[0]);
        console.log("2::::"+test[0])
        if(angular.isDefined(test[1])) {
        var test2 = one + '.' + test[1];
        } else {
        var test2 = one;
        }
        //console.log("3::::"+val)
        
        if (val !== test2) {
         
          ngModelCtrl.$setViewValue(test2);
          ngModelCtrl.$render();
        }
        return test2;
      });
      
      element.bind('keypress', function(event) {
        if(event.keyCode === 32) {
          event.preventDefault();
        }
      });
    }
  };
});



<section ng-app="myApp" ng-controller="MainCtrl">
  <h4 class="text-center">AngularJS Numeric Value Widget</h4>
  <div class="well entry">
    <label>Employee Age
    <input type="text" ng-model="employee.age" valid-number placeholder="Enter an age" />
    </label>
  </div>
</section>

.entry {
  width: 300px;
  margin: 10px auto;
  text-align: center;
}


https://jsfiddle.net/U3pVM/29682/
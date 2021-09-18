app.directive('recommendationTag', function() {
  return {
    restrict: 'E',
    scope: {
      info: '='
    },
    templateUrl: './AngularJS/Directives/Views/recommendationBlock.html'
  };
});

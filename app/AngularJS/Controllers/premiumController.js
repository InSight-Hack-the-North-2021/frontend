//premiumController.js everything being debugged not final
app.controller('premiumController', function($scope, $http, $location, premiumData) {
    const API_ENDPOINT = 'http://localhost:8000/premium';
    let openResultsPage = () => {
      $location.path('/ratings').replace();
    };
    $scope.loader = false;
    $scope.getPremiumData = () => {
    console.log('Sending data...');
    $scope.loader = true;
    $http.get(API_ENDPOINT, {
    withCredentials: false}).then((result) => {result.data["premium"] = true;premiumData.setjsonData(result.data);$scope.loader=false;openResultsPage();}, () => {console.error("error!");});
    }
  })

//mainController.js everything being debugged not final
app.controller('mainController', function($scope, $http, $route, $location, shareImage, apiData, premiumData) {
  const API_ENDPOINT = 'http://localhost:8000/image/score';
  $scope.loader = false;

  let openResultsPage = () => {
    $location.path('/ratings').replace();
    //$scope.$apply();
  };

  $scope.SelectFile = function (e) {
  $scope.loader=true;
  $scope.imgsrc = URL.createObjectURL(e.target.files[0]);
  $scope.$digest();
  shareImage.setImgSrc($scope.imgsrc);
  var fd = new FormData();
  fd.append("image", e.target.files[0]);
  $http.post(API_ENDPOINT, fd, {
    withCredentials: false,
    headers: {'Content-Type': undefined},
    transformRequest: angular.indentity
  }).then((data)=>{apiData.setjsonData(data.data);$scope.loader=false;openResultsPage();premiumData.setjsonData({premium: false})},(err)=>{console.error(err);});
  };
})

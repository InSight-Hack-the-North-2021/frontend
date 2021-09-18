//mainController.js everything being debugged not final
app.controller('mainController', function($scope, $http, $route, $location, shareImage, apiData) {
  const API_ENDPOINT = 'https://makemecool.uc.r.appspot.com/image/score';
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
  }).then((data)=>{apiData.setjsonData(data.data);$scope.loader=false;openResultsPage();},(err)=>{console.error(err);});
  };
})

//premiumController.js everything being debugged not final
app.controller('premiumController', function($scope, $http, $location) {
    const API_ENDPOINT = 'https://makemecool.uc.r.appspot.com/premium';
  
    let openResultsPage = () => {
      $location.path('/premium').replace();
      //$scope.$apply();
    };
  
    const sendPost = () => {
        console.log("rishi chut hai");
    //   let apiEndpoint = "https://makemecool.uc.r.appspot.com/premium";
    //   console.log(apiEndpoint);
    //   $http.get(apiEndpoint, {}, {
    //     withCredentials: false}).then((result) => { console.log(result);}, () => { console.error("error!"); });
    }
  })
  
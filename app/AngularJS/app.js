var app = angular.module("mainApp", ["ngRoute", "angularCSS"]);
app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      controller: 'mainController',
      templateUrl: './AngularJS/Views/introView.html?v=8',
      css: './Styles/introStyle.css?v=8'
    })
    .when('/upload', {
      controller: 'mainController',
      templateUrl: './AngularJS/Views/uploadView.html?v=8',
      css: './Styles/uploadStyle.css?v=8'
    })
    .when('/delete', {
      controller: 'resultsController',
      templateUrl: './AngularJS/Views/deleteThisView.html?v=8',
      css: './Styles/style.css'
    })
    .when('/ratings', {
      controller: 'resultsController',
      templateUrl: './AngularJS/Views/ratingsView.html',
      css: ['./Styles/ratingStyle.css?v=17', "https://unicons.iconscout.com/release/v3.0.6/css/line.css", "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"],
    })
    .when('/premium', {
      controller: 'premiumController',
      templateUrl: './AngularJS/Views/premiumView.html',
      css: "./Styles/premiumStyle.css",
    })
    .otherwise({
      redirectTo: '/'
    });
});

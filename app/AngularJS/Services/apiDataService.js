//Service related to the API
app.factory('apiData', [function() {
  var jsonData = {};
  var apiObj = {};
  var premiumFalse = {premium: false};
  apiObj.setjsonData = (data) => {this.jsonData = data;};
  apiObj.getjsonData = () => {return this.jsonData;};
  return apiObj;
}]);

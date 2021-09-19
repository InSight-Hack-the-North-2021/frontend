//Service related to the API
app.factory('premiumData', [function() {
  var jsonData = {};
  var apiObj = {};
  apiObj.setjsonData = (data) =>
  {
    this.jsonData = data;
  };
  apiObj.getjsonData = () => {return this.jsonData;};
  return apiObj;
}]);

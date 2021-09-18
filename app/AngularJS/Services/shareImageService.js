//Service to share temporary image src
app.factory('shareImage', [function() {
  var imgsrc = "";
  var imgObj = {};
  imgObj.setImgSrc = (src) => {this.imgsrc = src;};
  imgObj.getImgSrc = () => {return this.imgsrc;};
  return imgObj;
}]);

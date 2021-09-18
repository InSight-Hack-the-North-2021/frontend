//mainController.js everything being debugged not final
app.controller('resultsController', function ($scope, $http, $location, shareImage, apiData) {
  $scope.description = ""
  let data = {}
  let recommendation = {};
  let labels = [];
  let nextHashtag = 5;
  let wrapper;
  let editableInput;
  let readonlyInput;
  let placeholder;
  let counter;
  let button;
  $scope.loader = false;
  $scope.fscore = 0;
  $scope.recommendations = [];
  $scope.hashtags = [];
  let cleanLabels = (arr) => {
    if(!arr){
      arr = [];
    }
    let reducedMap = arr.map((element, index) => { if (index < 5) { return element; } });
    let i = 0;
    for (x in reducedMap) {
      if (reducedMap[x]) {
        i++;
      }
    }
    reducedMap.length = i;
    nextHashtag = i;
    return reducedMap;
  }
  let cleanRecommendation = (obj) => {
    let arr = []
    Object.entries(obj).forEach(([key, value]) => {
      if (value) {
        let elem = [];
        elem.push(key);
        elem.push(value);
        arr.push(elem);
      }
    });
    return arr;
  };
  function validated(element) {
        let text;
        let maxLength = 280;
        let currentlength = element.innerText.length;

        if (currentlength <= 0) {
          placeholder.style.display = "block";
          counter.style.display = "none";
          button.classList.remove("active");
        } else {
          placeholder.style.display = "none";
          counter.style.display = "block";
          button.classList.add("active");
        }

        counter.innerText = maxLength - currentlength;

        if (currentlength > maxLength) {
          let overText = element.innerText.substr(maxLength); //extracting over texts
          overText = `<span class="highlight">${overText}</span>`; //creating new span and passing over texts
          text = element.innerText.substr(0, maxLength) + overText; //passing overText value in textTag variable
          readonlyInput.style.zIndex = "1";
          counter.style.color = "#e0245e";
          button.classList.remove("active");
        } else {
          readonlyInput.style.zIndex = "-1";
          counter.style.color = "#333";
        }

        readonlyInput.innerHTML = text; //replacing innerHTML of readonly div with textTag value
  }
  let drawGauge = (id, num) => {
    // for gauges
    var opts = {
      angle: 0.5, // The span of the gauge arc
      lineWidth: 0.1, // The line thickness
      radiusScale: 1, // Relative radius
      // percentColors: [[0.0, "#ff0000" ], [0.50, "#FFA500"], [1.0, "#00ff00"]],
      pointer: {
        length: 0.6, // // Relative to gauge radius
        strokeWidth: 0.035, // The thickness
        color: '#000000' // Fill color
      },
      limitMax: false,     // If false, max value increases automatically if value > maxValue
      limitMin: false,     // If true, the min value of the gauge will be fixed
      colorStart: '#6F6EA0',   // Colors
      colorStop: '#FF5757',    // just experiment with them
      strokeColor: '#EEEEEE',  // to see which ones work best for you
      generateGradient: true,
      highDpiSupport: true,     // High resolution support

    };
    var target = document.getElementById(id); // your canvas element
    var gauge = new Donut(target).setOptions(opts); // create sexy gauge!

    gauge.maxValue = 100; // set max gauge value
    gauge.setMinValue(0);  // Prefer setter over gauge.minValue = 0
    gauge.animationSpeed = 32; // set animation speed (32 is default value)
    gauge.set(num); // set actual value
  }
  $scope.imgsrc = "";
  $scope.redirectUpload = () => {
    $location.path('/upload').replace();
  }
  $scope.init = () => {
    wrapper = document.querySelector(".wrapper");
    editableInput = wrapper.querySelector(".editable");
    readonlyInput = wrapper.querySelector(".readonly");
    placeholder = wrapper.querySelector(".placeholder");
    counter = wrapper.querySelector(".counter");
    button = wrapper.querySelector("button");

    console.log("here is wrapper" + wrapper);

    editableInput.onfocus = () => {
      placeholder.style.color = "#c5ccd3";
    }

    editableInput.onblur = () => {
      placeholder.style.color = "#98a5b1";
    }

    editableInput.onkeyup = (e) => {
      let element = e.target;
      validated(element);
    }

    editableInput.onkeypress = (e) => {
      let element = e.target;
      validated(element);
      placeholder.style.display = "none";
    }

    $scope.imgsrc = shareImage.getImgSrc();
    data = apiData.getjsonData();
    recommendation = data.recommendation;
    console.log(data);
    $scope.recommendations = cleanRecommendation(recommendation);
    labels = data.labels;
    $scope.hashtags = cleanLabels(labels);
    $scope.fscore = data["Final score"];
    drawGauge('finalScore', $scope.fscore);
  };
  $scope.useHashtag = (hashtag) => {
    hashtag = hashtag.replaceAll(' ', '_');
    editableInput.innerHTML += " #";
    editableInput.innerHTML += hashtag;
    $scope.hashtags.splice($scope.hashtags.indexOf(hashtag), 1);
    if (labels[nextHashtag]) {
      $scope.hashtags.push(labels[nextHashtag]);
      nextHashtag += 1;
    }
  }
  $scope.sendPost = () => {
    $scope.loader = true;
    console.log(editableInput.innerHTML);
    let apiEndpoint = "https://makemecool.uc.r.appspot.com/hootsuite/schedulePost/";
    console.log(apiEndpoint);
    $http.post(apiEndpoint, {text: editableInput.innerHTML}, {
      withCredentials: false}).then(() => { console.log('success! posted tweet!'); $scope.loader=false; $location.path('/').replace();}, () => { console.error("error!");});
  }
})

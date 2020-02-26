/*self.importScripts('words.js');
onmessage = function(event) {
  postMessage(encode(event.data));
}*/

var encodeMap = {0:"a",1:"b",2:"c",3:"d",4:"e",5:"f",6:"g",7:"h",8:"i",9:"j",a:"k",b:"l",c:"m",d:"n",e:"o",f:"p",g:"q",h:"r",i:"s",j:"t",k:"u",l:"v",m:"w",n:"x",o:"y",p:"z"};
var decodeMap = {a:"0",b:"1",c:"2",d:"3",e:"4",f:"5",g:"6",h:"7",i:"8",j:"9",k:"a",l:"b",m:"c",n:"d",o:"e",p:"f",q:"g",r:"h",s:"i",t:"j",u:"k",v:"l",w:"m",x:"n",y:"o",z:"p"};

function encode(str) {
  str = clean(str.replace(/-/g," "));
  var arr = str.split(" ");
  arr.cleanArr("");
  var res = new Array();
  for (var i = 0; i < arr.length; i++) {
    arr[i] = match(arr[i]);
  }
  var temp = "";
  var comp = false;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].length === 3 && arr[i].charAt(0) !== " ") {
      temp += arr[i];
      comp = true;
    }
    else if (comp === true && arr[i].length < 3) {
      temp += arr[i];
      res.push(temp);
      temp = "";
      comp = false;
    }
    else {
      if (temp !== "") {
        res.push(temp);
        temp = "";
      }
      res.push(arr[i]);
      comp = false;
    }
  }
  if (temp !== "") {
    res.push(temp);
  }
  //for no chaining of three characters
  //res = arr;
  //
  str = res.join(" ");
  logGram(str);
  return str;
}

function decode(str) {
  init = str.split(" ");
  comp = true;
  res = new Array();
  arr = new Array();
  for (var i = 0; i < init.length; i++) {
    var current = init[i];
    if (current.length < 4 || init[i - 1] === "") {
      arr.push(current);
    }
    else {
      var temp = "";
      for (var a = 0; a < current.length; a++) {
        if (temp.length < 3) {
          temp += current.charAt(a);
        }
        else {
          arr.push(temp);
          temp = "";
          a--;
        }
      }
      arr.push(temp);
    }
  }
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === "") {
      comp = false;
    }
    else {
      if (comp) {
        res.push(words[baseDecode(arr[i])]);
      }
      else {
        res.push(arr[i]);
      }
      comp = true;
    }
  }
  ret = res.join(" ");
  return ret;
}

function baseEncode(num) {
	var str = num.toString(26);
  var re = new RegExp(Object.keys(encodeMap).join("|"),"gi");
  str = str.replace(re, function(m){
    return encodeMap[m];
  });
  return str;
}

function baseDecode(str) {
  var re = new RegExp(Object.keys(decodeMap).join("|"),"gi");
  str = str.replace(re, function(m){
    return decodeMap[m];
  });
	var num = parseInt(str,26);
  return num;
}

function match(str) {
  if (words.includes(clean(str))) {
    return baseEncode(words.indexOf(clean(str)));
  }
  else {
    return " " + str;
  }
}

function factorialDecode(data,fact) {
  if (fact === 1) {
    return decode(data);
  }
  else {
    return factorialDecode(decode(data),fact - 1);
  }
}

function clean(str) {
  return str.toLowerCase().replace(/[^a-z\s+]/g, '');
}

Array.prototype.cleanArr = function(deleteValue) {
  for (var i = 0; i < this.length; i++) {
    if (this[i] == deleteValue) {
      this.splice(i, 1);
      i--;
    }
  }
  return this;
};

function logGram(str) {
  /*
  var temp = str.split(" ");
  for (var i = 0; i < temp.length; i++) {
    temp[i] = temp[i].length;
  }
  str = temp.join(" ");
  var arr = nlp(str).ngrams().data();
  var res = new Array();
  for (var i = 0; i < arr.length; i++) {
    res.push((arr[i].size - 1) * arr[i].count);
  }
  var maxIndex = indexOfMax(res);
  console.log(arr);
  console.log(arr[maxIndex].normal);
  console.log(res[maxIndex]);
  */
}

function indexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }
    var max = arr[0];
    var maxIndex = 0;
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }
    return maxIndex;
}

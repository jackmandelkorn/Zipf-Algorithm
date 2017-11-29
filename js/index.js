/*
w = new Worker("js/zipf.js");
w.onmessage = function(event){
  receive(event.data);
};
function transmit(text) {
  w.postMessage(text);
}
function receive(text) {
  console.log(text);
}*/
var t0;
var t1;

$('#plain-input').bind('input propertychange', function() {
    plainUpdate();
});
$('#compressed-input').bind('input propertychange', function() {
    compUpdate();
});

function plainUpdate() {
  if (document.getElementById("plain-input").value !== "") {
    stamp(0);
    document.getElementById("compressed-input").value = encode(document.getElementById("plain-input").value);
    stamp(1);
  }
  else {
    document.getElementById("compressed-input").value = "";
  }
  updateLengths();
  //console.log(nlp(clean(document.getElementById("compressed-input").value)).ngrams().bigrams(0).data());
}

function compUpdate() {
  if (document.getElementById("compressed-input").value !== "") {
    stamp(0);
    document.getElementById("plain-input").value = decode(document.getElementById("compressed-input").value);
    stamp(1);
  }
  else {
    document.getElementById("plain-input").value = "";
  }
  updateLengths();
}

function updateLengths() {
  time = stamp(2);
  var kbps = Math.round((((clean(document.getElementById("plain-input").value).length * 8) - (clean(document.getElementById("compressed-input").value).length * 8)) / 1000) / (time / 1000));
  if (kbps < 0) {
    kbps = 0;
  }
  document.getElementById("plain-length").innerHTML = clean(document.getElementById("plain-input").value).length;
  document.getElementById("compressed-length").innerHTML = clean(document.getElementById("compressed-input").value).length;
  document.getElementById("space-saved").innerHTML = "<b style='color:white;background-color:black;padding:2px;'>" + ((Math.round((1 - (clean(document.getElementById("compressed-input").value).length/clean(document.getElementById("plain-input").value).length)) * 1000) / 10) || 0) + "%</b> in " + Math.floor(time) + "ms (" + kbps + "kbps)";
}

function stamp(on) {
  if (on === 0) {
    t0 = performance.now();
  }
  else if (on === 1) {
    t1 = performance.now();
  }
  else {
    return (t1 - t0);
  }
}

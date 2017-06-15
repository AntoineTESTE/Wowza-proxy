//__________________________________________________________
var wowzaServices = (function () {
  function wowzaServices(http) {
    this.http = http;
    this.baseUrl = 'http://video1.livee.com:8086/livestreamrecord';
  }

  wowzaServices.prototype.startRecording = function () {
    return this.http.get(this.baseUrl + "/start")

  };

  wowzaServices.prototype.stopRecoding = function () {
    return this.http.get(this.baseUrl + "/stop/");
  };


  return wowzaServices;
});
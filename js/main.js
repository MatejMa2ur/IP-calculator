function showResults() {
  var ipAdd = document.getElementById('ipAdd').value;
  var prefix = document.getElementById('prefix').value;

  var subnetMask = "";
  var broadcast = "";
  var network = "";
  var ipCount = 0;

  if(ipAdd && prefix) {
    var ipAddress = "";
    prefix = prefix.replace("/", "");
    var pref = parseInt(prefix);
    ipCount = Array.from(ipAdd.split("."), (item, i) => ((256 ** (3 - i)) * parseInt(item))).reduce((a, c) => a + c);

    ipAddress = Array.from(ipAdd.split("."), item => (parseInt(item)).toString(2).padStart(8, '0')).join('');

    var hosts = ((2 ** (32 - pref)) - 2).toString();

    var pomocNetwork = "";
    var pomocBroadcast = "";
    var pomocMask = "";
    for (var i = 0; i < ipAddress.length; i++) {
      if (i < pref) {
        pomocNetwork += ipAddress[i];
        pomocBroadcast += ipAddress[i];
        pomocMask += "1";
      } else {
        pomocNetwork += "0";
        pomocBroadcast += "1";
        pomocMask += "0";
      }
      if ((i + 1) % 8 == 0) {
        subnetMask += "." + parseInt(pomocMask, 2); pomocMask = "";
        network += "." + parseInt(pomocNetwork, 2); pomocNetwork = "";
        broadcast += "." + parseInt(pomocBroadcast, 2); pomocBroadcast = "";
      }
    }

    document.getElementById('network').textContent = "Network: " + network.substr(1);
    document.getElementById('broadcast').textContent = "Broadcast: " + broadcast.substr(1);
    document.getElementById('subnetMask').textContent = "Subnet Mask: " + subnetMask.substr(1);
    document.getElementById('hosts').textContent = "Hosts: " + hosts;
    document.getElementById('ipCount').textContent = "IP count: " + ipCount.toString();
  }
}

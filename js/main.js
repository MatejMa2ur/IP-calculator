function showResults() {
  var ipAdd = document.getElementById('ipAdd').value;
  var prefix = document.getElementById('prefix').value;

  var subnetMask = "";
  var broadcast = "";
  var network = "";
  var ipCount = 0;

  if(ipAdd && prefix) {
    var ipAddress;
    prefix = prefix.replace("/", "");
    var pref = parseInt(prefix);

    ipAddress = Array.from(ipAdd.split("."), item => (parseInt(item)).toString(2).padStart(8, '0')).join('');

    var hosts = ((2 ** (32 - pref)) - 2).toString();

    var helperNetwork = "";
    var helperBroadcast = "";
    var helperMask = "";
    for (var i = 0; i < ipAddress.length; i++) {
      if (i < pref) {
        helperNetwork += ipAddress[i];
        helperBroadcast += ipAddress[i];
        helperMask += "1";
      } else {
        helperNetwork += "0";
        helperBroadcast += "1";
        helperMask += "0";
      }
      if ((i + 1) % 8 === 0) {
        subnetMask += "." + parseInt(helperMask, 2); helperMask = "";
        network += "." + parseInt(helperNetwork, 2); helperNetwork = "";
        broadcast += "." + parseInt(helperBroadcast, 2); helperBroadcast = "";
      }
    }

    ipCount = ipToDecimal(ipAdd) - ipToDecimal(network.substr(1));

    document.getElementById('network').textContent = "Network: " + network.substr(1);
    document.getElementById('broadcast').textContent = "Broadcast: " + broadcast.substr(1);
    document.getElementById('subnetMask').textContent = "Subnet Mask: " + subnetMask.substr(1);
    document.getElementById('hosts').textContent = "Hosts: " + hosts;
    document.getElementById('ipCount').textContent = "IP count: " + ipCount.toString();
  }
}


function ipToDecimal(ipAdd) {
  return ipAdd.split(".")
    .map((octet, index) => parseInt(octet) * (256**(3-index)))
    .reduce((acc, val) => acc + val, 0);
}

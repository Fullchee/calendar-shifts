/**
 * formatTime('["09:00","17:00"]') => 9 AM - 5 PM
 */
export default shift => {
  if (typeof shift === "string") {
    shift = JSON.parse(shift);
  }
  return shift.map(militaryToAMPM).join(" - ");
};

/**
 * military("09:00") => 9:00AM
 */
function militaryToAMPM(time) {
  var H = +time.substr(0, 2);
  var h = H % 12 || 12;
  var ampm = H < 12 ? "AM" : "PM";
  return h + time.substr(2, 3) + ampm;
}

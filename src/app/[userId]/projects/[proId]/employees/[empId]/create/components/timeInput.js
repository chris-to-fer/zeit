export default function timeInput(value1, value2) {
  var option = document.createElement("option");
  option.text = value2;
  option.value = value1;
  return option;
}

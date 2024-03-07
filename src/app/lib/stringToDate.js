//make dates out of mongo strings of start- and end-time !warning! due to DST needs to be this format
export default function StringToDate(string) {
  const [HH, MM] = string.split(":");
  const H = parseInt(HH) === 0 ? 0 : parseInt(HH);
  const M = parseInt(MM) === 0 ? 0 : parseInt(MM);
  return new Date(1970, 0, 1, H, M, 0);
}



export default function shortened(str) {
  let data = str.toString()
  return data.substring(0, 5) + "...." + data.substring(str.length - 4);
}
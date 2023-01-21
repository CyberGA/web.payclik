

export default function shortened(str) {
  return str.substring(0, 5) + "...." + str.substring(str.length - 4);
}
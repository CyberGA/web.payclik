import { BigNumber, ethers } from "ethers";

export default function getDate() {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "April",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const date = new Date();
  return `Today ${date.getDate()} ${
    months[date.getMonth()]
  }, ${date.getFullYear()} `;
}

export async function timeStampToDate(stamp) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "April",
    "May",
    "Jun",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const time = await stamp;
  const date = new Date(time*1000);
  return `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()} `;
}

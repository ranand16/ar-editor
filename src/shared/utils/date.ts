import { WEEKDAYS } from "./../../config/constants";
import dayjs from "dayjs";
import { DATE_FORMATS } from "../../config/constants";
import isBetween from "dayjs/plugin/isBetween";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

export const getAge = (timeStamp = 0): { years: number; months: number } => {
  if (!timeStamp) {
    return { years: 0, months: 0 };
  }
  const now = dayjs();
  const dayjsObj = dayjs.unix(timeStamp);
  const monthsTillNow = now.diff(dayjsObj, "month");
  const years = Math.floor(monthsTillNow / 12);
  const months = monthsTillNow % 12;
  return { years, months };
};

export const getDate = (timeStamp = 0, format?: DATE_FORMATS): string => {
  if (!timeStamp) {
    return "";
  }
  return dayjs.unix(timeStamp).format(format || DATE_FORMATS.STANDARD);
};

export const getTimeStamp = (dateObj) => {
  return dayjs(dateObj).unix();
};

export const isSameDate = (date1: Date, date2: Date) => {
  return dayjs(date1).isSame(date2, "day");
};

export const convertTimeToTwelveHourFormat = (time) => {
  if (!time) {
    return;
  }
  time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [
    time,
  ];

  if (time.length > 1) {
    time = time.slice(1, 4);
    time[5] = +time[0] < 12 ? "AM" : "PM";
    time[0] = +time[0] % 12 || 12;
  }
  return time.join("");
};

export const getDestructedDateValue = (
  param: Date,
  monthFormat?: "M" | "MM" | "MMM" | "MMMM"
) => {
  const day = WEEKDAYS[dayjs(param).day()];
  const date = dayjs(param).format("DD");
  const month = dayjs(param).format(monthFormat || "MMMM");
  return { day, date, month };
};

export const isAfterOrBefore30Min = (
  date: number,
  starttime: string,
  endtime: string
): boolean => {
  if (!date || !starttime || !endtime) {
    return false;
  }
  const formatDate = dayjs(date * 1000).format("YYYY-MM-DD");
  const currentTime = dayjs(new Date()).unix() * 1000;
  const after30MinuteDate =
    dayjs(`${formatDate} ${endtime}`).add(30, "minute").unix() * 1000;
  const before30MinuteDate =
    dayjs(`${formatDate} ${starttime}`).subtract(30, "minute").unix() * 1000;
  dayjs.extend(isBetween);
  return dayjs(currentTime).isBetween(before30MinuteDate, after30MinuteDate);
};

export const isPastCurrentDate = (date: number) =>
  dayjs.unix(date).isAfter(dayjs());

export const isSameTimezone = (tz: string) => {
  dayjs.extend(utc);
  dayjs.extend(timezone);
  const systemTz = dayjs.tz.guess();
  const finalJson = {
    same: false,
    tz: systemTz,
  };

  // eslint-disable-next-line
  if (systemTz != tz) {
    // eslint-disable-next-line
    if (systemTz == "Asia/Calcutta" && tz == "Asia/Kolkata") {
      finalJson.same = true;
      finalJson.tz = tz;
    }
    // eslint-disable-next-line
    if (systemTz == "Asia/Calcutta") {
      finalJson.tz = "Asia/Kolkata";
    }
  } else {
    finalJson.same = true;
  }

  return finalJson;
};

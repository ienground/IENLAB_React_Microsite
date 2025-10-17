import {useTranslation} from "react-i18next";
import dayjs from "dayjs";

function useBasicDateTimeFormat(date: Date, format: string) {
  const { t } = useTranslation();
  return dayjs(date).format(t(format));
}

export function useDateTimeFormat(date: Date) {
  return useBasicDateTimeFormat(date, "strings:datetime.date_time_format");
}

export function useDateFormat(date: Date) {
  return useBasicDateTimeFormat(date, "strings:datetime.date_format");
}

export function useTimeFormat(date: Date) {
  return useBasicDateTimeFormat(date, "strings:datetime.time_format");
}
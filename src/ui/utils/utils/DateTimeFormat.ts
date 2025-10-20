import {useTranslation} from "react-i18next";
import dayjs from "dayjs";
import {useMemo} from 'react';
import type {TFunction} from "i18next";

function formatBaseDateTime(date: Date, formatKey: string, t: TFunction): string {
  // 날짜가 유효한지 먼저 체크
  if (!date || !dayjs(date).isValid()) {
    return '';
  }
  return dayjs(date).format(t(formatKey));
}

export function useDateTimeFormatters() {
  const { t } = useTranslation(); // 💡 Hook은 여기서 한 번만 호출됩니다.

  return useMemo(() => ({
    useBasicDateTimeFormat: (date: Date, format: string) => formatBaseDateTime(date, format, t),
    dateTimeFormat: (date: Date) => formatBaseDateTime(date, "strings:datetime.date_time_format", t),
    dateFormat: (date: Date) => formatBaseDateTime(date, "strings:datetime.date_format", t),
    timeFormat: (date: Date) => formatBaseDateTime(date, "strings:datetime.time_format", t),

  }), [t]);
}
import * as dateFns from "date-fns";

export const dateServices = (date: number) => {
    const newDate = new Date(date * 1000);
    const humanDate = dateFns.intlFormatDistance(newDate, new Date());
    return humanDate
}
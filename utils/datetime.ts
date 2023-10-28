import moment from "moment";

const DATE_FORMAT = "ddd, DD MMM YYYY";
const TIME_FORMAT = "hh:mm:ss A";

export const getCurrentDate = () => moment().format(DATE_FORMAT);

export const getCurrentTime = () => moment().format(TIME_FORMAT);

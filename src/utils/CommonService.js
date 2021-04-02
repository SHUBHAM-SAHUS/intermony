import toastr from "toastr";
import { BehaviorSubject } from "rx";
toastr.options = {
  positionClass: "toast-top-right",
  showDuration: "300",
  timeOut: 3000,
  closeButton: true,
  showEasing: "swing",
  hideEasing: "linear",
  showMethod: "fadeIn",
  hideMethod: "fadeOut"
};
// for global loader service
export const isLoading = new BehaviorSubject(false);

export const forSuccess = (message, title) => toastr.success(message, title);

export const forError = (message, title) => toastr.error(message, title);

export const forWarning = (message, title) => toastr.warning(message, title);

export const isDialogOpen = new BehaviorSubject(false);

export const getFullName = obj => {
  if (obj) return obj.first_name + " " + obj.last_name;
  else return "";
};

export const getSearchParams = (history, key) => {
  const queryParamsString = history.location.search.substring(1), // remove the "?" at the start
      searchParams = new URLSearchParams( queryParamsString );
  return searchParams.get(key)
};

export const currencyFormat = number => {
  let fixedTwo = parseFloat(number.toFixed(2));
  return new Intl.NumberFormat("en-IN").format(fixedTwo);
};

export const secondsToMinutes = (time) => {
  let sec = Math.floor(time % 60) < 10 ? `0${Math.floor(time % 60)}` : Math.floor(time % 60);
  return `${Math.floor(time / 60)}:${sec}`;
}
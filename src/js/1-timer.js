import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const startBtn = document.querySelector('button[data-start]');
const dataTimePicker = document.querySelector('#datetime-picker');
const field = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let userSelectedDate = null;
let intervalID = null;
let isActive = false;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (!selectedDates[0] || selectedDates[0] <= new Date()) {
      iziToast.show({
        title: 'Error',
        message: 'Please choose a date in the future!',
        position: 'topRight',
        titleColor: 'white',
        messageColor: 'white',
        backgroundColor: 'red',
      });
      startBtn.disabled = true;
    } else {
      userSelectedDate = selectedDates[0];
      startBtn.disabled = false;
    }
  },
};

flatpickr(dataTimePicker, options);

startBtn.addEventListener('click', start);

function start() {
  if (isActive || !userSelectedDate) {
    return;
  }

  isActive = true;
  startBtn.disabled = true;
  dataTimePicker.disabled = true;

  intervalID = setInterval(() => {
    const currentTime = Date.now();
    const deltaTime = userSelectedDate - currentTime;

    if (deltaTime <= 0) {
      stop();
      return;
    }

    const time = convertMs(deltaTime);
    updateField(time);
  }, 1000);
}

function stop() {
  clearInterval(intervalID);
  isActive = false;
  startBtn.disabled = true;
  dataTimePicker.disabled = false;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateField({ days, hours, minutes, seconds }) {
  field.days.textContent = addLeadingZero(days);
  field.hours.textContent = addLeadingZero(hours);
  field.minutes.textContent = addLeadingZero(minutes);
  field.seconds.textContent = addLeadingZero(seconds);
}

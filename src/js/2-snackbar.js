import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', handleSubmit);

function showMessage(status, message) {
  iziToast.show({
    title: status,
    message: message,
    position: 'center',
    timeout: 5000,
    backgroundColor: status === 'Fulfilled' ? 'green' : 'red',
  });
}

function handleSubmit(event) {
  event.preventDefault();

  const delay = parseInt(event.target.elements.delay.value, 10);
  const state = event.target.elements.state.value;

  createPromise(delay, state)
    .then(delay => {
      showMessage('Fulfilled', `✅ Fulfilled promise in ${delay}ms`);
    })
    .catch(delay => {
      showMessage(`Rejected`, `❌ Rejected promise in ${delay}ms`);
    });
}

function createPromise(delay, state) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}

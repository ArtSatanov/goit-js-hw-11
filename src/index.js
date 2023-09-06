import {onSubmit} from './interface-part';

const refs = {
   form: document.querySelector('#search-form'),
   input: document.querySelector('input[type="text"]'),
   button: document.querySelector('button[type="submit"]'),
   container: document.querySelector('.gallery'),
};

refs.form.addEventListener('submit', onSubmit);






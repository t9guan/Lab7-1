// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too

document.addEventListener('DOMContentLoaded', () => {
  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      var i = 1;
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        document.querySelector('main').appendChild(newPost);
        newPost.addEventListener('click', () => {
          console.log('clicked');
          setState(newPost,i);
          i++;
          document.body.classList.add('single-entry');
          document.querySelector('h1').innerHTML = 'Entry ' + i;
          document.querySelector('entry-page').remove();
          document.querySelector('body').appendChild(document.createElement('entry-page'));
          document.querySelector('entry-page').entry = entry;
        });
      });
    });
});

document.querySelector('h1').addEventListener('click', () => {
  console.log('clicked');
  setState('home');
  document.body.classList.remove('settings');
  document.body.classList.remove('single-entry');
  document.querySelector('h1').innerHTML = 'Journal Entries';
});

document.querySelector('img').addEventListener('click', () => {
  console.log('clicked');
  setState('settings');
  document.body.classList.add('settings');
  document.querySelector('h1').innerHTML = 'Settings';
});

import id from './locales/id';
import axios from 'axios';

const web =  {

  attendanceList : null,
  minGrade       : 10,
  maxGrade       : 12,
  departments    : {
    'itl' : 1,
    'tkj' : 3,
    'tav' : 2
  },

  _ : (key, values) => {
 
    if(!id[key])
      return '';

    return id[key];

  },

  render : () => 0,
  navigate : path => 0,
  isMobile : () => window.innerWidth <= 800,
  
  logout : () => {
    web.axios({
      url : 'logout',
      method : 'POST'
    }).then(r => web.dstrg('is_login'));
  },

  strg : (key, value) => {

    if(!value)
      return window.localStorage.getItem(key);

    window.localStorage.setItem(key, value);
    window.dispatchEvent(new Event('storage'));
  },

  dstrg : key => {
    window.localStorage.removeItem(key);
    window.dispatchEvent(new Event('storage'));
  },

  set   : (key, value) => {
    web[key] = value;
    web.render();
  },

  alertProps : {},

  alert : (severity, message, title) => {
    web.set('alertProps', {open:true, severity, message, title});
  },

  axios : async config => {
    const server = 'http://127.0.0.1:8000/';
    if(!/get/gi.test(config.method) && config.method !== undefined){
      await axios({
        url : server + 'sanctum/csrf-cookie',
        withCredentials : true
      });
    }
    config.withCredentials = true;
    config.url = server + 'api/' + config.url;
    return axios(config);
  }

};

export default web;
import id from './locales/id';
import en from './locales/en';
import axios from 'axios';
import Cookie from './Cookie';

const web =  {
  title : 'Absensi SMK Negeri 2 Panyabungan',
  Cookie,
  server : (() => {
    let {
      protocol,
      hostname,
      port
    } = window.location;
    port = 8000;
    return `${protocol}//${hostname}:${port}/`;
  })(),
  users          : {},
  minGrade       : 10,
  maxGrade       : 12,
  departments    : {
    'itl' : 1,
    'tav' : 2,
    'tgb' : 1,
    'tkj' : 3,
    'tkk' : 1,
    'tkr' : 2,
    'tsm' : 2,
  },
  components:{
    QrLogs : {
      logs : {
        list : [],
        time : 0,
        add(time, color, text){
          this.list.push(time + ',' + color + ',' + text);
          this.time = time;
        },
      }
    }
  },
  component(component, property, value, rerender = true){

    const components = window.web.components || {};

    if(!components[component])
      components[component] = {};

    if(!property)
      return components[component];

    if(value === undefined)
      return components[component][property];

    components[component][property] = value;
    window.web.components = components;

    if(components[component].render && rerender)
      components[component].render();

  },

  _ : (key, values) => {

    const languages = {id, en};
    let lang = web.Cookie.get('lang');

    if(Object.keys(languages).indexOf(lang) === -1){
      web.Cookie.set('lang', 'id');
      lang = 'id';
    }

    let value =  languages[lang][key];

    if(!value)
      return key;

    for(let key in values)
      value = value.replace(':' + key, values[key]);

    return value;

  },

  loading  : state => state,
  render   : () => 0,
  navigate : path => 0,
  isMobile : () => window.innerWidth <= 800,
  
  logout : () => {
    web.axios({
      url     : 'logout',
      method  : 'POST',
      loading : true
    }).then(r => web.dstrg('is_login'))
    .catch(e => web.dstrg('is_login'));
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

    if(config.loading){
      web.loading(true);
      config.loading = undefined;
    }

    const server = window.web.server;

    if(!/get/gi.test(config.method) && config.method !== undefined){
      await axios({
        url : server + 'sanctum/csrf-cookie',
        withCredentials : true
      });
    }

    config.withCredentials = true;
    config.url = server + 'api/' + config.url;

    const data = await axios(config);
 
    web.loading(false);
    return data;

  },

  axiosErrorHandling : e => {
    if(e.response){
      web.alert(
        'error',
        e.response.data.message,
        e.response.status
      );
    }
  },

  setUsersTimeout : null,

  lastUpdateUsers : -1,
  firstUpdateUsers : true,
  setUsers : () => {
    web.axios({
      url     : 'user?last_update=' + web.lastUpdateUsers,
      loading : web.firstUpdateUsers
    })
    .then(r => {

      web.firstUpdateUsers = false;

      let updated = false;

      for(let user of r.data){

        if(new Date(user.updated_at) > new Date(web.lastUpdateUsers))
          web.lastUpdateUsers = user.updated_at || 0;

        web.users[String(user.id)] = Object.assign(web.users[String(user.id)] || {},  user);
        updated = true;

      }

      if(web.setUsersTimeout)
        window.clearTimeout(web.setUsersTimeout);

      web.setUsersTimeout = setTimeout(web.setUsers, 10000);

      if(updated || web.component('QrScannerDialog', 'open'))
        web.render();

    });
  },

  zeroPadding : (number, length) => {
    number = String(number);
    for(let i=number.length;i<length;i++)
      number = '0' + number;
    return number;
  }

};

export default web;
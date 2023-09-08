import id from './locales/id';
import web from './web';
import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import MyRoutes from './components/MyRoutes';
import Alert from './components/Alert';
import Header from './components/Header';
import MobileMenu from './components/MobileMenu';
import Login from './components/Login';
import Footer from './components/Footer';
import Main from './components/Main';
import Loading from './components/Loading';
import BackgroundImage from './bg.jpg';
window.web = web;

function App(){

  const [render, setRender] = useState(1);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const {strg, dstrg} = window.web;

  window.web.render    = ()    => setRender(render * -1);
  window.web.loading   = state => setIsLoading(state);
  window.onstorage     = ()    => window.web.render();
  window.web.navigate  = path  => {
    navigate(path);
    window.web.render();
  };

  useEffect(() => {

    window.web.axios({url:'login-check'})
    .then(r => strg('is_login', true))
    .catch(e => dstrg('is_login'));

  }, []);

  useEffect(() => {
    window.web.setUsers();
    if(web.Cookie.get('lang') === '')
      web.Cookie.set('lang', 'id');
  }, []);

  return (
    <>
      {strg('is_login') &&
        <>
          <Header onMenuClick={e => setMobileMenu(!mobileMenu)}/>
          <Main/>
          <Footer/>
          <MobileMenu
            open={mobileMenu}
            onClose={e => setMobileMenu(!mobileMenu)}
            onOpen={e => setMobileMenu(!mobileMenu)}/>
        </>
      }
      {!strg('is_login') && <Login/>}
      <Alert/>
      <Loading open={isLoading}/>
    </>
  );
}

export default App;
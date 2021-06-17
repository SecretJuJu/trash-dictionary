import { useState, useLayoutEffect } from 'react';
import { checkLogined } from '../utils/auth';
import { Route, Switch } from 'react-router-dom';

import Routes from '../pages'
import './App.css';
const App = (props: any) =>{
  const [isLogined, setIsLogined] = useState(false) 
  useLayoutEffect(() => {
    checkLogin()
  })

  const checkLogin = () => {
    setIsLogined(checkLogined())
  }

  return (
    <Switch>
      <Route exact path="/" render={()=><Routes.Home  isLogined={isLogined} />} />
      <Route exact path="/login" render={()=> <Routes.Login />}/>
      <Route exact path="/register" component={Routes.Register}/>
      <Route exact path="/logout" component={Routes.Logout}/>
      {
        isLogined?
        
          <Route exact path="/newFeed" component={Routes.NewFeed}></Route>
        : <></>
      }
      <Route exact path="/feed/:id" component={Routes.Feed}/>
      <Route>
        <div> 404 Not Found </div>
      </Route>
    </Switch>
  );
}

export default App;

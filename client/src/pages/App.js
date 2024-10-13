// App.js
import React, { useState, useEffect } from 'react';
import { GoogleOAuthProvider } from 'react-oauth/google';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home';
import CardCreation from './CardCreation';
import SocialCardDisplay from './SocialCardDisplay';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is logged in
    fetch('/api/auth/google/callback')
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  return (
    <GoogleOAuthProvider clientId={process.env.GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/card-creation" component={CardCreation} />
          <Route path="/social-cards" component={SocialCardDisplay} />
        </Switch>
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
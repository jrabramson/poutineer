import React from 'react';
import { Link } from 'react-router-dom';

export default ({
  handleSubmit,
  renderError,
  setPassword,
  setEmail
}) => {
  return (
    <div className='view-container sessions new'>
      <main>
        <header>
          <img src="/images/poutineer.png"/>
          <h1>Poutineer</h1>
        </header>
        <form id="sign_in_form" onSubmit={handleSubmit}>
          {renderError()}
          <div className="field">
            <input
              type="Email"
              id="user_email"
              placeholder="Email"
              required="true"
              defaultValue="fake@poutineer.com"
              onChange={e => setEmail(e.currentTarget.value)} />
          </div>
          <div className="field">
            <input
              type="password"
              id="user_password"
              placeholder="Password"
              required="true"
              defaultValue="12345678"
              onChange={e => setPassword(e.currentTarget.value)} />
          </div>
          <button type="submit">Sign in</button>
        </form>
        <p>What are you waiting for? <Link to="/sign_up">Create new account</Link>, eh!</p>
      </main>
    </div>
  );
}

import React from 'react';
import { Link } from 'react-router-dom';

export default ({
  handleSubmit,
  renderErrorsFor,
  errors,
  setFirstName,
  setLastName,
  setEmail,
  setPassword,
  setPasswordConfirmation
}) => {
  return (
    <div className="view-container registrations new">
      <main>
        <header>
          <div className="logo" />
        </header>
        <form id="sign_up_form" onSubmit={handleSubmit}>
          <div className="field">
            <input
              id="user_first_name"
              type="text"
              placeholder="First name"
              required={true}
              onChange={e => setFirstName(e.currentTarget.value)} />
            {renderErrorsFor(errors, 'first_name')}
          </div>
          <div className="field">
            <input
              id="user_last_name"
              type="text"
              placeholder="Last name"
              required={true}
              onChange={e => setLastName(e.currentTarget.value)} />
            {renderErrorsFor(errors, 'last_name')}
          </div>
          <div className="field">
            <input
              id="user_email"
              type="email"
              placeholder="Email"
              required={true}
              onChange={e => setEmail(e.currentTarget.value)} />
            {renderErrorsFor(errors, 'email')}
          </div>
          <div className="field">
            <input
              id="user_password"
              type="password"
              placeholder="Password"
              required={true}
              onChange={e => setPassword(e.currentTarget.value)} />
            {renderErrorsFor(errors, 'password')}
          </div>
          <div className="field">
            <input
              id="user_password_confirmation"
              type="password"
              placeholder="Confirm password"
              required={true}
              onChange={e => setPasswordConfirmation(e.currentTarget.value)} />
            {renderErrorsFor(errors, 'password_confirmation')}
          </div>
          <button type="submit">Sign up</button>
        </form>
        <Link to="/sign_in">Sign in</Link>
      </main>
    </div>
  );
}

# react-authenticate

Authentication decorator and provider for React JS.

Requires babel with decorator support (see .babelrc and devDependencies).

## Example

[Example using with React](https://github.com/adambene/react-authenticate-example)

## Usage

Can be used with react-router or redux-router.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import { ProvideAuthenticationComponent, authenticate, authenticateWith } from 'react-authenticate';
import Login from './components/Login';

@authenticate
class UserList extends React.Component {
  render() {
    return ...;
  }
}

...
const store = configureStore();

ReactDOM.render(
  <div>
    <h1>List of Users</h1>
    <ProvideAuthenticationComponent
      component={Login}
      isAuthenticated={() => store.getState().isAuthenticated}
    >
      <UserList users={store.getState().users}/>
    </ProvideAuthenticationComponent>
  </div>,
  document.getElementById('root')
);
```

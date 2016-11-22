import React from 'react';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export class ProvideAuthenticationComponent extends React.Component {
  static propTypes = {
    children: React.PropTypes.any.isRequired,
    component: React.PropTypes.any.isRequired,
    isAuthenticated: React.PropTypes.func.isRequired,
  }
  static childContextTypes = {
    authenticationComponent: React.PropTypes.func.isRequired,
    isAuthenticated: React.PropTypes.func.isRequired,
  }
  constructor(props, context) {
    super(props, context);
    this.component = props.component;
    this.isAuthenticated = props.isAuthenticated;
  }
  getChildContext() {
    return {
      authenticationComponent: this.component,
      isAuthenticated: this.isAuthenticated,
    };
  }
  render() {
    return this.props.children;
  }
}

export const authenticateWith = (AuthenticationComponent) => (WrappedComponent) => (
  class extends WrappedComponent {
    static contextTypes = {
      authenticationComponent: React.PropTypes.func.isRequired,
      isAuthenticated: React.PropTypes.func.isRequired,
    }
    static displayName = `Authenticated(${getDisplayName(WrappedComponent)})`;
    render() {
      return (
        this.context.isAuthenticated()
          ? React.createElement(WrappedComponent, this.props)
          : React.createElement(
              AuthenticationComponent || this.context.authenticationComponent,
              this.props
            )
      );
    }
  }
);

export const authenticate = authenticateWith();

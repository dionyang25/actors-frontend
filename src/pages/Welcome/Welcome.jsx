import React, { Component } from 'react';
import FeatureDisplay from './components/FeatureDisplay';

export default class Welcome extends Component {
  static displayName = 'Welcome';

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="welcome-page">
        <FeatureDisplay />
      </div>
    );
  }
}

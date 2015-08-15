'use strict';

import Backbone from 'backbone';
import template from '../templates/header.hbs';
import React from 'react';
import cat from '../images/cat.jpg';

export const MyView = Backbone.Layout.extend({
  template: template,

  el: '#content',

  serialize: function () {
    return this.model.toJSON();
  }
});

/*jshint ignore:start */
export default class View extends React.Component {
  constructor (props) {
    super(props);

    this.state = { model: props.model };
  }

  render () {
    return (
      <div>
        <h1 id='headerYo'>{this.state.model.get('name')} er barsk!</h1>

        <h2>What is even life</h2>
        <p>meep</p>

        <img src={cat}/>
      </div>
    )
  }
}
/*jshint ignore:end */

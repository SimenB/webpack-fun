'use strict';

import Backbone from 'backbone';
import template from '../templates/header.hbs';

import '../styles/header.styl';

var myView = Backbone.Layout.extend({
  template: template,

  el: '#content',

  serialize: function () {
    return this.model.toJSON();
  }
});

export default myView;

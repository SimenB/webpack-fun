'use strict';

import 'common-assets/scripts/app';
import sout from 'common-assets/scripts/sout';
import WriteInHeader from 'common-assets/scripts/dom';

import $ from 'jquery';
import Backbone from 'backbone';

import 'common-assets/styles/style.styl';

var model = new Backbone.Model({ name: 'Simen Bekkhus' });

var MyModel = Backbone.Model.extend({
  url: 'hello'
});

sout('halla!');
new WriteInHeader({ model: model }).render();

var modelAgain = new MyModel();

modelAgain.fetch({ data: $.param({ name: 'Simen' }) }).done(function () {
  sout(modelAgain.toJSON());
});

import 'dev-module';

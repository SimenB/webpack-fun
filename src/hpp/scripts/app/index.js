'use strict';

if (module.hot) {
  module.hot.accept();
}

import 'common-assets/scripts/app';
import sout from 'common-assets/scripts/sout';
import $ from 'jquery';
import React from 'react';
import Promise from 'bluebird';
import WriteInHeader, { MyView } from 'common-assets/scripts/dom';

import greeting from './subdir/greeting';

import Backbone from 'backbone';

import '../styles/hpp.styl';

var model = new Backbone.Model({ name: 'Simen Bekkhus' });

sout('halla!');

var myView = new MyView({ model: model });

var renderPromise = myView.render().promise();

var meep = $.Deferred();
var meep2 = meep.promise();

debugger;

setTimeout(() => {
  Promise.resolve(meep2).then(() => {
    console.log('meep');
  });
}, 5000);

meep.resolve('wwop')

greeting('Simen');

React.render(<WriteInHeader model={model}/>, $('#content')[0]);

import 'dev-module';

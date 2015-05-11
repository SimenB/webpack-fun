'use strict';

if (module.hot) {
  module.hot.accept();
}

import 'common-assets/scripts/app';
import sout from 'common-assets/scripts/sout';
import WriteInHeader from 'common-assets/scripts/dom';

import greeting from './greeting';

import Backbone from 'backbone';

import '../styles/hpp.styl';

var model = new Backbone.Model({ name: 'Simen Bekkhus' });

sout('halla!');
new WriteInHeader({ model: model }).render();

greeting('Simen');

import 'dev-module';

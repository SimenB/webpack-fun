'use strict';

import 'common-assets/scripts/app';
import sout from 'common-assets/scripts/sout';
import WriteInHeader from 'common-assets/scripts/dom';

import Backbone from 'backbone';

import 'common-assets/styles/style.styl';

var model = new Backbone.Model({ name: 'Simen Bekkhus' });

sout('halla!');
new WriteInHeader({ model: model }).render();

import 'dev-module';

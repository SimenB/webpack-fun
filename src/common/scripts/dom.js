'use strict';

import $ from 'jquery';
import template from '../templates/header.hbs';

import '../styles/header.styl';

function writeInHeader (string) {
  $('#content').html(template({ name: string }));
}

export default writeInHeader;

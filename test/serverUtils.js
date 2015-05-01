'use strict';

import fauxJax from 'faux-jax';

import _ from 'underscore';

function respond (res) {
  if (_.size(res) !== fauxJax.requests.length) {
    throw 'Mismatch number of responses';
  }

  _.each(fauxJax.requests, function (e) {
    var response = res[ e.requestURL ];

    if (!response) {
      throw 'No response found';
    }

    e.respond(res.status || 200, res.headers || { 'Content-Type': 'application/json' }, res.res);
  });
}

export function fakeResponse (res, callback) {
  fauxJax.install();

  callback();

  respond(res);

  fauxJax.restore();

  return true;
}

export function fakeRequest (callback) {
  fauxJax.install();

  callback();

  var requests = fauxJax.requests;

  if (requests.length !== 1) {
    throw 'Bad number of requests, ' + requests;
  }

  fauxJax.restore();

  return requests[ 0 ];
}

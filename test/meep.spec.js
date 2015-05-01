'use strict';

import {fakeResponse} from './serverUtils';

import module from '../src/hpp/scripts/greeting';

import greetingTestData from './fixtures/greetings.json';

const greetingsResponse = { 'hello?name=Simen': { res: JSON.stringify(greetingTestData) } };

describe('mee', function () {
  it('po', function () {
    expect(1).toEqual(1);
  });

  it('po', function () {
    var finished = false;

    finished = fakeResponse(greetingsResponse, function () {
      module('Simen');
    });

    waitsFor(function () {
      return finished;
    }, 20);

    runs(function () {
      expect(1).toEqual(1);
    });
  });
});

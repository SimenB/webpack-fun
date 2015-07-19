'use strict';

import $ from 'jquery';
import Backbone from 'backbone';
import sout from 'common-assets/scripts/sout';

var MyModel = Backbone.Model.extend({
  url: 'hello'
});

export default function callback (name) {
  var modelAgain = new MyModel();

  modelAgain.fetch({ data: $.param({ name: name }) }).done(() => {
    sout(modelAgain.toJSON());
  });
}

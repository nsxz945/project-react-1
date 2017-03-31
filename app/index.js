import _ from 'lodash';
import $ from 'jquery';
function component () {
  var element = $('<div></div>');

  /* lodash is required for the next line to work */
  element.html(_.join(['Hello','webpack'], ' '))	;

  return element;
}

$(body).append(component());
$( function() {
  var $difficulty = $('#difficulty');
  var $question = $('#question');
  var $answers = [];
  var $answers[1] = {radio: $('#answer1'), label: $('label[for="answer1"]')};
  var $answers[2] = {radio: $('#answer2'), label: $('label[for="answer2"]')};
  var $answers[3] = {radio: $('#answer3'), label: $('label[for="answer3"]')};
  var $answers[4] = {radio: $('#answer4'), label: $('label[for="answer4"]')};
  var $nextButton = $('#next-button');
  var $score-right = $('#score-right');
  var $score-total = $('#score-total');
} );

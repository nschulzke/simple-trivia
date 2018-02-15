var $answersDiv = $('#answers');
var $difficulty = $('#difficulty');
var $question = $('#question');
var $answers = $('.answer');
var $labels = $('label');
var $nextButton = $('#next-button');
var $scoreRight = $('#score-right');
var $scoreTotal = $('#score-total');

const url = 'https://opentdb.com/api.php'
var data = {
  amount: 1,
  category: 18,
  type: "multiple",
  difficulty: "easy",
}
var correct = 0;
var token;

$( function() {
  $question.hide();
  $answersDiv.hide();
  $nextButton.hide();
  $difficulty.change(newQuestion);
  $nextButton.click(newQuestion);
  $answers.change(chooseAnswer);
  $.ajax( {
    url: "https://opentdb.com/api_token.php?command=request",
    type: "get",
    dataType: "json",
    success: function(object) {
      token = object.token;
      newQuestion();
    }
  } );
  $question.show();
  $answersDiv.show();
} );

function newQuestion() {
  data.difficulty = $difficulty.find(":selected").val();
  data.token = token;
    $.ajax( {
      url: url,
      type: "get",
      data: data,
      dataType: "json",
      success: setQuestion,
      error: showError
    } );
}

function setQuestion(object) {
  $answers.attr('disabled', false);
  $answers.prop('checked', false);
  $answers.data('correct', null);
  $labels.removeClass('correct');
  $labels.removeClass('incorrect');
  $nextButton.hide();
  object = object.results[0];
  $question.html(object.question);
  var correctAnswerPosition = Math.floor(Math.random() * 4);
  var j = 0;
  for (var i = 0; i < 4; i++) {
    if (i == correctAnswerPosition) {
      $labels.eq(i).html(object.correct_answer);
      correct = i;
    } else
      $labels.eq(i).html(object.incorrect_answers[j++]);
  }
}

function showError() {
  alert("Error loading question!");
}

function chooseAnswer() {
  $answer = $answers.filter(':checked');
  answerId = $answer.attr('id');
  $label = $labels.filter('[for="' + answerId + '"]');
  if ($labels.index($label) == correct) {
    $label.addClass('correct');
    addScore(1);
  } else {
    $label.addClass('incorrect');
    $labels.eq(correct).addClass('correct');
    addScore(0);
  }
  $answers.attr('disabled', true);
  $nextButton.show();
}

function addScore(value) {
  $scoreRight.text(parseInt($scoreRight.text()) + value);
  $scoreTotal.text(parseInt($scoreTotal.text()) + 1);
}

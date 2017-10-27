(function() {
  var questions = [{
    question: "Which of the following is not a valid border style property value?",
    choices: ["dotted","glazed","inset","solid"],
    correctAnswer: 2
  }, {
    question: "There are 16 basic css color keywords in CSS,which of the following is not basic color keyword?",
    choices: ["cyan","olive","aqua","maroon"],
    correctAnswer: 0
  }, {
    question: "choose the correct HTML tag for largest heading",
    choices: ["H1","Head","H6","Heading"],
    correctAnswer: 0
  }, {
    question: "How can you make a list that lists the items with number?",
    choices: ["OL","DI","UI","list"],
    correctAnswer: 0
  }, {
    question: "How can you make a list that lists the items with bullets?",
    choices: ["OL","DI","UI","list"],
    correctAnswer: 3
  }, {
    question: "What is the name of every homepage on the WWW?",
    choices: ["home.html","anything you want it to be.html","index.html","the name of your website.html"],
    correctAnswer: 2
  }, {
    question: "What does CSS stands for?",
    choices: ["creative style sheets","colorful style sheets","computer style sheets","cascading style sheets"],
    correctAnswer: 3
  }, {
    question: "How do you insert a comment in a CSS file?",
    choices: ["this is a comment","/*this is a comment*/","//this is a comment","//this is a comment//"],
    correctAnswer: 0
  }, {
    question: "Which property is used to change the backgrounf color?",
    choices: ["Bgcolor:","Background-color:","color:","none of the above"],
    correctAnswer: 1
  }, {
    question: "Which function is use to get cookies in PHP?",
    choices: ["getcookie()","$_COOKIE","isset()","None of Above"],
    correctAnswer: 1
  },{
    question: "Which is used to parse an XML document in PHP?",
    choices: ["simplexml_load_string()","loadxml()","Both A and B","None of above"],
    correctAnswer: 2
  }, {
    question: "What is size of short variable?",
    choices: [8,16,32,64],
    correctAnswer: 2
  }, {
    question: "What is default value of int?",
    choices: [0,"0.0","null","Not of Above"],
    correctAnswer: 0
  }, {
    question: "What is default value of local variable?",
    choices: ["null",0,"depend on variable","not assign"],
    correctAnswer: 3
  }, {
    question: "Which CSS property control the text size?",
    choices: ["front-size","front-style","text-style","text-size text-size"],
    correctAnswer: 0
  }, {
    question: "The is doctype mandatory",
    choices: ["true","false"],
    correctAnswer: 0
  }, {
    question: "Which of the following elements can you attach JQuery events to?",
    choices: ["object","embed","applet","none of above"],
    correctAnswer: 3
  }, {
    question: "Stats show that Jquery is used by roughly how many websites as at march 2013?",
    choices: ["45 million","29 million","19 million","12 million"],
    correctAnswer: 2
  }, {
    question: "when was the initial release of the jquery library?",
    choices: ["June 2006","July 2006","Aug 2006","Sept 2006"],
    correctAnswer: 1
  }, {
    question: "Which sign does jquery use as a shortcut for jquery?",
    choices: ["the % sign","the ? sign","the $ sign","None of Above"],
    correctAnswer: 1
  }];
  
  var questionCounter = 0; //Tracks question number
  var selections = []; //Array containing user choices
  var quiz = $('#quiz'); //Quiz div object
  
  // Display initial question
  displayNext();
  
  // Click handler for the 'next' button
  $('#next').on('click', function (e) {
    e.preventDefault();
    
    // Suspend click listener during fade animation
    if(quiz.is(':animated')) {        
      return false;
    }
    choose();
    
    // If no user selection, progress is stopped
    if (isNaN(selections[questionCounter])) {
      alert('Please make a selection!');
    } else {
      questionCounter++;
      displayNext();
    }
  });
  
  // Click handler for the 'prev' button
  $('#prev').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    choose();
    questionCounter--;
    displayNext();
  });
  
  // Click handler for the 'Start Over' button
  $('#start').on('click', function (e) {
    e.preventDefault();
    
    if(quiz.is(':animated')) {
      return false;
    }
    questionCounter = 0;
    selections = [];
    displayNext();
    $('#start').hide();
  });
  
  // Animates buttons on hover
  $('.button').on('mouseenter', function () {
    $(this).addClass('active');
  });
  $('.button').on('mouseleave', function () {
    $(this).removeClass('active');
  });
  
  // Creates and returns the div that contains the questions and 
  // the answer selections
  function createQuestionElement(index) {
    var qElement = $('<div>', {
      id: 'question'
    });
    
    var header = $('<h2>Question ' + (index + 1) + ':</h2>');
    qElement.append(header);
    
    var question = $('<p>').append(questions[index].question);
    qElement.append(question);
    
    var radioButtons = createRadios(index);
    qElement.append(radioButtons);
    
    return qElement;
  }
  
  // Creates a list of the answer choices as radio inputs
  function createRadios(index) {
    var radioList = $('<ul>');
    var item;
    var input = '';
    for (var i = 0; i < questions[index].choices.length; i++) {
      item = $('<li>');
      input = '<input type="radio" name="answer" value=' + i + ' />';
      input += questions[index].choices[i];
      item.append(input);
      radioList.append(item);
    }
    return radioList;
  }
  
  // Reads the user selection and pushes the value to an array
  function choose() {
    selections[questionCounter] = +$('input[name="answer"]:checked').val();
  }
  
  // Displays next requested element
  function displayNext() {
    quiz.fadeOut(function() {
      $('#question').remove();
      
      if(questionCounter < questions.length){
        var nextQuestion = createQuestionElement(questionCounter);
        quiz.append(nextQuestion).fadeIn();
        if (!(isNaN(selections[questionCounter]))) {
          $('input[value='+selections[questionCounter]+']').prop('checked', true);
        }
        
        // Controls display of 'prev' button
        if(questionCounter === 1){
          $('#prev').show();
        } else if(questionCounter === 0){
          
          $('#prev').hide();
          $('#next').show();
        }
      }else {
        var scoreElem = displayScore();
        quiz.append(scoreElem).fadeIn();
        $('#next').hide();
        $('#prev').hide();
        $('#start').show();
      }
    });
  }
  
  // Computes score and returns a paragraph element to be displayed
  function displayScore() {
    var score = $('<p>',{id: 'question'});
    
    var numCorrect = 0;
    for (var i = 0; i < selections.length; i++) {
      if (selections[i] === questions[i].correctAnswer) {
        numCorrect++;
      }
    }
    
    score.append('Result: ' + numCorrect + ' / ' +
                 questions.length);
    return score;
  }
})();
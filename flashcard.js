var inquirer = require("inquirer");

function BasicCard(front, back) {

	this.front = front;
	this.back = back;
}


function ClozeCard(text, cloze) {
  this.text = text; 
  this.cloze = cloze; 

  this.fulltext = function() {
    return this.text + this.cloze; 
  }
}


var q1 = new BasicCard("Who is the first President of the USA", "George Washington");
var q2 = new BasicCard("What U.S. president had the shortest life", "John F. Kennedy");
var q3 = new BasicCard("What president opined: Once you get into this great stream of history you can't get out", "Richard Nixon");
var q4 = new BasicCard("What president's mug graces a $100,000 bill", "Woodrow Wilson");
var q5 = new BasicCard("What portly U.S. president was the first to be a golf nut", "William Howard Taft");


var c1 = new ClozeCard("The first President of the USA is", "George Washington");
var c2 = new ClozeCard("The U.S. president who had the shortest life is", "John F. Kennedy");
var c3 = new ClozeCard("The president that opined: Once you get into this great stream of history you can't get out is", "Richard Nixon");
var c4 = new ClozeCard("The president's that mug graces a $100,000 bill is", "Woodrow Wilson");
var c5 = new ClozeCard("The U.S. president who was the first to be a golf nut is", "William Howard Taft");


var count = 0;

var questions = [q1, q2, q3, q4, q5];

var clozeCards = [c1, c2, c3, c4, c5];


var askQuestion = function() {

if (count < questions.length) {

    inquirer.prompt([
      {
        name: "response",
        message: questions[count].front
      }
    ]).then(function(answers) {
      if (answers.response === questions[count].back) {
      	console.log("Correct");
      } else {
      	console.log("Wrong.  The correct answer is " + questions[count].back);
      }
      
      count++;
      askQuestion();
    });
  } else {

      var endGame = true;
      count = 0;
      if (endGame === true)
        {
        	inquirer.prompt([
        		{
      	  		type: "confirm",
      	  		name: "game",
      	  		message: "Do you want to play again?"
        		}
        		]).then(function (answers) {
        		if(answers.game === true) {
        			startgame();
              endGame = false;
        		} else {
        			console.log("See you next time!");
        		}

      	});

    }

  }
}

var askCloze = function() {
if (count < clozeCards.length) {

    inquirer.prompt([
      {
        name: "response",
        message: clozeCards[count].text + "____________"
      }
    ]).then(function(answers) {
      if (answers.response === clozeCards[count].cloze) {
        console.log("Correct");
      } else {
        console.log("Wrong.  The correct answer is " + clozeCards[count].fulltext());
      }
      
      count++;
      askCloze();
    });
  } else {

      var endGame = true;
      count = 0;
      if (endGame === true)
        {
          inquirer.prompt([
            {
              type: "confirm",
              name: "game",
              message: "Do you want to play again?"
            }
            ]).then(function (answers) {
            if(answers.game === true) {
              startgame();
              endGame = false;
            } else {
              console.log("See you next time!");
            }

        });

    }

  }
}


var startgame = function () {
  inquirer.prompt([
  {
    name: "start",
    message: "Which flash cards do you want?  Type Basic or Cloze to select."

  }
    ]).then(function (answers) {
    if (answers.start === "Basic") {
      askQuestion();
    }
    else {
      askCloze();
    }
});
}

startgame();
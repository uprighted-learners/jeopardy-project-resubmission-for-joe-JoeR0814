// Import questions from a separate module/file
import { placeholderQuestions } from './placeholder-questions.js';

// Grabbing HTML elements to interact with them in JavaScript
const guess = document.getElementById('guess');
const pass = document.getElementById('pass');
const nextRound = document.getElementById('next-round');
const userInput = document.getElementById('userInput');
const score = document.getElementById('score');
const player1Score = document.getElementById('player1-score');
const player2Score = document.getElementById('player2-score');
const playerTurn = document.getElementById('player-turn');

// Initializing variables to keep track of the current player and their scores
let currentPlayer = 1;
let scores = { player1: 0, player2: 0 };
let play1Score = 0;
let play2Score = 0;
let currentAnswer = ''; // Stores the answer of the current question
let currentValue = 0; // Stores the value of the current question

// Initially disabling the guess and pass buttons because no question is selected yet
guess.disabled = true;
pass.disabled = true;
nextRound.disabled = true;

// Function to extract unique categories from the list of questions
function getCategories(questions) {
  // Utilizes a Set to ensure uniqueness and maps over the questions to extract categories
  return [...new Set(questions.map((question) => question.category))];
}

// Function to display categories on the webpage
function renderCategories() {
  const categories = getCategories(placeholderQuestions);
  document.querySelectorAll('.category').forEach((element, index) => {
    // Assigns category names to table headers if available
    if (categories[index]) {
      element.textContent = categories[index];
    }
  });
}

// Sets up click event listeners for each question
function setupQuestionClickListeners() {
  document.querySelectorAll('.question').forEach((element) => {
    element.addEventListener('click', handleQuestionClick);
  });
}

// Function to switch to the other player
function switchPlayer() {
  currentPlayer = currentPlayer === 2 ? 1 : 1;

  // Update the player turn display with the player's name
  document.getElementById(
    'player-turn',
  ).textContent = `Player ${currentPlayer}'s Turn`;
}
switchPlayer();

let selectedQuestion = null; // Variable to store the currently selected question

function handleQuestionClick(event) {
  if (selectedQuestion !== null) {
    alert('Please answer one question at a time.');
    return; // Return early to prevent the new question from being selected
  }
  const category = event.target.dataset.category;
  const value = parseInt(event.target.dataset.value, 10);
  const questionsInCategory = placeholderQuestions.filter(
    (question) => question.category === category,
  );
  const questionIndex = value / 200 - 1; // Assuming $200 increments
  const question = questionsInCategory[questionIndex];

  if (question) {
    if (selectedQuestion) {
      // Close the previously selected question
      selectedQuestion.textContent = '$' + currentValue; // Reset the question value
    }

    // Replaces the dollar value with the question text
    event.target.textContent = question.question;
    currentAnswer = question.answer; // Stores the correct answer for later comparison
    currentValue = value; // Stores the question's value for score calculation
    selectedQuestion = event.target; // Update the selected question
  }

  // Enables the guess and pass buttons now that a question is selected
  guess.disabled = false;
  pass.disabled = false;
  nextRound.disabled = false;

  // Disable the question after it has been answered
  event.target.classList.add('disabled');
}

// Alerts the first player to start the game once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  alert("Player 1, it's your turn to start the game!");
  renderCategories(); // Displays the categories
  setupQuestionClickListeners(); // Prepares the questions for interaction
});

// Attaches an event listener to the guess button for checking the user's answer

// Function to check if the user's answer is correct
guess.addEventListener('click', checkAnswer);

// Function to check if the user's answer is correct
function checkAnswer() {
  const userAnswer = userInput.value.toLowerCase().trim(); // Gets and trims the user's answer

  // Compares the user's answer to the correct answer, case-insensitively
  if (userAnswer === currentAnswer.toLowerCase().trim()) {
    alert('Correct! Please choose another question.'); // Alerts the user if the answer is correct
    scores['player' + currentPlayer] += currentValue; // Updates the score
  } else {
    alert('Incorrect!');
    scores['player' + currentPlayer] -= currentValue; // Decreases the score if the answer is incorrect

    // Switches to the other player
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    alert(`Player ${currentPlayer}, it's your turn to guess!`);
  }

  // Update the score displays
  player1Score.textContent = `Player 1 Score: ${scores.player1}`;
  player2Score.textContent = `Player 2 Score: ${scores.player2}`;

  // Resets the input field for the next answer
  document.getElementById('answer').value = '';
  document.getElementById('question-container').style.display = 'disabled';
  document.getElementById('categories').style.display = 'flex';
  document.getElementById('userInput').value = '';
  guess.disabled = true; // Disables the guess button until the next question is selected
  pass.disabled = true; // Similarly, disables the pass button

  document.getElementsByClassName('question-container')[
    index
  ].style.pointerEvents = 'none';

  document.getElementsByClassName('question-container')[index].style.opacity =
    '0.5';
}
function passQuestion() {
  currentPlayer = currentPlayer === 1 ? 2 : 1; // Switch players

  // Update the player turn display
  document.getElementById(
    'player-turn',
  ).textContent = `Player ${currentPlayer}'s Turn`;

  // Alert the next player that it's their turn
  alert(`Player ${currentPlayer}, it's your turn to answer!`);

  pass.disabled = true; // Disables the pass button until the next question is selected
}

// Add event listener to the pass button
pass.addEventListener('click', passQuestion);

renderCategories();
setupQuestionClickListeners();


const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Which type of star is the sun?',
    answers: [
      { text: 'Supernova', correct: false },
      { text: 'Hypernova', correct: false },
      { text: 'Red giant', correct: true },
      { text: 'Red Supergiant', correct: false }
    ]
  },
  {
    question: 'In which ocean does the 'Mariana Trench' is located?',
    answers: [
      { text: 'Indian ocean', correct: false },
      { text: 'Pacific ocean', correct: true },
      { text: 'Atlantic ocean: correct:false },
      { text: 'Fun Fun Function', correct: false }
    ]
  },
  {
    question: 'Who invented the telescope?',
    answers: [
      { text: 'Isaac newton', correct: false },
      { text: 'Gallelli Galileo', correct: true },
      { text: 'James Watt', correct: false },
      { text: 'Roger Bacon', correct: false }
    ]
  },
  {
    question: 'The sun is the most giant star in the universe.',
    answers: [
      { text: 'True', correct: false },
      { text: 'False', correct: true }
    ]
  },
  {
    question: 'What powers the Earth's water cycle?',
    answers: [
      { text: 'The Moon', correct: false },
      { text: 'The Sun', correct: true },
      { text: 'The Ocean', correct: false },
      { text: 'Earth's rotation', correct: false }
    ]
  }
]

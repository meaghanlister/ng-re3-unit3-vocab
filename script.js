/* =========================
   DATA
========================= */
const quizData = [
  { question: "The photographer managed to ___ the fleeting moment of joy on the child's face.",
    options: ["capture", "grasp", "signal", "drag"],
    answer: "capture",
    definition: "(v.) to record or express something (like a moment or feeling) successfully" },
  { question: "If we don't protect these animals, they could become ___ within a decade.",
    options: ["distinctive", "physical", "primary", "extinct"],
    answer: "extinct",
    definition: "(adj.) (of a species) no longer existing" },
  { question: "It took me a while to ___ the complex new software, but now I can use it efficiently.",
    options: ["capture", "reverse", "grasp", "signal"],
    answer: "grasp",
    definition: "(v.) to understand something completely" },
  { question: "The job requires a lot of ___ labor, such as lifting heavy boxes.",
    options: ["physical", "primary", "official", "bonus"],
    answer: "physical",
    definition: "(adj.) relating to the body or to things you can see and touch" },
  { question: "The ___ reason for the company's success is its commitment to customer service.",
    options: ["distinctive", "bonus", "primary", "physical"],
    answer: "primary",
    definition: "(adj.) most important; main" },
  { question: "The artist found it difficult to ___ the vibrant colors of the sunset in her painting.",
    options: ["threaten", "drag", "reverse", "reproduce"],
    answer: "reproduce",
    definition: "(v.) to copy or create something again" },
  { question: "A red flag is often used as a ___ for danger.",
    options: ["signal", "status", "conflict", "bonus"],
    answer: "signal",
    definition: "(n.) a sign or gesture that gives a message or warning" },
  { question: "They moved from the crowded city to a quiet ___ to raise their children.",
    options: ["landscape", "poverty", "suburb", "region"],
    answer: "suburb",
    definition: "(n.) an area where people live that is outside the center of a city" },
  { question: "People ___ eat more comfort food when they are feeling stressed.",
    options: ["tend to", "drag", "enforce", "reverse"],
    answer: "tend to",
    definition: "(v. phrase) to often do a particular thing; to be likely to behave in a particular way" },
  { question: "The storm clouds on the horizon ___ to ruin the outdoor picnic.",
    options: ["conflict", "reproduce", "enforce", "threaten"],
    answer: "threaten",
    definition: "(v.) to be likely to damage or harm something" },
  { question: "Employees who exceeded their sales targets received a generous ___ at the end of the year.",
    options: ["status", "poverty", "bonus", "signal"],
    answer: "bonus",
    definition: "(n.) an extra amount of money or other reward given as a gift or payment" },
  { question: "The two colleagues had a ___ over how to best manage the project.",
    options: ["suburb", "landscape", "conflict", "bonus"],
    answer: "conflict",
    definition: "(n.) a serious disagreement or argument" },
  { question: "The spice gives the dish a very ___ flavor that you can't find anywhere else.",
    options: ["primary", "physical", "extinct", "distinctive"],
    answer: "distinctive",
    definition: "(adj.) easy to recognize because it is different from others" },
  { question: "The meeting seemed to ___ on forever, with no clear decision being made.",
    options: ["drag", "tend to", "capture", "signal"],
    answer: "drag",
    definition: "(v.) to pull something along with effort; (fig.) to last for a long, boring time" },
  { question: "The school had to ___ the rules about uniforms more strictly.",
    options: ["threaten", "reproduce", "enforce", "reverse"],
    answer: "enforce",
    definition: "(v.) to make people obey a rule or law" },
  { question: "The window of the train revealed a beautiful ___ of rolling green hills.",
    options: ["suburb", "poverty", "conflict", "landscape"],
    answer: "landscape",
    definition: "(n.) a large area of countryside, especially in terms of its appearance" },
  { question: "The new park will be ___ opened by the mayor next Saturday.",
    options: ["officially", "primarily", "physically", "distinctly"],
    answer: "officially",
    definition: "(adv.) formally, publicly, or with authority" },
  { question: "The organization's main goal is to reduce ___ in developing countries.",
    options: ["status", "landscape", "bonus", "poverty"],
    answer: "poverty",
    definition: "(n.) the state of being extremely poor" },
  { question: "The driver had to ___ the car out of the tight parking space.",
    options: ["drag", "enforce", "capture", "reverse"],
    answer: "reverse",
    definition: "(v.) to go backwards or turn in the opposite direction" },
  { question: "In many cultures, owning a large home is seen as a symbol of high social ___.",
    options: ["signal", "conflict", "status", "poverty"],
    answer: "status",
    definition: "(n.) a person's social or professional rank or position" }
];

const paragraphWords = [
  "suburb", "landscape", "distinctive", "signal", "conflict",
  "officially", "enforce", "threaten", "capture", "status"
];

/* =========================
   DOM
========================= */
const tabQuiz = document.getElementById('tab-quiz');
const tabParagraph = document.getElementById('tab-paragraph');

const quizActivity = document.getElementById('quiz-activity');
const paragraphActivity = document.getElementById('paragraph-activity');

// Quiz els
const quizContainer = document.getElementById('quiz-container');
const scoreContainer = document.getElementById('score-container');
const questionNumberEl = document.getElementById('question-number');
const questionTextEl = document.getElementById('question-text');
const optionsContainerEl = document.getElementById('options-container');
const feedbackTextEl = document.getElementById('feedback-text');
const definitionTextEl = document.getElementById('definition-text');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const scoreTextEl = document.getElementById('score-text');

// Paragraph els
const wordBankEl = document.getElementById('word-bank');
const paragraphContainerEl = document.getElementById('paragraph-container');
const checkParagraphBtn = document.getElementById('check-paragraph-btn');
const revealParagraphBtn = document.getElementById('reveal-paragraph-btn');
const resetParagraphBtn = document.getElementById('reset-paragraph-btn');
const paragraphFeedbackEl = document.getElementById('paragraph-feedback');

/* =========================
   STATE + UTILS
========================= */
let currentQuestionIndex = 0;
let score = 0;
let locked = false;

function shuffleArray(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function setActiveTab(which) {
  if (which === 'quiz') {
    quizActivity.classList.remove('hidden');
    paragraphActivity.classList.add('hidden');
    tabQuiz.classList.add('is-active');
    tabParagraph.classList.remove('is-active');
    tabQuiz.setAttribute('aria-selected', 'true');
    tabParagraph.setAttribute('aria-selected', 'false');
  } else {
    quizActivity.classList.add('hidden');
    paragraphActivity.classList.remove('hidden');
    tabParagraph.classList.add('is-active');
    tabQuiz.classList.remove('is-active');
    tabParagraph.setAttribute('aria-selected', 'true');
    tabQuiz.setAttribute('aria-selected', 'false');
  }
}

/* =========================
   QUIZ
========================= */
function loadQuestion() {
  locked = false;
  optionsContainerEl.innerHTML = '';
  feedbackTextEl.textContent = '';
  definitionTextEl.textContent = '';
  nextBtn.disabled = true;

  const q = quizData[currentQuestionIndex];
  questionNumberEl.textContent = `Question ${currentQuestionIndex + 1} / ${quizData.length}`;
  questionTextEl.textContent = q.question;

  const opts = shuffleArray([...q.options]);
  opts.forEach(option => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'option-btn';
    btn.textContent = option;
    btn.addEventListener('click', () => selectAnswer(option, q.answer, btn));
    optionsContainerEl.appendChild(btn);
  });
}

function selectAnswer(selected, correct, btnEl) {
  if (locked) return;
  locked = true;

  const all = optionsContainerEl.querySelectorAll('.option-btn');
  all.forEach(b => (b.disabled = true));

  if (selected === correct) {
    score++;
    btnEl.classList.add('correct');
    feedbackTextEl.textContent = 'Correct!';
    feedbackTextEl.classList.remove('text-red-600');
    feedbackTextEl.classList.add('text-green-600');
  } else {
    btnEl.classList.add('incorrect');
    feedbackTextEl.textContent = `Wrong! The correct answer was: ${correct}`;
    feedbackTextEl.classList.remove('text-green-600');
    feedbackTextEl.classList.add('text-red-600');
    all.forEach(b => {
      if (b.textContent === correct) b.classList.add('correct');
    });
  }

  const q = quizData[currentQuestionIndex];
  definitionTextEl.textContent = `Definition: ${q.definition}`;
  nextBtn.disabled = false;
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizData.length) {
    loadQuestion();
  } else {
    showScore();
  }
}

function showScore() {
  quizContainer.classList.add('hidden');
  scoreContainer.classList.remove('hidden');
  scoreTextEl.textContent = `Your final score is ${score} / ${quizData.length}`;
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreContainer.classList.add('hidden');
  quizContainer.classList.remove('hidden');
  shuffleArray(quizData);
  loadQuestion();
}

/* =========================
   PARAGRAPH GAP-FILL
========================= */
function populateWordBank() {
  wordBankEl.innerHTML = '';
  shuffleArray([...paragraphWords]).forEach(word => {
    const chip = document.createElement('button');
    chip.type = 'button';
    chip.className = 'px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-semibold text-sm hover:bg-emerald-200 transition';
    chip.textContent = word;
    chip.addEventListener('click', () => pasteIntoFocused(word));
    wordBankEl.appendChild(chip);
  });
}
function pasteIntoFocused(word) {
  const el = document.activeElement;
  if (el && el.classList && el.classList.contains('gap-input')) {
    el.value = word;
  }
}

function getAllGapInputs() {
  return paragraphContainerEl.querySelectorAll('.gap-input');
}

function checkParagraph() {
  const inputs = getAllGapInputs();
  let correctCount = 0;
  inputs.forEach((input, idx) => {
    const user = (input.value || '').trim().toLowerCase();
    const answers = (input.dataset.answers || '').toLowerCase().split('|').map(s => s.trim()).filter(Boolean);

    // Clear prior state
    input.classList.remove('correct', 'incorrect');
    const mark = input.parentElement.querySelector('.blank-mark');
    mark.classList.remove('ok', 'no');
    mark.textContent = '';

    if (user && answers.includes(user)) {
      input.classList.add('correct');
      mark.classList.add('ok');
      mark.textContent = '✓';
      correctCount++;
    } else {
      input.classList.add('incorrect');
      mark.classList.add('no');
      mark.textContent = '×';
    }
  });

  paragraphFeedbackEl.textContent = `You got ${correctCount} out of ${inputs.length} correct.`;
  paragraphFeedbackEl.classList.toggle('text-green-600', correctCount === inputs.length);
  paragraphFeedbackEl.classList.toggle('text-red-600', correctCount !== inputs.length);
}

function revealParagraph() {
  const inputs = getAllGapInputs();
  inputs.forEach(input => {
    const answers = (input.dataset.answers || '').split('|').map(s => s.trim()).filter(Boolean);
    if (!answers.length) return;
    // Fill with the first correct answer only (keeps keys simple)
    input.value = answers[0];
    input.classList.add('correct');
    input.classList.remove('incorrect');
    const mark = input.parentElement.querySelector('.blank-mark');
    mark.classList.remove('no');
    mark.classList.add('ok');
    mark.textContent = '✓';
  });
  paragraphFeedbackEl.textContent = 'Answers revealed.';
  paragraphFeedbackEl.classList.remove('text-red-600');
  paragraphFeedbackEl.classList.add('text-green-600');
}

function resetParagraph() {
  const inputs = getAllGapInputs();
  inputs.forEach(input => {
    input.value = '';
    input.classList.remove('correct', 'incorrect');
    const mark = input.parentElement.querySelector('.blank-mark');
    mark.classList.remove('ok', 'no');
    mark.textContent = '';
  });
  paragraphFeedbackEl.textContent = '';
  paragraphFeedbackEl.classList.remove('text-green-600', 'text-red-600');
}

/* =========================
   EVENTS
========================= */
tabQuiz.addEventListener('click', () => setActiveTab('quiz'));
tabParagraph.addEventListener('click', () => setActiveTab('paragraph'));

document.getElementById('next-btn').addEventListener('click', nextQuestion);
document.getElementById('restart-btn').addEventListener('click', restartQuiz);

document.getElementById('check-paragraph-btn').addEventListener('click', checkParagraph);
document.getElementById('reveal-paragraph-btn').addEventListener('click', revealParagraph);
document.getElementById('reset-paragraph-btn').addEventListener('click', resetParagraph);

/* =========================
   INIT
========================= */
shuffleArray(quizData);
loadQuestion();
populateWordBank();
setActiveTab('quiz');

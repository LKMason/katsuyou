import * as d3 from 'https://cdn.jsdelivr.net/npm/d3-fetch@3.0.1/+esm'
import { shuffle } from 'https://cdn.jsdelivr.net/npm/d3-array@3.2.4/+esm'

class Application {
  constructor() {
    this.setup().then(() => this.start());
  }

  async setup() {
    this.questions = await d3.csv("data/questions.csv");
    const conjugations = await d3.csv("data/conjugation_details.csv");
    this.conjugationMap = new Map(conjugations.map(d => [d.conjugation_id, d]));

    this.elems = {
      quiz: document.getElementById("quiz"),
      questionBase: document.getElementById("question-base"),
      question: document.getElementById("question-question"),
      answerCard: document.getElementById("answer-card"),
      answer: document.getElementById("answer-answer"),
      answerExplanation: document.getElementById("answer-explanation"),
      buttonSkip: document.getElementById("button-skip"),
      buttonReveal: document.getElementById("button-reveal"),
      buttonNext: document.getElementById("button-next"),
      buttonInfo: document.getElementById("button-info"),
    };

    this.elems.buttonSkip.addEventListener("click", () => this.eventSkipClicked());
    this.elems.buttonReveal.addEventListener("click", () => this.eventRevealClicked());
    this.elems.buttonNext.addEventListener("click", () => this.eventNextClicked());
    this.elems.buttonInfo.addEventListener("click", () => this.eventInfoClicked());
  }

  start() {
    shuffle(this.questions);
    this.question = -1;
    this.nextQuestion();
  }

  eventRevealClicked() {
    this.elems.quiz.classList.replace("question", "answer");
  }

  eventNextClicked() {
    this.nextQuestion();
  }

  eventInfoClicked() {
    this.elems.answerCard.classList.toggle("more-info");
  }

  eventSkipClicked() {
    this.nextQuestion();
  }

  nextQuestion() {
    this.question++;
    const questionObj = this.questions[this.question];
    const conjugationDetails = this.conjugationMap.get(questionObj.conjugation_id);

    this.elems.questionBase.innerText = questionObj.base_verb;
    this.elems.question.innerText = questionObj.conjugated_verb;
    this.elems.answer.innerText = conjugationDetails.conjugation_name;
    this.elems.answerExplanation.innerText =conjugationDetails.description;
    this.elems.quiz.classList.replace("answer", "question");
  }

}

new Application();
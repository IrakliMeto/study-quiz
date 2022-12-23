/* 
  უნდა გავაკეთო ერეი ობიექტებით, სადაც მექნება აიდი, კითხვა, შიგნით ობიექტი სავარაუდო პასუხების, და ქორექთ ანსვერი.
  უნდა დავხატო კითხვა და სავარაუდო პასუხები, ცალ ცალკე თითო-თითო, სტეპ ინდექსის მიხედვით, რომელიც მექნება ცალკე ცვლადი.
   სავარაუდო პასუხის ქლიქზე უნდა დავიჭირო დაქლიქული ბათონის ველიუ და შევადარო ქორექთ ანსვერს.
   უნდა მქონდეს ერთი ცვლადი ქულებისთვის და სწორი პასუხის შემთხვევაში მივუმატო +1
   და მინდა ბათონი ნექსთ კითხვაზე რომ გადაგიყვანოს.
*/
let stepIndex = 1;
let point = 0;
const nextButton = document.getElementById('next');
const answersContainer = document.getElementById('answers');
const quizHolder = document.querySelector('.quiz');

const quiz = [
  { 
    id: 1,
    question: 'რამდენი ფეხი აქვს გურამას?',
    answers: [
      {
        optionId: 1,
        label: '2',
        correct: true
      },
      {
        optionId: 2,
        label: '3',
        correct: false
      },
      {
        optionId: 3,
        label: '5',
        correct: false
      }
    ],
  },
  { 
    id: 2,
    question: 'რა ერქვა ალექსანდრე მაკედონელის ცხენს?',
    answers: [
      {
        optionId: 1,
        label: 'ევგრაფი',
        correct: false
      },
      {
        optionId: 2,
        label: 'ბუცეფალი',
        correct: true
      },
      {
        optionId: 3,
        label: 'ბონტორო',
        correct: false
      }
    ],
  },
  { 
    id: 3,
    question: 'რომელ საუკუნეში მეფობდა დავით აღმაშენებელი?',
    answers: [
      {
        optionId: 1,
        label: '12',
        correct: true
      },
      {
        optionId: 2,
        label: '13',
        correct: false
      },
      {
        optionId: 3,
        label: '11',
        correct: false
      }
    ],
  },
  { 
    id: 4,
    question: 'რომელია საქართველოს დედაქალაქი?',
    answers: [
      {
        optionId: 1,
        label: 'თბილისი',
        correct: true
      },
      {
        optionId: 2,
        label: 'სოხუმი',
        correct: false
      },
      {
        optionId: 3,
        label: 'ზუგდიდი',
        correct: false
      }
    ],
  },
  { 
    id: 5,
    question: 'საქართველოს რამდენი % ია რუსი ღორების მიერ ოკუპირებული?',
    answers: [
      {
        optionId: 1,
        label: '20',
        correct: true
      },
      {
        optionId: 2,
        label: '29',
        correct: false
      },
      {
        optionId: 3,
        label: '10',
        correct: false
      }
    ],
  },
  { 
    id: 6,
    question: 'წარმოშობით სადაური იყო სალადინი?',
    answers: [
      {
        optionId: 1,
        label: 'ქურთი',
        correct: true
      },
      {
        optionId: 2,
        label: 'თურქი',
        correct: false
      },
      {
        optionId: 3,
        label: 'ებრაელი',
        correct: false
      }
    ],
  },
  { 
    id: 7,
    question: 'რომელ წელს დაიწყო მეორე მსოფლიო ომი?',
    answers: [
      {
        optionId: 1,
        label: '1939',
        correct: true
      },
      {
        optionId: 2,
        label: '1937',
        correct: false
      },
      {
        optionId: 3,
        label: '1941',
        correct: false
      }
    ],
  },
  { 
    id: 8,
    question: 'ვინ იყო ამერიკის პირველი პრეზიდენტი?',
    answers: [
      {
        optionId: 1,
        label: 'ჯორჯ ვაშინგტონი',
        correct: true
      },
      {
        optionId: 2,
        label: 'თომას ჯეფერსონი',
        correct: false
      },
      {
        optionId: 3,
        label: 'ენდრიუ ჯექსონი',
        correct: false
      }
    ],
  },
  { 
    id: 9,
    question: 'რომელ წელს მოხდა დიდგორის ბრძოლა?',
    answers: [
      {
        optionId: 1,
        label: '1121',
        correct: true
      },
      {
        optionId: 2,
        label: '1134',
        correct: false
      },
      {
        optionId: 3,
        label: '1201',
        correct: false
      }
    ],
  },
  { 
    id: 10,
    question: '7 * 7?',
    answers: [
      {
        optionId: 1,
        label: '49',
        correct: true
      },
      {
        optionId: 2,
        label: '54',
        correct: false
      },
      {
        optionId: 3,
        label: '64',
        correct: false
      }
    ],
  },
];

const render = ({question,answers}) => {
  answersContainer.innerHTML = '';
  document.getElementById("question").innerHTML = question;

  for(const el of answers) {
    let button = document.createElement('input');
    button.setAttribute('id', el.optionId);
    button.value = el.label;
    button.type ='radio';
    button.setAttribute('name', 'answer');

    let label = document.createElement('label');
    label.setAttribute('for', el.optionId);
    label.innerHTML = el.label;
    answersContainer.appendChild(button);
    answersContainer.appendChild(label);
  }
}

let selectedObj;

const nextStep = () => {
  let checkedButton = buttonIsChecked();
  if(!checkedButton) return;

  if(stepIndex >= quiz.length ) {
    quizHolder.innerHTML = '';
    const result = document.createElement('div');
    result.classList.add('result');
    result.innerHTML = `შენ დააგროვე ${point} სწორი პასუხი`;
    quizHolder.appendChild(result);

    return;
  }

  if(selectedObj){
    let gettedValue = getValueFromButton();
    if(gettedValue === selectedObj.answers.find(el => el.correct).label){
      point++;
    }
  }

  stepIndex++;
  selectedObj = quiz.find(obj => obj.id === stepIndex);
  render(selectedObj);
}

const getValueFromButton = () => {
  let checkedEl = document.getElementsByName('answer');
  for(i = 0; i < checkedEl.length; i++) {
      if(checkedEl[i].checked){
        return checkedEl[i].value;
      }
  }
}

const buttonIsChecked = () => {
  let checkedEl = document.getElementsByName('answer');
  for(i = 0; i < checkedEl.length; i++) {
      if(checkedEl[i].checked){
        return checkedEl[i];
      }
  }
}

selectedObj = quiz.find(obj => obj.id === stepIndex);
render(selectedObj);

nextButton.addEventListener('click', nextStep);


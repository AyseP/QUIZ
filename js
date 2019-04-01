
let questions = [
    {
        number: 1,
        title: "KKTC'nin başkenti neresidir?",
        answered: false,
        options: [
            {
                text: "Lefkoşa",
                value: "Lefkoşa",
                istrue: true,
                selected: false
            },
            {
                text: "Lefke",
                value: "Lefke",
                istrue: false,
                selected: false
            },
            {
                text: "Girne",
                value: "Girne",
                istrue: false,
                selected: false
            },
            {
                text: "Gazimağusa",
                value: "Gazimağusa",
                istrue: false,
                selected: false
            }
        ]
    },
    {
        number: 2,
        title: "Allahüekber dağları Türkiye'nin hangi bölgesindedir??",
        answered: false,
        options: [
            {
                text: "Karadeniz",
                value: "Karadeniz",
                istrue: false,
                selected: false
            },
            {
                text: "Akdeniz",
                value: "Harry",
                istrue: false,
                selected: false
            },
            {
                text: "Doğu Anadolu",
                value: "Doğu Anadolu",
                istrue: true,
                selected: false
            },
            {
                text: "Ege",
                value: "Ege",
                istrue: false,
                selected: false
            }
        ]
    },
    {
        number: 3,
        title: "Tuz Gölünün hangi illerimizde kıyısı yoktur?",
        answered: false,
        options: [
            {
                text: "Ankara",
                value: "Ankara",
                istrue: false,
                selected: false
            },
            {
                text: "Konya",
                value: "Konya",
                istrue: false,
                selected: false
            },
            {
                text: "Aksaray",
                value: "Aksaray",
                istrue: false,
                selected: false
            },
            {
                text: "Niğde",
                value: "Niğde",
                istrue: true,
                selected: false
            }
        ]
    },
    {
        number: 4,
        title: "Pekiii hangi ilimizin sadece 1 komşusu vardır?",
        answered: false,
        options: [
            {
                text: "Bartın",
                value: "Bartın",
                istrue: false,
                selected: false
            },
            {
                text: "Kilis",
                value: "Kilis",
                istrue: true,
                selected: false
            },
            {
                text: "Hakkari",
                value: "Hakkari",
                istrue: false,
                selected: false
            },
            {
                text: "Rize",
                value: "Rize",
                istrue: false,
                selected: false
            }
        ]
    },
    {
        number: 5,
        title: "Alüvyon hangisiyle alakalı bir terimdir?",
        answered: false,
        options: [
            {
                text: "Hava",
                value: "Hava",
                istrue: false,
                selected: false
            },
            {
                text: "Dağ",
                value: "Dağ",
                istrue: false,
                selected: false
            },
            {
                text: "Deprem",
                value: "Deprem",
                istrue: false,
                selected: false
            },
            {
                text: "Akarsu",
                value: "Akarsu",
                istrue: true,
                selected: false
            }
        ]
    }
];

let game = {
    running: false,
    ended: false,
    answers: {
        true: 0,
        false: 0
    }
}

let questionsElement = document.querySelector("#questions");
let questionTemplate = document.querySelector("#question-template");
let questionOptionTemplate = document.querySelector("#questions_option_template");
let currentQuestionIndex = 0; //kullanıcının 0. indexteki soruda. 

function render() {

    if (game.running) {
        questionsElement.style.display = "block";
        document.querySelector("#start_game").style.display = "none";

        if (currentQuestionIndex == 0) {

            document.querySelector("#prev_question").style.display = "none";
        }
        else {
            document.querySelector("#prev_question").style.display = "initial";
        }
        if (currentQuestionIndex == questions.length - 1) {
            document.querySelector("#next_question").style.display = "none";
        }
        else {
            document.querySelector("#next_question").style.display = "initial";
        }
    }
    else {
        questionsElement.style.display = "none";
        document.querySelector("#prev_question").style.display = "none";
        document.querySelector("#next_question").style.display = "none";
        document.querySelector("#start_game").style.display = "initial";
    }

    if (game.ended) {
        document.querySelector("#results").className = "d-block";
        document.querySelector("#true_answer_count").innerText = game.answers.true;
        document.querySelector("#false_answer_count").innerText = game.answers.false;
    }
    else {
        document.querySelector("#results").className = "d-none";
    }

}
function renderCurrentQuestion() {
    if (questions.length === currentQuestionIndex) {
        game.running = false;
        game.ended = true;
        render();
        return;
    }

    render();
    // 
    const question = questions[currentQuestionIndex];
    let html = questionTemplate.innerHTML
        .replace("{{title}}", question.title)
        .replace("{{number}}", question.number);

    let optionsHtml = "";
    for (let y = 0; y < question.options.length; y++) {
        const option = question.options[y];

        let className = "";
        if (option.selected) {
            className = "btn-warning";
        }
        else {
            if (question.answered) {
                className = "btn-disabled";
            }
            else {
                className = "btn btn-outline-secondary";
            }
        }
        optionsHtml += questionOptionTemplate.innerHTML
            .replace("{{text}}", option.text)
            .replace("{{value}}", option.value)
            .replace("{{class}}", className);
    }
    html = html.replace("{{options}}", optionsHtml);
    questionsElement.innerHTML = html;
    let options = document.querySelectorAll("#options a");
    for (let index = 0; index < options.length; index++) {
        const option = options[index];
        option.addEventListener("click", function () {
            let currentQuestion = questions[currentQuestionIndex];
            let clickedOption = currentQuestion.options.find(x => x.value == this.dataset.value);

            if (currentQuestion.answered) {
                return;
            }
            currentQuestion.answered = true;
            clickedOption.selected = true;
            if (clickedOption.istrue)
                game.answers.true++;
            else
                game.answers.false++;

            currentQuestionIndex++;
            renderCurrentQuestion();
        });
    }
}

document.querySelector("#start_game").addEventListener("click", function () {
    game.running = true;
    game.ended = false;
    game.answers.true = 0;
    game.answers.false = 0;
    questions.forEach(question => {
        question.answered = false;
        question.options.forEach(option => {
            option.selected = false;
        });
    });

    render();
    currentQuestionIndex = 0;
    renderCurrentQuestion();
})
document.querySelector("#prev_question").addEventListener("click", function () {

    currentQuestionIndex--;
    renderCurrentQuestion();
});
document.querySelector("#next_question").addEventListener("click", function () {

    currentQuestionIndex++;
    renderCurrentQuestion();
});

render();

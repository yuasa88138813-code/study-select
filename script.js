const questions = [
    {
        text: "授業の進み方について、どう感じますか？",
        options: [
            { text: "みんなと同じペースで進めてほしい", value: 1 },
            { text: "基本は同じがいいが、たまに自分のペースも欲しい", value: 2 },
            { text: "完全に自分のペースで、どんどん進めたり復習したりしたい", value: 3 }
        ]
    },
    {
        text: "競争心について、自分に当てはまるのは？",
        options: [
            { text: "ライバルがいると断然やる気が出る", value: 1 },
            { text: "たまには競争もいいが、マイペースも大事", value: 2 },
            { text: "他人と比べずに、昨日の自分を超えていきたい", value: 3 }
        ]
    },
    {
        text: "先生への質問のしやすさは？",
        options: [
            { text: "みんなの前で質問するのは恥ずかしい", value: 1 },
            { text: "授業後になら先生に聞きに行ける", value: 2 },
            { text: "わからないその瞬間に、すぐに解決したい", value: 3 }
        ]
    },
    {
        text: "学習スケジュールの希望は？",
        options: [
            { text: "決まった時間割があるほうが楽だ", value: 1 },
            { text: "ある程度決まっていたほうがいいが、変更もしたい", value: 2 },
            { text: "部活や予定に合わせて、自分で柔軟に決めたい", value: 3 }
        ]
    },
    {
        text: "苦手な科目の克服方法は？",
        options: [
            { text: "授業の流れの中で何とか理解したい", value: 1 },
            { text: "補習があれば参加して埋め合わせたい", value: 2 },
            { text: "苦手な箇所まで学年を戻って、基礎から徹底的にやり直したい", value: 3 }
        ]
    },
    {
        text: "得意科目の伸ばし方は？",
        options: [
            { text: "クラスの中で上位を目指したい", value: 1 },
            { text: "得意な科目は少し先取りもしてみたい", value: 2 },
            { text: "学年に関係なく、どんどん先取りして極めたい", value: 3 }
        ]
    },
    {
        text: "どんな環境で最も集中できますか？",
        options: [
            { text: "周りに人がいるほうが緊張感があって良い", value: 1 },
            { text: "静かすぎると逆に落ち着かないこともある", value: 2 },
            { text: "仕切りがある個別の空間で、自分の世界に入り込みたい", value: 3 }
        ]
    },
    {
        text: "先生に求める役割は？",
        options: [
            { text: "面白い授業で引っ張ってほしい", value: 1 },
            { text: "分からない時だけ教えてくれればいい", value: 2 },
            { text: "自分の学習計画ややり方をコーチングしてほしい", value: 3 }
        ]
    },
    {
        text: "テスト勉強の進め方は？",
        options: [
            { text: "みんなと同じ対策プリントをやりたい", value: 1 },
            { text: "基本問題はみんなと、応用は自分でやりたい", value: 2 },
            { text: "自分に必要な単元だけをピンポイントで効率よくやりたい", value: 3 }
        ]
    },
    {
        text: "塾に行くモチベーションは？",
        options: [
            { text: "友達と会えるから塾に行くのが楽しい", value: 1 },
            { text: "友達も大事だが、勉強も大事", value: 2 },
            { text: "純粋に成績を上げたい、そのために塾に行く", value: 3 }
        ]
    }
];

let currentQuestionIndex = 0;
let totalScore = 0;
let answerHistory = []; // Store the text of selected answers

// DOM Elements
const startScreen = document.getElementById('start-screen');
const questionScreen = document.getElementById('question-screen');
const loadingScreen = document.getElementById('loading-screen');
const resultScreen = document.getElementById('result-screen');

const startBtn = document.getElementById('start-btn');
// const restartBtn = document.getElementById('restart-btn'); // Removed
const questionText = document.getElementById('question-text');
const questionCounter = document.getElementById('question-counter');
const progressBar = document.getElementById('progress-bar');
const optionsContainer = document.querySelector('.options-container');

// Event Listeners
startBtn.addEventListener('click', startGame);
// restartBtn.addEventListener('click', startGame); // Removed

function startGame() {
    currentQuestionIndex = 0;
    currentQuestionIndex = 0;
    totalScore = 0;
    answerHistory = []; // Reset history
    showScreen(questionScreen);
    renderQuestion();
}

function showScreen(screen) {
    document.querySelectorAll('.screen').forEach(s => {
        s.classList.remove('active');
        s.classList.add('hidden');
    });
    screen.classList.remove('hidden');
    screen.classList.add('active');
}

function renderQuestion() {
    const question = questions[currentQuestionIndex];

    // Animate transition
    const card = document.querySelector('.question-card');
    card.classList.remove('fade-in');
    void card.offsetWidth; // Trigger reflow
    card.classList.add('fade-in');

    questionText.innerText = question.text;
    questionCounter.innerText = `Q.${currentQuestionIndex + 1} / ${questions.length}`;

    // Update Progress Bar
    const progressPercent = ((currentQuestionIndex) / questions.length) * 100;
    progressBar.style.width = `${progressPercent}%`;

    // Clear and rebuild options
    optionsContainer.innerHTML = '';

    question.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.className = 'option-btn';
        btn.onclick = () => handleAnswer(option.value, option.text); // Pass text too

        const label = document.createElement('span');
        label.className = 'option-label';
        label.innerText = ['A', 'B', 'C'][index];

        const text = document.createElement('span');
        text.className = 'option-text';
        text.innerText = option.text;

        btn.appendChild(label);
        btn.appendChild(text);
        optionsContainer.appendChild(btn);
    });
}

function handleAnswer(value, text) {
    totalScore += value;

    // Record history
    answerHistory.push({
        q: questions[currentQuestionIndex].text,
        a: text
    });

    // Smooth transition to next question
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;

        // Add completion to progress bar
        const progressPercent = ((currentQuestionIndex) / questions.length) * 100;
        progressBar.style.width = `${progressPercent}%`;

        setTimeout(() => {
            renderQuestion();
        }, 300);
    } else {
        progressBar.style.width = '100%';
        showLoading();
    }
}

function showLoading() {
    showScreen(loadingScreen);
    setTimeout(() => {
        showResult();
    }, 1500); // Fake Loading for suspense
}

function showResult() {
    showScreen(resultScreen);

    let resultType = "";
    let resultTitle = "";
    let resultDesc = "";
    let resultAdvice = "";

    // Scoring Logic (Min 10, Max 30)
    // 10-16: Type A (Group)
    // 17-23: Type B (Neutral/Balanced)
    // 24-30: Type C (Autonomous)

    if (totalScore <= 16) {
        resultType = "協調性重視タイプ";
        resultTitle = "仲間と共に伸びるポテンシャル！";
        resultDesc = "あなたは周囲と協力しながら学ぶことが得意なタイプです。友達や仲間がいることで、モチベーションを維持しやすい傾向があります。しかし、本当の学力向上は「自分一人でできるか」にかかっています。";
        resultAdvice = "集団授業の良さを知りつつも、苦手分野を克服するには「自分だけの時間」が必要です。集団のペースに合わせるだけでなく、自立学習を取り入れて「自分に向き合う時間」を作ることで、成績は劇的に伸びるでしょう。自立学習こそが、あなたの隠れた才能を開花させる鍵です。";
    } else if (totalScore <= 23) {
        resultType = "バランス重視タイプ";
        resultTitle = "柔軟な思考の持ち主！";
        resultDesc = "あなたは状況に合わせて学習スタイルを使い分けられる柔軟性を持っています。基本は押さえつつ、自分のやり方も大切にしたいと考えています。";
        resultAdvice = "その柔軟性をさらに活かすには、固定されたカリキュラムよりも、日々の理解度に合わせて調整できる学習環境が最適です。「今日はこれをやりたい」という意欲を即座に実行に移せる「自立学習」のスタイルが、あなたの学力を効率よく引き上げます。";
    } else {
        resultType = "自立学習タイプ";
        resultTitle = "最強の独学ポテンシャル！";
        resultDesc = "あなたは自分のペースで進めることに強い意欲を持っています。他人に待たされたり、逆に急かされたりするのはストレスになるかもしれません。";
        resultAdvice = "あなたの才能を最大限に発揮するには、周りに合わせる必要は全くありません。自分のペースでどんどん先取りし、納得いくまで深掘りできる「自立学習」こそが、あなたにとって最高の学習環境です。このスタイルを極めれば、限界なく成績を伸ばしていけるでしょう。";
    }

    document.getElementById('score-text').innerText = resultType;
    document.getElementById('result-title').innerText = resultTitle;

    // Combined description and advice into one flow for the new layout
    const resultContainer = document.getElementById('result-description');
    resultContainer.innerHTML = `
        <p class="result-desc-text">${resultDesc}</p>
        <div class="persuasion-message">
            <h3>あなたへの提言</h3>
            <p>${resultAdvice}</p>
        </div>
    `;

    // Render History
    const historyList = document.getElementById('history-list');
    let historyHTML = '';
    answerHistory.forEach((item, index) => {
        historyHTML += `
            <div class="history-item">
                <div class="history-q">Q${index + 1}. ${item.q}</div>
                <div class="history-a">${item.a}</div>
            </div>
        `;
    });
    historyList.innerHTML = historyHTML;
}

// 题目数据
const questions = [
    {
        question: "11班在高二、高三时班里分别有多少同学？",
        options: ["48；48", "47；47", "48；49", "47；48"],
        correct: 1, // B选项，索引从0开始
        answer: "B"
    },
    {
        question: "杨乐是哪国人？",
        options: ["中国人", "英国人", "机器人", "美国人"],
        correct: 3, // D选项
        answer: "D"
    },
    {
        question: "李伟红的昵称是什么？",
        options: ["冷哥克星", "电子设备杀手", "dr", "红神"],
        correct: 2, // C选项
        answer: "C"
    },
    {
        question: "在葛新的'高分奖励二百元'活动中，生物单科排名进入年级前多少名可以获得奖励？",
        options: ["10", "25", "50", "100"],
        correct: 2, // C选项
        answer: "C"
    },
    {
        question: "在'进步奖励'聪明蛋''活动中，葛新一共欠了曹荣原多少个'聪明蛋'？",
        options: ["8", "13", "15", "19"],
        correct: 1, // B选项
        answer: "B"
    },
    {
        question: "谁最重？",
        options: ["李沛铮", "刘德文", "马凌云", "两个邵渤涵"],
        correct: 3, // D选项
        answer: "D"
    },
    {
        question: "谁最高？",
        options: ["李伟红", "张在民", "付翠秋", "吴静"],
        correct: 1, // B选项
        answer: "B"
    },
    {
        question: "巅峰姚钧兴曾在班里拥有多少个暗恋者？",
        options: ["2个", "3个", "4个", "5个"],
        correct: 2, // C选项
        answer: "C"
    },
    {
        question: "王飞尘在高中的曾用名是什么？",
        options: ["王子豪", "王嘉豪", "王家乐", "王家豪"],
        correct: 0, // A选项
        answer: "A"
    },
    {
        question: "冯子涵经常在大屏幕上放什么类型的音乐？",
        options: ["摇滚乐", "说唱", "流行音乐", "古典音乐"],
        correct: 1, // B选项
        answer: "B"
    },
    {
        question: "哪位老师曾隐晦地指出邵润之的名与毛主席的字相同？",
        options: ["马炳新", "丁辉", "张在民", "吴静"],
        correct: 0, // A选项
        answer: "A"
    },
    {
        question: "元旦晚会上，李高寰和杨舒童曾联手倾情献唱了哪一首歌？",
        options: ["《成全》", "《绿光》", "《海阔天空》", "《下一个天亮》"],
        correct: 3, // D选项
        answer: "D"
    },
    {
        question: "毕业时，杨乐制作了哪几个老师的摇头玩具？",
        options: ["李伟红，吴静，丁辉", "李伟红，吴静，张在民", "李伟红，丁辉，张在民", "李伟红，丁辉，付翠秋"],
        correct: 0, // A选项
        answer: "A"
    }
];

// 游戏状态
let currentQuestion = 0;
let score = 0;
let answered = false;

// DOM元素
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const questionNumber = document.getElementById('question-number');
const scoreDisplay = document.getElementById('score');
const progressBar = document.getElementById('progress-bar');
const questionText = document.getElementById('question-text');
const optionButtons = document.querySelectorAll('.option-btn');
const feedback = document.getElementById('feedback');
const feedbackIcon = document.getElementById('feedback-icon');
const feedbackText = document.getElementById('feedback-text');

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    startBtn.addEventListener('click', startQuiz);
    nextBtn.addEventListener('click', nextQuestion);
    
    // 为选项按钮添加点击事件
    optionButtons.forEach((btn, index) => {
        btn.addEventListener('click', () => selectAnswer(index));
    });
});

// 开始答题
function startQuiz() {
    startScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    loadQuestion();
}

// 加载题目
function loadQuestion() {
    const question = questions[currentQuestion];
    
    // 更新题目信息
    questionNumber.textContent = `第 ${currentQuestion + 1} 题 / 共 ${questions.length} 题`;
    questionText.textContent = question.question;
    
    // 更新选项
    const optionIds = ['option-a', 'option-b', 'option-c', 'option-d'];
    optionIds.forEach((id, index) => {
        document.getElementById(id).textContent = question.options[index];
    });
    
    // 重置按钮状态
    optionButtons.forEach(btn => {
        btn.classList.remove('correct', 'incorrect');
        btn.disabled = false;
    });
    
    // 隐藏下一题按钮
    nextBtn.classList.add('hidden');
    
    // 重置答题状态
    answered = false;
    
    // 更新进度条
    const progress = ((currentQuestion) / questions.length) * 100;
    progressBar.style.width = progress + '%';
}

// 选择答案
function selectAnswer(selectedIndex) {
    if (answered) return;
    
    answered = true;
    const question = questions[currentQuestion];
    const isCorrect = selectedIndex === question.correct;
    
    // 禁用所有按钮
    optionButtons.forEach(btn => {
        btn.disabled = true;
    });
    
    // 标记正确和错误答案
    optionButtons[question.correct].classList.add('correct');
    if (!isCorrect) {
        optionButtons[selectedIndex].classList.add('incorrect');
    }
    
    // 更新分数
    if (isCorrect) {
        score += Math.round(100 / questions.length);
        scoreDisplay.textContent = `得分: ${score} / 100`;
        showFeedback(true, `答对了！+${Math.round(100 / questions.length)}分`);
    } else {
        showFeedback(false, `答错了！正确答案是${question.answer}`);
    }
    
    // 显示下一题按钮
    setTimeout(() => {
        nextBtn.classList.remove('hidden');
    }, 1500);
}

// 显示反馈
function showFeedback(isCorrect, message) {
    feedbackIcon.textContent = isCorrect ? '✅' : '❌';
    feedbackText.textContent = message;
    
    feedback.classList.remove('hidden');
    
    // 动画效果
    anime({
        targets: '#feedback-content',
        scale: [0, 1],
        opacity: [0, 1],
        duration: 500,
        easing: 'easeOutBack'
    });
    
    // 3秒后隐藏
    setTimeout(() => {
        anime({
            targets: '#feedback-content',
            scale: [1, 0],
            opacity: [1, 0],
            duration: 300,
            easing: 'easeInBack',
            complete: () => {
                feedback.classList.add('hidden');
            }
        });
    }, 2000);
}

// 下一题
function nextQuestion() {
    currentQuestion++;
    
    if (currentQuestion >= questions.length) {
        // 答题完成，跳转到结果页面
        window.location.href = `result.html?score=${score}`;
    } else {
        // 加载下一题
        loadQuestion();
        
        // 题目切换动画
        anime({
            targets: '.quiz-card',
            translateX: [-50, 0],
            opacity: [0.7, 1],
            duration: 400,
            easing: 'easeOutQuad'
        });
    }
}

// 页面切换动画
function animatePageTransition() {
    anime({
        targets: '.quiz-card',
        translateY: [30, 0],
        opacity: [0, 1],
        duration: 600,
        easing: 'easeOutQuad'
    });
}

// 页面加载完成后执行入场动画
window.addEventListener('load', () => {
    if (!startScreen.classList.contains('hidden')) {
        animatePageTransition();
    }
});
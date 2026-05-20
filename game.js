// Brain Spark IQ - Game Logic
// Developed by Big Sam

// Game State
let currentQuestion = 0;
let score = 0;
let correctAnswers = 0;
let streak = 0;
let maxStreak = 0;
let totalTime = 0;
let questionTimes = [];
let hints = 3;
let timer = null;
let timeLeft = 30;
let questions = [];
let sessionResults = [];
let bestIQ = 0;
let selectedCategories = [];

// Config
const defaultConfig = {
  app_title: "Brain Spark IQ",
  start_button_text: "Mulai Tes",
  results_title: "Skor IQ Anda",
  background_color: "#f8fafc",
  surface_color: "#ffffff",
  text_color: "#0f172a",
  primary_action_color: "#0f172a",
  secondary_action_color: "#f59e0b",
  font_family: "Inter",
  font_size: 16
};

let config = { ...defaultConfig };

// SDK Initialization
const dataHandler = {
  onDataChanged(data) {
    sessionResults = data;
    updateBestScore();
  }
};

function updateBestScore() {
  if (sessionResults.length > 0) {
    bestIQ = Math.max(...sessionResults.map(r => r.iq_estimate || 0));
    const prevResults = document.getElementById('prev-results');
    const bestIQDisplay = document.getElementById('best-iq');
    if (bestIQ > 0) {
      prevResults.classList.remove('hidden');
      bestIQDisplay.textContent = Math.round(bestIQ);
    }
  }
}

function applyConfig(cfg) {
  const title = document.getElementById('title-display');
  const startBtnText = document.getElementById('start-btn-text');
  const resultsTitle = document.getElementById('results-title-text');
  
  if (title) title.textContent = cfg.app_title || defaultConfig.app_title;
  if (startBtnText) startBtnText.textContent = cfg.start_button_text || defaultConfig.start_button_text;
  if (resultsTitle) resultsTitle.textContent = cfg.results_title || defaultConfig.results_title;
  
  document.body.style.setProperty('--bg-color', cfg.background_color || defaultConfig.background_color);
  document.body.style.setProperty('--surface-color', cfg.surface_color || defaultConfig.surface_color);
  document.body.style.setProperty('--text-color', cfg.text_color || defaultConfig.text_color);
  document.body.style.setProperty('--primary-color', cfg.primary_action_color || defaultConfig.primary_action_color);
  document.body.style.setProperty('--secondary-color', cfg.secondary_action_color || defaultConfig.secondary_action_color);
  
  const fontFamily = cfg.font_family || defaultConfig.font_family;
  document.querySelectorAll('.font-body').forEach(el => {
    el.style.fontFamily = `${fontFamily}, Quicksand, sans-serif`;
  });
}

async function initSDKs() {
  if (window.dataSdk) {
    await window.dataSdk.init(dataHandler);
  }
  
  if (window.elementSdk) {
    window.elementSdk.init({
      defaultConfig,
      onConfigChange: async (newConfig) => {
        config = { ...config, ...newConfig };
        applyConfig(config);
      },
      mapToCapabilities: (cfg) => ({
        recolorables: [
          {
            get: () => cfg.background_color || defaultConfig.background_color,
            set: (v) => { cfg.background_color = v; window.elementSdk.setConfig({ background_color: v }); }
          },
          {
            get: () => cfg.surface_color || defaultConfig.surface_color,
            set: (v) => { cfg.surface_color = v; window.elementSdk.setConfig({ surface_color: v }); }
          },
          {
            get: () => cfg.text_color || defaultConfig.text_color,
            set: (v) => { cfg.text_color = v; window.elementSdk.setConfig({ text_color: v }); }
          },
          {
            get: () => cfg.primary_action_color || defaultConfig.primary_action_color,
            set: (v) => { cfg.primary_action_color = v; window.elementSdk.setConfig({ primary_action_color: v }); }
          },
          {
            get: () => cfg.secondary_action_color || defaultConfig.secondary_action_color,
            set: (v) => { cfg.secondary_action_color = v; window.elementSdk.setConfig({ secondary_action_color: v }); }
          }
        ],
        borderables: [],
        fontEditable: {
          get: () => cfg.font_family || defaultConfig.font_family,
          set: (v) => { cfg.font_family = v; window.elementSdk.setConfig({ font_family: v }); }
        },
        fontSizeable: {
          get: () => cfg.font_size || defaultConfig.font_size,
          set: (v) => { cfg.font_size = v; window.elementSdk.setConfig({ font_size: v }); }
        }
      }),
      mapToEditPanelValues: (cfg) => new Map([
        ["app_title", cfg.app_title || defaultConfig.app_title],
        ["start_button_text", cfg.start_button_text || defaultConfig.start_button_text],
        ["results_title", cfg.results_title || defaultConfig.results_title]
      ])
    });
  }
  
  applyConfig(config);
}

// Generate Questions
function generateQuestions() {
  questions = [];
  
  // Use selected categories or all if none selected
  const categoriesToUse = selectedCategories.length > 0 ? selectedCategories : Object.keys(questionBank);
  const difficulties = ['easy', 'medium', 'hard'];
  
  // Adaptive difficulty based on progress
  for (let i = 0; i < 20; i++) {
    const category = categoriesToUse[i % categoriesToUse.length];
    let difficulty;
    
    if (i < 5) difficulty = 'easy';
    else if (i < 12) difficulty = 'medium';
    else difficulty = 'hard';
    
    // Add some randomness
    if (Math.random() > 0.7 && difficulty !== 'hard') {
      difficulty = difficulties[difficulties.indexOf(difficulty) + 1];
    }
    
    const pool = questionBank[category][difficulty];
    const question = pool[Math.floor(Math.random() * pool.length)];
    
    questions.push({
      ...question,
      category,
      difficulty,
      categoryData: categories[category]
    });
  }
  
  // Shuffle questions within difficulty bands
  questions = shuffle(questions);
}

// Category Selection Functions
function showCategorySelection() {
  document.getElementById('start-screen').classList.add('hidden');
  document.getElementById('category-screen').classList.remove('hidden');
  document.getElementById('category-screen').classList.add('flex');
  selectedCategories = [];
  updateCategoryUI();
}

function backToStart() {
  document.getElementById('category-screen').classList.add('hidden');
  document.getElementById('category-screen').classList.remove('flex');
  document.getElementById('start-screen').classList.remove('hidden');
}

function toggleCategory(category) {
  const index = selectedCategories.indexOf(category);
  
  if (index > -1) {
    // Remove category
    selectedCategories.splice(index, 1);
  } else {
    // Add category (max 4)
    if (selectedCategories.length < 4) {
      selectedCategories.push(category);
    }
  }
  
  updateCategoryUI();
}

function updateCategoryUI() {
  const allCategories = ['art', 'logic', 'math', 'spatial', 'pattern', 'verbal', 'memory'];
  
  allCategories.forEach(cat => {
    const card = document.getElementById(`cat-${cat}`);
    const check = card.querySelector('.category-check');
    
    if (selectedCategories.includes(cat)) {
      card.classList.add('selected');
      check.classList.remove('hidden');
    } else {
      card.classList.remove('selected');
      check.classList.add('hidden');
    }
  });
  
  // Update counter
  document.getElementById('selected-count').textContent = selectedCategories.length;
  
  // Enable/disable continue button
  const continueBtn = document.getElementById('continue-btn');
  if (selectedCategories.length > 0) {
    continueBtn.disabled = false;
  } else {
    continueBtn.disabled = true;
  }
}

function startTestWithCategories() {
  if (selectedCategories.length === 0) return;
  
  document.getElementById('category-screen').classList.add('hidden');
  document.getElementById('category-screen').classList.remove('flex');
  
  startTest();
}

function shuffle(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Start Test
function startTest() {
  generateQuestions();
  currentQuestion = 0;
  score = 0;
  correctAnswers = 0;
  streak = 0;
  maxStreak = 0;
  totalTime = 0;
  questionTimes = [];
  hints = 3;
  
  document.getElementById('start-screen').classList.add('hidden');
  document.getElementById('quiz-screen').classList.remove('hidden');
  document.getElementById('quiz-screen').classList.add('flex');
  document.getElementById('results-screen').classList.add('hidden');
  
  document.getElementById('hints-left').textContent = hints;
  document.getElementById('score-display').textContent = '0';
  
  showQuestion();
}

// Show Question
function showQuestion() {
  if (currentQuestion >= questions.length) {
    endTest();
    return;
  }

  const q = questions[currentQuestion];
  
  // Update UI
  document.getElementById('q-num').textContent = currentQuestion + 1;
  document.getElementById('progress-bar').style.width = `${((currentQuestion + 1) / 20) * 100}%`;
  document.getElementById('category-icon').textContent = q.categoryData.icon;
  document.getElementById('category-text').textContent = q.categoryData.name;
  
  const diffBadge = document.getElementById('difficulty-badge');
  const difficultyMap = { easy: "Mudah", medium: "Sedang", hard: "Sulit" };
  diffBadge.textContent = difficultyMap[q.difficulty];
  diffBadge.className = `text-xs px-2 py-0.5 rounded-full bg-${difficultyColors[q.difficulty]}-100 text-${difficultyColors[q.difficulty]}-700 font-medium`;
  
  document.getElementById('question-text').textContent = q.q;
  
  // Render visual art if present
  const visualArea = document.getElementById('visual-area');
  const visualContent = document.getElementById('visual-content');
  if (q.visual) {
    visualArea.classList.remove('hidden');
    
    // Set dark background for visibility if needed (especially for art/negative space)
    if (q.category === 'art' || q.visual.type === 'negative' || q.visual.type === 'gestalt') {
      visualContent.style.backgroundColor = '#0f172a'; // Slate-900
      visualContent.classList.add('border-slate-800');
      visualContent.classList.remove('bg-slate-50', 'border-slate-100');
    } else {
      visualContent.style.backgroundColor = '';
      visualContent.classList.add('bg-slate-50', 'border-slate-100');
      visualContent.classList.remove('border-slate-800');
    }
    
    visualContent.innerHTML = renderArt(q.visual);
  } else {
    visualArea.classList.add('hidden');
  }
  
  // Render options
  const optionsContainer = document.getElementById('options-container');
  optionsContainer.innerHTML = '';
  
  q.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn glass-card rounded-xl p-4 text-left text-slate-900 hover:border-amber-500/50 transition-all duration-300 flex items-center gap-4';
    btn.innerHTML = `
      <span class="w-8 h-8 rounded-full bg-amber-100 text-amber-700 font-bold flex items-center justify-center text-sm font-display">${String.fromCharCode(65 + idx)}</span>
      <span class="flex-1 font-medium">${opt}</span>
    `;
    btn.onclick = () => selectAnswer(idx);
    btn.id = `option-${idx}`;
    optionsContainer.appendChild(btn);
  });

  // Update streak display
  const streakDisplay = document.getElementById('streak-display');
  if (streak >= 3) {
    streakDisplay.classList.remove('hidden');
    document.getElementById('streak-count').textContent = streak;
  } else {
    streakDisplay.classList.add('hidden');
  }

  // Start timer
  startTimer();
  
  // Animate entrance
  optionsContainer.querySelectorAll('button').forEach((btn, i) => {
    btn.style.opacity = '0';
    btn.style.transform = 'translateY(20px)';
    setTimeout(() => {
      btn.style.transition = 'all 0.3s ease-out';
      btn.style.opacity = '1';
      btn.style.transform = 'translateY(0)';
    }, 100 + i * 100);
  });
}

// Render Art Visuals
function renderArt(visual) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 200 200");
  svg.setAttribute("class", "w-full h-64 rounded-xl");
  
  if (visual.type === "abstract" || visual.type === "overlap") {
    visual.shapes.forEach(shape => {
      if (shape.type === "circle") {
        const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        circle.setAttribute("cx", shape.x * 2);
        circle.setAttribute("cy", shape.y * 2);
        circle.setAttribute("r", shape.r * 2);
        circle.setAttribute("fill", shape.color);
        circle.setAttribute("opacity", shape.opacity || 1);
        svg.appendChild(circle);
      } else if (shape.type === "rect") {
        const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
        rect.setAttribute("x", shape.x * 2);
        rect.setAttribute("y", shape.y * 2);
        rect.setAttribute("width", shape.w * 2);
        rect.setAttribute("height", shape.h * 2);
        rect.setAttribute("fill", shape.color);
        if (shape.rotation) {
          rect.setAttribute("transform", `rotate(${shape.rotation} ${shape.x * 2 + shape.w} ${shape.y * 2 + shape.h})`);
        }
        svg.appendChild(rect);
      } else if (shape.type === "triangle") {
        const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        polygon.setAttribute("points", `${shape.x1*2},${shape.y1*2} ${shape.x2*2},${shape.y2*2} ${shape.x3*2},${shape.y3*2}`);
        polygon.setAttribute("fill", shape.color);
        svg.appendChild(polygon);
      }
    });
  } else if (visual.type === "pattern" || visual.type === "mandala") {
    const centerX = 100;
    const centerY = 100;
    const petals = visual.petals || 8;
    const colors = visual.colors;
    
    for (let i = 0; i < petals; i++) {
      const angle = (Math.PI * 2 * i) / petals;
      const x = centerX + Math.cos(angle) * 40;
      const y = centerY + Math.sin(angle) * 40;
      
      const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      circle.setAttribute("cx", x);
      circle.setAttribute("cy", y);
      circle.setAttribute("r", "25");
      circle.setAttribute("fill", colors[i % colors.length]);
      circle.setAttribute("opacity", "0.7");
      svg.appendChild(circle);
    }
    
    // Center circle
    const center = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    center.setAttribute("cx", centerX);
    center.setAttribute("cy", centerY);
    center.setAttribute("r", "20");
    center.setAttribute("fill", colors[0]);
    svg.appendChild(center);
  } else if (visual.type === "gradient") {
    const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
    const gradient = document.createElementNS("http://www.w3.org/2000/svg", 
      visual.direction === "radial" ? "radialGradient" : "linearGradient");
    gradient.setAttribute("id", "artGradient");
    
    const stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    stop1.setAttribute("offset", "0%");
    stop1.setAttribute("stop-color", visual.from);
    gradient.appendChild(stop1);
    
    const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
    stop2.setAttribute("offset", "100%");
    stop2.setAttribute("stop-color", visual.to);
    gradient.appendChild(stop2);
    
    defs.appendChild(gradient);
    svg.appendChild(defs);
    
    const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect.setAttribute("width", "200");
    rect.setAttribute("height", "200");
    rect.setAttribute("fill", "url(#artGradient)");
    rect.setAttribute("rx", "10");
    svg.appendChild(rect);
  } else if (visual.type === "geometric") {
    visual.shapes.forEach(shape => {
      const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      rect.setAttribute("x", shape.x * 2);
      rect.setAttribute("y", shape.y * 2);
      rect.setAttribute("width", shape.w * 2);
      rect.setAttribute("height", shape.h * 2);
      rect.setAttribute("fill", shape.color);
      rect.setAttribute("stroke", "#ffffff");
      rect.setAttribute("stroke-width", "2");
      svg.appendChild(rect);
    });
  } else if (visual.type === "flow") {
    visual.arrows.forEach(arrow => {
      const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
      const x = arrow.x * 2;
      const y = arrow.y * 2;
      path.setAttribute("d", `M ${x} ${y} L ${x} ${y - 40} L ${x - 10} ${y - 30} M ${x} ${y - 40} L ${x + 10} ${y - 30}`);
      path.setAttribute("stroke", arrow.color);
      path.setAttribute("stroke-width", "4");
      path.setAttribute("fill", "none");
      path.setAttribute("stroke-linecap", "round");
      svg.appendChild(path);
    });
  } else if (visual.type === "symmetry") {
    const colors = visual.colors;
    // Left side pattern
    for (let i = 0; i < 3; i++) {
      const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      rect.setAttribute("x", 20 + i * 20);
      rect.setAttribute("y", 50 + i * 15);
      rect.setAttribute("width", "30");
      rect.setAttribute("height", "30");
      rect.setAttribute("fill", colors[i % colors.length]);
      rect.setAttribute("opacity", "0.8");
      svg.appendChild(rect);
      
      // Mirror on right
      const rectMirror = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      rectMirror.setAttribute("x", 200 - (20 + i * 20) - 30);
      rectMirror.setAttribute("y", 50 + i * 15);
      rectMirror.setAttribute("width", "30");
      rectMirror.setAttribute("height", "30");
      rectMirror.setAttribute("fill", colors[i % colors.length]);
      rectMirror.setAttribute("opacity", "0.8");
      svg.appendChild(rectMirror);
    }
    
    // Center line
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", "100");
    line.setAttribute("y1", "0");
    line.setAttribute("x2", "100");
    line.setAttribute("y2", "200");
    line.setAttribute("stroke", "#ffffff");
    line.setAttribute("stroke-width", "2");
    line.setAttribute("stroke-dasharray", "5,5");
    line.setAttribute("opacity", "0.3");
    svg.appendChild(line);
  } else if (visual.type === "contrast") {
    const rect1 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect1.setAttribute("width", "100");
    rect1.setAttribute("height", "200");
    rect1.setAttribute("fill", visual.left);
    svg.appendChild(rect1);
    
    const rect2 = document.createElementNS("http://www.w3.org/2000/svg", "rect");
    rect2.setAttribute("x", "100");
    rect2.setAttribute("width", "100");
    rect2.setAttribute("height", "200");
    rect2.setAttribute("fill", visual.right);
    svg.appendChild(rect2);
  } else if (visual.type === "cubist") {
    const colors = visual.colors;
    for (let i = 0; i < visual.fragments; i++) {
      const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
      const x1 = Math.random() * 200;
      const y1 = Math.random() * 200;
      const x2 = x1 + Math.random() * 60 - 30;
      const y2 = y1 + Math.random() * 60 - 30;
      const x3 = x1 + Math.random() * 60 - 30;
      const y3 = y1 + Math.random() * 60 - 30;
      
      polygon.setAttribute("points", `${x1},${y1} ${x2},${y2} ${x3},${y3}`);
      polygon.setAttribute("fill", colors[i % colors.length]);
      polygon.setAttribute("opacity", "0.6");
      polygon.setAttribute("stroke", "#000000");
      polygon.setAttribute("stroke-width", "1");
      svg.appendChild(polygon);
    }
  } else if (visual.type === "fractal") {
    const colors = visual.colors;
    function drawFractal(x, y, size, depth) {
      if (depth === 0) return;
      
      const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      rect.setAttribute("x", x);
      rect.setAttribute("y", y);
      rect.setAttribute("width", size);
      rect.setAttribute("height", size);
      rect.setAttribute("fill", colors[depth % colors.length]);
      rect.setAttribute("opacity", 0.5 + (depth * 0.1));
      rect.setAttribute("stroke", "#ffffff");
      rect.setAttribute("stroke-width", "1");
      svg.appendChild(rect);
      
      const newSize = size / 2;
      drawFractal(x, y, newSize, depth - 1);
      drawFractal(x + size - newSize, y, newSize, depth - 1);
      drawFractal(x, y + size - newSize, newSize, depth - 1);
      drawFractal(x + size - newSize, y + size - newSize, newSize, depth - 1);
    }
    
    drawFractal(50, 50, 100, visual.iterations);
  } else if (visual.type === "minimal") {
    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", "100");
    circle.setAttribute("cy", "100");
    circle.setAttribute("r", "10");
    circle.setAttribute("fill", visual.colors[1]);
    svg.appendChild(circle);
    
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", "50");
    line.setAttribute("y1", "100");
    line.setAttribute("x2", "150");
    line.setAttribute("y2", "100");
    line.setAttribute("stroke", visual.colors[1]);
    line.setAttribute("stroke-width", "3");
    svg.appendChild(line);
  } else if (visual.type === "gestalt") {
    // Draw incomplete circle (Gestalt closure)
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M 100 40 A 60 60 0 1 1 60 100");
    path.setAttribute("stroke", "#00ff88");
    path.setAttribute("stroke-width", "6");
    path.setAttribute("fill", "none");
    path.setAttribute("stroke-linecap", "round");
    svg.appendChild(path);
  } else if (visual.type === "negative") {
    // Vase-faces illusion
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", "M 70 50 Q 80 80 70 110 Q 90 120 90 140 L 110 140 Q 110 120 130 110 Q 120 80 130 50 Z");
    path.setAttribute("fill", visual.colors[1]);
    svg.appendChild(path);
  }
  
  const container = document.createElement('div');
  container.appendChild(svg);
  return container.innerHTML;
}

// Timer
function startTimer() {
  timeLeft = 30;
  updateTimerDisplay();
  
  if (timer) clearInterval(timer);
  
  timer = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();
    
    if (timeLeft <= 0) {
      clearInterval(timer);
      selectAnswer(-1); // Time's up
    }
  }, 1000);
}

function updateTimerDisplay() {
  document.getElementById('timer-text').textContent = timeLeft;
  const circle = document.getElementById('timer-circle');
  const offset = 283 * (1 - timeLeft / 30);
  circle.style.strokeDashoffset = offset;
  
  if (timeLeft <= 5) {
    circle.style.stroke = '#ef4444';
  } else if (timeLeft <= 10) {
    circle.style.stroke = '#f59e0b';
  } else {
    circle.style.stroke = 'url(#timer-grad)';
  }
}

// Select Answer
function selectAnswer(idx) {
  clearInterval(timer);
  const q = questions[currentQuestion];
  const timeTaken = 30 - timeLeft;
  questionTimes.push(timeTaken);
  totalTime += timeTaken;

  const options = document.querySelectorAll('.option-btn');
  options.forEach(btn => btn.onclick = null);

  const isCorrect = idx === q.correct;
  
  if (isCorrect) {
    // Calculate points based on difficulty and time
    const basePoints = 100 * difficultyWeights[q.difficulty];
    const timeBonus = Math.max(0, (30 - timeTaken) * 2);
    const streakBonus = streak >= 3 ? streak * 10 : 0;
    const points = Math.round(basePoints + timeBonus + streakBonus);
    
    score += points;
    correctAnswers++;
    streak++;
    maxStreak = Math.max(maxStreak, streak);

    // Animate correct answer
    if (idx >= 0) {
      const btn = document.getElementById(`option-${idx}`);
      btn.classList.add('bg-emerald-100', 'border-emerald-500', 'animate-celebrate');
      btn.querySelector('span:first-child').classList.add('bg-emerald-500', 'text-white');
      btn.querySelector('span:first-child').classList.remove('bg-amber-100', 'text-amber-700');
    }

    // Show streak fire
    if (streak >= 3) {
      document.getElementById('streak-display').classList.add('streak-fire');
      setTimeout(() => {
        document.getElementById('streak-display').classList.remove('streak-fire');
      }, 500);
    }

    // Create mini confetti
    createMiniConfetti();
  } else {
    streak = 0;
    
    // Show wrong answer
    if (idx >= 0) {
      const btn = document.getElementById(`option-${idx}`);
      btn.classList.add('bg-rose-100', 'border-rose-500', 'animate-shake');
      btn.querySelector('span:first-child').classList.add('bg-rose-500', 'text-white');
      btn.querySelector('span:first-child').classList.remove('bg-amber-100', 'text-amber-700');
    }
    
    // Show correct answer
    const correctBtn = document.getElementById(`option-${q.correct}`);
    correctBtn.classList.add('bg-emerald-100', 'border-emerald-500');
    correctBtn.querySelector('span:first-child').classList.add('bg-emerald-500', 'text-white');
    correctBtn.querySelector('span:first-child').classList.remove('bg-amber-100', 'text-amber-700');
  }

  // Update score display
  document.getElementById('score-display').textContent = score;

  // Next question after delay
  setTimeout(() => {
    currentQuestion++;
    showQuestion();
  }, 1500);
}

// Use Hint
function useHint() {
  if (hints <= 0) return;
  
  const q = questions[currentQuestion];
  
  // Show hint text if available
  if (q.hint) {
    const hintMessage = document.createElement('div');
    hintMessage.className = 'glass-card rounded-xl p-4 mb-4 animate-slide-up';
    hintMessage.innerHTML = `
      <div class="flex items-start gap-3">
        <span class="text-2xl">💡</span>
        <div>
          <div class="text-amber-600 font-bold text-sm mb-1">Petunjuk:</div>
          <div class="text-slate-600 text-sm">${q.hint}</div>
        </div>
      </div>
    `;
    
    const questionCard = document.querySelector('#quiz-screen .glass-card');
    questionCard.parentElement.insertBefore(hintMessage, questionCard);
    
    // Remove hint after 8 seconds
    setTimeout(() => {
      hintMessage.style.opacity = '0';
      hintMessage.style.transform = 'translateY(-20px)';
      setTimeout(() => hintMessage.remove(), 300);
    }, 8000);
  }
  
  // Also eliminate 2 wrong options
  const wrongOptions = q.options
    .map((_, idx) => idx)
    .filter(idx => idx !== q.correct);
  
  // Disable 2 wrong options
  const toDisable = shuffle(wrongOptions).slice(0, 2);
  toDisable.forEach(idx => {
    const btn = document.getElementById(`option-${idx}`);
    btn.classList.add('opacity-30', 'pointer-events-none');
  });

  hints--;
  document.getElementById('hints-left').textContent = hints;
  
  if (hints <= 0) {
    document.getElementById('hint-btn').classList.add('opacity-30', 'pointer-events-none');
  }
}

// Mini Confetti
function createMiniConfetti() {
  const colors = ['#00ff88', '#00d4ff', '#8b5cf6', '#f59e0b', '#ef4444'];
  for (let i = 0; i < 10; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.top = '50%';
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.animation = `confetti-fall ${1 + Math.random()}s ease-out forwards`;
    document.getElementById('quiz-screen').appendChild(confetti);
    
    setTimeout(() => confetti.remove(), 2000);
  }
}

// End Test
async function endTest() {
  document.getElementById('quiz-screen').classList.add('hidden');
  document.getElementById('quiz-screen').classList.remove('flex');
  document.getElementById('results-screen').classList.remove('hidden');
  document.getElementById('results-screen').classList.add('flex');

  // Calculate IQ
  const accuracy = correctAnswers / 20;
  const avgTime = totalTime / 20;

  // --- Realistic IQ Calculation ---
  // Base: 70 (very low). Accuracy is the PRIMARY driver.
  // 0% correct  → ~70  (Di Bawah Rata-rata)
  // 25% correct → ~79  (Di Bawah Rata-rata)
  // 50% correct → ~95  (Rata-rata)
  // 75% correct → ~115 (Rata-rata Tinggi)
  // 100% correct → ~140 (Sangat Unggul / Jenius)

  let iq = 70;

  // +70 max from accuracy (this is the dominant factor)
  iq += accuracy * 70;

  // Difficulty weighting: correct hard answers are worth more
  // Calculate difficulty-weighted accuracy separately
  let difficultyBonus = 0;
  questions.forEach((q, i) => {
    const wasCorrect = i < correctAnswers; // rough, handled below via sessionResults
    if (q.difficulty === 'hard') difficultyBonus += 2;
    else if (q.difficulty === 'medium') difficultyBonus += 1;
  });
  // Scaled by accuracy so wrong answers don't inflate this
  iq += (difficultyBonus / 40) * accuracy * 10; // Max ~+10 at 100% correct

  // Speed bonus ONLY applies per correct answer (capped at +8 total)
  // Average answer time for correct answers: fast = bonus, slow = no bonus, no penalty
  const correctAvgTime = avgTime; // approximation
  if (accuracy > 0) {
    const speedFactor = Math.max(0, (20 - correctAvgTime) / 20); // 0 to 1
    iq += speedFactor * accuracy * 8; // Max +8 only at 100% correct + fast
  }

  // Streak bonus: minor, max +3
  iq += Math.min(maxStreak * 0.3, 3);

  // Wrong answers penalty: each wrong answer slightly pulls IQ down
  const wrongAnswers = 20 - correctAnswers;
  iq -= wrongAnswers * 0.5; // -0.5 per wrong answer, max -10

  // Small variance for realism (±3)
  iq += (Math.random() - 0.5) * 6;

  // Clamp to realistic IQ range
  iq = Math.max(55, Math.min(160, Math.round(iq)));

  // Animate IQ score
  const iqDisplay = document.getElementById('iq-score');
  const scoreRing = document.getElementById('score-ring');
  const targetOffset = 565 - (565 * Math.min(1, (iq - 70) / 90));
  
  let currentIQ = 0;
  const iqAnimation = setInterval(() => {
    currentIQ += 2;
    if (currentIQ >= iq) {
      currentIQ = iq;
      clearInterval(iqAnimation);
    }
    iqDisplay.textContent = currentIQ;
  }, 30);

  setTimeout(() => {
    scoreRing.style.strokeDashoffset = targetOffset;
  }, 500);

  // Display stats
  document.getElementById('correct-count').textContent = correctAnswers;
  document.getElementById('avg-time').textContent = `${avgTime.toFixed(1)} detik`;
  document.getElementById('accuracy').textContent = `${Math.round(accuracy * 100)}%`;
  document.getElementById('max-streak').textContent = maxStreak;

  // Calculate percentile
  const percentile = calculatePercentile(iq);
  document.getElementById('percentile').textContent = `${percentile}%`;

  // Rating text
  const rating = getRating(iq);
  document.getElementById('rating-text').textContent = rating;

  // Create confetti celebration
  if (iq >= 120) {
    createCelebration();
  }

  // Save result
  if (window.dataSdk && sessionResults.length < 999) {
    await window.dataSdk.create({
      session_id: Date.now().toString(),
      total_score: score,
      questions_answered: 20,
      correct_answers: correctAnswers,
      avg_time: avgTime,
      iq_estimate: iq,
      completed_at: new Date().toISOString()
    });
  }
}

function calculatePercentile(iq) {
  // Normal distribution approximation
  const mean = 100;
  const sd = 15;
  const z = (iq - mean) / sd;
  
  // Cumulative distribution function approximation
  const a1 = 0.254829592;
  const a2 = -0.284496736;
  const a3 = 1.421413741;
  const a4 = -1.453152027;
  const a5 = 1.061405429;
  const p = 0.3275911;
  
  const sign = z < 0 ? -1 : 1;
  const absZ = Math.abs(z);
  const t = 1.0 / (1.0 + p * absZ);
  const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-absZ * absZ / 2);
  
  return Math.round(50 * (1.0 + sign * y));
}

function getRating(iq) {
  if (iq >= 145) return "Jenius 🎓";
  if (iq >= 130) return "Sangat Unggul ⭐⭐";
  if (iq >= 120) return "Unggul ⭐";
  if (iq >= 110) return "Rata-rata Tinggi 📈";
  if (iq >= 90) return "Rata-rata 👍";
  if (iq >= 80) return "Rata-rata Rendah 📊";
  return "Di Bawah Rata-rata 💪";
}

function createCelebration() {
  const container = document.getElementById('confetti-container');
  const colors = ['#00ff88', '#00d4ff', '#8b5cf6', '#f59e0b', '#ef4444', '#ffffff'];
  
  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.width = `${5 + Math.random() * 10}px`;
      confetti.style.height = confetti.style.width;
      confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
      confetti.style.animation = `confetti-fall ${2 + Math.random() * 2}s ease-out forwards`;
      container.appendChild(confetti);
      
      setTimeout(() => confetti.remove(), 4000);
    }, i * 50);
  }
}

// Restart
function restartTest() {
  document.getElementById('results-screen').classList.add('hidden');
  document.getElementById('results-screen').classList.remove('flex');
  document.getElementById('start-screen').classList.remove('hidden');
}

// Initialize when DOM is ready
// Developed by Big Sam
document.addEventListener('DOMContentLoaded', initSDKs);

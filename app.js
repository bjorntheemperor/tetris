document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector(".grid")
  const container = document.querySelector('.container')
  let blocker = true

  function appearing() {
    let gridHeight = 0
    let c = 0
    let mytimer = setInterval(createTable,25)
    function createTable() {
      if (c >= 200) {
        clearInterval(mytimer)
        mytimer = null
        console.log(gridHeight);
        for (var i = 0; i < 10; i++) {
          let bottom = document.createElement('div')
          bottom.classList.add('taken')
          bottom.classList.add('bottom')
          grid.appendChild(bottom)
        }

      } else {
        if (c%10==0) {
          gridHeight +=40
          grid.style.height = gridHeight+"px"
          console.log();
        }
        let div = document.createElement('div');
        div.classList.add('free')
        grid.appendChild(div)
        console.log(c+1);
        c++
      }
    }
  }

  const buttons = document.querySelectorAll(".lvl__btn")

  for (let button of buttons) {
    button.addEventListener('click', function (e) {
      e.preventDefault()

      hideIntro()
      displayPlayground()
      playTetris(button.id*10)
    })
  }

function hideIntro() {
  document.querySelector('.intro').style.display = "none"
}

function displayPlayground() {
  container.style.display = "flex"
  container.style.transition = "0"
  container.style.opacity = "1"
  document.querySelector('.mini__outro').style.display = "block"
  document.querySelector('.grid__outro').style.display = "block"
  document.querySelector('.counters').style.display = "block"
}

function playTetris(lineCounter){

  function createTable(){
    document.querySelector('.container').style.display = "flex"
    for (let i = 0; i < 200; i++) {
      let div = document.createElement('div');
      div.classList.add('free')
      grid.appendChild(div)
    }
    for (let i = 0; i < 10; i++) {
      let bottom = document.createElement('div')
      bottom.classList.add('taken')
      bottom.classList.add('bottom')
      grid.appendChild(bottom)
    }
  }
  function createMiniTable() {
    for (var i = 0; i < 16; i++) {
      let div = document.createElement('div');
      div.classList.add('displayFree')
      document.querySelector('.mini-grid').appendChild(div)
    }
  }
  createTable()
  createMiniTable()

  let squares = Array.from(document.querySelectorAll('.grid div'))
  const scoreDisplay = document.querySelector('#score')
  const linesDisplay = document.querySelectorAll('#lines')
  const width = 10
  let timerId


  const lPiece = [
      [width, width+1, width+2, width*2],
      [1, width+1, width*2+1, width*2+2],
      [2, width, width+1, width+2],
      [0, 1, width+1, width*2+1]
    ]

  const jPiece = [
      [width, width+1, width+2, width*2+2],
      [1, width+1, width*2+1, 2],
      [0, width, width+1, width+2],
      [1, width+1, width*2+1, width*2]
    ]

  const sPiece = [
      [width+1, width+2,width*2,width*2+1],
      [1,width+1,width+2,width*2+2],
      [width+1, width+2,width*2,width*2+1],
      [1,width+1,width+2,width*2+2]
    ]

  const zPiece = [
      [width,width+1,width*2+1,width*2+2],
      [2,width+2,width+1,width*2+1],
      [width,width+1,width*2+1,width*2+2],
      [2,width+2,width+1,width*2+1]
    ]

  const tPiece = [
      [width,width+1,width+2,width*2+1],
      [1,width+1,width+2,width*2+1],
      [1,width,width+1,width+2],
      [1,width,width+1,width*2+1]
    ]

  const oPiece = [
      [width,width+1,width*2,width*2+1],
      [width,width+1,width*2,width*2+1],
      [width,width+1,width*2,width*2+1],
      [width,width+1,width*2,width*2+1]
    ]

  const iPiece = [
      [width,width+1,width+2,width+3],
      [2,width+2,width*2+2,width*3+2],
      [width,width+1,width+2,width+3],
      [2,width+2,width*2+2,width*3+2]
    ]

  const thePieces = [tPiece, jPiece, zPiece, oPiece, sPiece, lPiece, iPiece]

  const tShow = document.querySelector('.tShow')
  const jShow = document.querySelector('.jShow')
  const sShow = document.querySelector('.sShow')
  const oShow = document.querySelector('.oShow')
  const zShow = document.querySelector('.zShow')
  const lShow = document.querySelector('.lShow')
  const iShow = document.querySelector('.iShow')

  tShow.innerHTML = 0
  jShow.innerHTML = 0
  sShow.innerHTML = 0
  oShow.innerHTML = 0
  zShow.innerHTML = 0
  lShow.innerHTML = 0
  iShow.innerHTML = 0

  scoreDisplay.innerHTML = 0

  let tCounter = 0
  let jCounter = 0
  let sCounter = 0
  let oCounter = 0
  let zCounter = 0
  let lCounter = 0
  let iCounter = 0
  let totalPieces = 0


  blocker = false
  let score = 0
  linesDisplay[1].innerHTML = lineCounter
  let levelCounter = (lineCounter-(lineCounter%10))/10
  console.log('current Level is '+levelCounter);
  let currentRotation = 0; // Положение фигуры
  let random = Math.floor(Math.random()* thePieces.length) // Переменная для определения случайной фигуры
  let nextRandom = Math.floor(Math.random()* thePieces.length) // Генерируем следующую случайную фигуру
  let current = thePieces[random][0] // Переменная описывает текущую фигуру [какая конкретно фигура] [какое положение]
  let currentPosition = -6; // Переменная отвечает за начальную позицию фигуры на поле
  if (current == thePieces[6][currentRotation]) { // Сдвигаем  I Piece влево дабы она появлялась по центру
    currentPosition = -7
  }
  piecesCounter()

  const luckLine = document.querySelector('.luckLine')
  luckLine.style.display = "none"
  function piecesCounter() {
    totalPieces +=1
    console.log("Total pieces is "+totalPieces);
    if (current == thePieces[0][currentRotation]) {
      tCounter +=1
      tShow.innerHTML = tCounter
    }
    if (current == thePieces[1][currentRotation]) {
      jCounter +=1
      jShow.innerHTML = jCounter
    }
    if (current == thePieces[2][currentRotation]) {
      sCounter +=1
      sShow.innerHTML = sCounter
    }
    if (current == thePieces[3][currentRotation]) {
      oCounter +=1
      oShow.innerHTML = oCounter
    }
    if (current == thePieces[4][currentRotation]) {
      zCounter +=1
      zShow.innerHTML = zCounter
    }
    if (current == thePieces[5][currentRotation]) {
      lCounter +=1
      lShow.innerHTML = lCounter
    }
    if (current == thePieces[6][currentRotation]) {
      iCounter +=1
      iShow.innerHTML = iCounter
    }
  }

  // Скорость "падения" фигур
  let currentSpeed
  setSpeed()
  setTimeout(()=>{
    timerId = setInterval(moveDown, currentSpeed)
  },2000)

  console.log("timerID at the beginning is "+timerId);
  draw()
  function levelCheck(){
    levelCounter = (lineCounter-(lineCounter%10))/10
    console.log("current level is "+levelCounter);
  }
  // Определяем скорость в зависимости от текущего уровня
  function setSpeed(){
    if (levelCounter == 0) {
      currentSpeed = 800
    }
    if (levelCounter == 1) {
      currentSpeed = 715
    }
    if (levelCounter == 2) {
      currentSpeed = 630
    }
    if (levelCounter == 3) {
      currentSpeed = 550
    }
    if (levelCounter == 4) {
      currentSpeed = 465
    }
    if (levelCounter == 5) {
      currentSpeed = 380
    }
    if (levelCounter == 6) {
      currentSpeed = 300
    }
    if (levelCounter == 7) {
      currentSpeed = 215
    }
    if (levelCounter == 8) {
      currentSpeed = 135
    }
    if (levelCounter == 9) {
      currentSpeed = 100
    }
    if (levelCounter >= 10 && levelCounter <= 12) {
      currentSpeed = 85
    }
    if (levelCounter >= 13 && levelCounter <= 15) {
      currentSpeed = 66
    }
    if (levelCounter >= 16 && levelCounter <= 18) {
      currentSpeed = 50
    }
    if (levelCounter >= 19 && levelCounter <= 28) {
      currentSpeed = 35
    }
    if (levelCounter > 28) {
      currentSpeed = 20
    }
  }

  // Прорисовка фигуры
  function draw() {

    current.forEach(index => {
      pieceCheckAdd()  // Добавляем соответствующий класс конкретной фигуре
      function pieceCheckAdd() {
        if (current == thePieces[0][currentRotation]) {
          squares[currentPosition + index].classList.add('T')
        }
        if (current == thePieces[1][currentRotation]) {
          squares[currentPosition + index].classList.add('J')
        }
        if (current == thePieces[2][currentRotation]) {
          squares[currentPosition + index].classList.add('Z')
        }
        if (current == thePieces[3][currentRotation]) {
          squares[currentPosition + index].classList.add('O')
        }
        if (current == thePieces[4][currentRotation]) {
          squares[currentPosition + index].classList.add('S')
        }
        if (current == thePieces[5][currentRotation]) {
          squares[currentPosition + index].classList.add('L')
        }
        if (current == thePieces[6][currentRotation]) {
          squares[currentPosition + index].classList.add('I')
        }

      }
              //
      squares[currentPosition + index].classList.add('piece')
      let divShine = document.createElement('div');
      let divCorner = document.createElement('div');
      divShine.classList.add('shine')
      divCorner.classList.add('corner')
              // Добавляем квадрат внутрь квадрата фигуры
      squares[currentPosition + index].appendChild(divCorner)
      squares[currentPosition + index].appendChild(divShine)
      levelSettings()

      function levelSettingsPiece(colorMain,colorSecondary) {

        if (squares[currentPosition + index].classList.contains('J') || squares[currentPosition + index].classList.contains('S')) {

          squares[currentPosition + index].style.background = 'linear-gradient(345deg, black, '+colorMain+')'

        } else if (squares[currentPosition + index].classList.contains('Z') || squares[currentPosition + index].classList.contains('L')) {

          squares[currentPosition + index].style.background = 'linear-gradient(345deg, black, '+colorSecondary+')'

        } else {
          let divInner = document.createElement('div');
          divInner.classList.add('inner')
          squares[currentPosition + index].appendChild(divInner)
          squares[currentPosition + index].style.background = 'linear-gradient(345deg, black, '+colorMain+')'
        }
      }

      function levelSettings(){
        if (levelCounter%10 == 0) { //  level n+0
          levelSettingsPiece('#2337ec','#3dbdfd')
        }
        if (levelCounter%10 == 1) { //  level n+1
          levelSettingsPiece('#01a903','#85d30d')
        }
        if (levelCounter%10 == 2) { //  level n+2
          levelSettingsPiece('#c000c1','#fd77ff')
        }
        if (levelCounter%10 == 3) { //  level n+3
          levelSettingsPiece('#2137ec','#51db49')
        }
        if (levelCounter%10 == 4) { //  level n+4
          levelSettingsPiece('#e80059','#57fc9d')
        }
        if (levelCounter%10 == 5) { //  level n+5
          levelSettingsPiece('#5cfa96','#5797fc')
        }
        if (levelCounter%10 == 6) { //  level n+6
          levelSettingsPiece('#de2500','#737572')
        }
        if (levelCounter%10 == 7) { //  level n+7
          levelSettingsPiece('#8700ff','#ab0210')
        }
        if (levelCounter%10 == 8) { //  level n+8
          levelSettingsPiece('#2b38da','#d62b05')
        }
        if (levelCounter%10 == 9) { //  level n+9
          levelSettingsPiece('#e02802','#fc9a3c')
        }
      }
    })

  }


  // Удаление фигуры
  function undraw(){
    current.forEach(index => {
      pieceCheckDelete() //Удаляем соответствующий класс конкретной фигуры
      function pieceCheckDelete() {
        if (current == thePieces[0][currentRotation]) {
          squares[currentPosition + index].classList.remove('T')
        }
        if (current == thePieces[1][currentRotation]) {
          squares[currentPosition + index].classList.remove('J')
        }
        if (current == thePieces[2][currentRotation]) {
          squares[currentPosition + index].classList.remove('Z')
        }
        if (current == thePieces[3][currentRotation]) {
          squares[currentPosition + index].classList.remove('O')
        }
        if (current == thePieces[4][currentRotation]) {
          squares[currentPosition + index].classList.remove('S')
        }
        if (current == thePieces[5][currentRotation]) {
          squares[currentPosition + index].classList.remove('L')
        }
        if (current == thePieces[6][currentRotation]) {
          squares[currentPosition + index].classList.remove('I')
        }

      }
      let div = document.createElement('div');
      squares[currentPosition+index].classList.remove('piece')
      let freediv = document.querySelectorAll('.free div')    // Убираем квадрат из квадрата фигуры
      for (var i = 0; i < freediv.length; i++) {
        if (freediv[i] != null) {
          freediv[i].remove()
        }
      }

      squares[currentPosition + index].style.background = ''
    })
  }

  // Настройка управления

  function controlKeydown(e) {
    if(e.keyCode === 37) {
      moveLeft()
    } else if (e.keyCode === 39) {
      moveRight()
    } else if (e.keyCode === 40) {
      moveDown()
    }
  }
  function controlKeyup(e) {
    if (e.keyCode === 90) {
      rotateZ()
    } else if (e.keyCode === 88) {
      rotateX()
    } else if (e.keyCode === 13){
      pauseGame()
    }
  }

  document.addEventListener('keydown', controlKeydown)
  document.addEventListener('keyup', controlKeyup)
  // Функция "падения" фигур
  function moveDown() {
    if (blocker == false) {
      if (!current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
        undraw()
        currentPosition += width
        draw()
        freeze()
      }
    }
  }

  function realFreeze() {
          // Вызывает новую случайную фигуру после столкновения
    current.forEach(index => squares[currentPosition + index].classList.remove('free'))
    current.forEach(index => squares[currentPosition + index].classList.add('taken'))
    console.log("Элемент #"+random+" - ЗАФИКСИРОВАН")
    intervalEnded = true;
    random = nextRandom
    nextRandom = Math.floor(Math.random()*thePieces.length)
    current = thePieces[random][0]
    currentPosition = -6
    if (current == thePieces[6][currentRotation]) { // Сдвигаем  I Piece влево дабы она появлялась по центру
      currentPosition = -7
    }
    currentRotation = 0
    clearInterval(timerId)
    timerId = setInterval(moveDown, currentSpeed)
    addScore()
    piecesCounter()
    gameOver()
  }
  let intervalEnded = true;


  // Функция останавливет фигуры которые соприкоснулись с дном или другой фигурой
  function freeze() {
    if (current.some(index => squares[currentPosition + index + width].classList.contains('taken')) && intervalEnded==true) {

      // Останавливаем поток
      if (timerId) {
        clearInterval(timerId)
        timerId = null
      }

      console.log("Фиксируем элемент #"+random);
      intervalEnded = false;
      if (intervalEnded == false) {
        console.log("Interval started");
      }
      setTimeout(function () {

        intervalEnded = true;
        console.log("Interval ended - "+intervalEnded);


          if (current.some(index => squares[currentPosition + index + width].classList.contains('taken'))){

            realFreeze()

          } else if (current.every(index => squares[currentPosition + index +width].classList.contains('free'))) {
            moveDown()
            clearInterval(timerId)
            timerId = setInterval(moveDown, currentSpeed)
            console.log("timerID is = "+timerId);
          }

      }, currentSpeed);
    }
  }

  // Фигура движется налево
  function moveLeft() {
    if (blocker == false) {
      undraw()
      console.log("Двигаем фигуру №"+random+" ВЛЕВО");
      const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)
      if (!isAtLeftEdge) {
        currentPosition -= 1

      } else console.log("Нельзя двигать фигуру влево из-за левого края");
      if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
        currentPosition +=1
        console.log("Нельзя двигать фигуру влево из-за фигуры слева");
      }
      draw()
      if (current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
        freeze()
        clearInterval(timerId);
        console.log("timerID at rotation Z rihgt is = "+timerId);
      }
    }
  }
  // Фигура движется направо
  function moveRight() {
    if (blocker == false) {
      undraw()
      console.log("Двигаем фигуру №"+random+" ВПРАВО");
      const isAtRightEdge = current.some(index => (currentPosition + index) % width === width -1)
      if(!isAtRightEdge) {
        currentPosition +=1

      } else console.log("Нельзя двигать фигуру вправо из-за правого края");
      if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
        currentPosition -=1
        console.log("Нельзя двигать фигуру вправо из-за фигуры справа");
      }
      draw()
      if (current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
        freeze()
        clearInterval(timerId);
        console.log("timerID at rotation Z rihgt is = "+timerId);
      }
    }


  }


  function checkRotationZ(){
    console.log("-----------РОТАЦИЯ Z-----------");
    console.log("текущая позиция = "+currentPosition);
    console.log("Ротация возможна - "+current.every(index => squares[currentPosition + index].classList.contains('free')));
    console.log("текущая ротация = "+currentRotation);

    if (currentPosition % width >= 5) { // Определяем на какой стороне происходит ротация
      const isAtRightEdge = current.some(index => (currentPosition + index) % width === 0)
      if (isAtRightEdge) {
        if (currentRotation === 0) { // Первая позиция фигуры перейдет в последнюю
          currentRotation = current.length
        }
        currentRotation--
        current = thePieces[random][currentRotation]
      }else {
        if (!current.every(index => squares[currentPosition+index].classList.contains('free'))) {
          if (currentRotation === 0) { // Первая позиция фигуры перейдет в последнюю
            currentRotation = current.length
          }
          currentRotation--
          current = thePieces[random][currentRotation]
          console.log("Ротация не удалась из-за недостатка места");
        }
    }
    if (current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
      freeze()
      clearInterval(timerId);
    }
  } else if (currentPosition % width < 5) {
    const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 9)
    if (isAtLeftEdge) {
      if (currentRotation === 0) { // Первая позиция фигуры перейдет в последнюю
        currentRotation = current.length
      }
      currentRotation--
      current = thePieces[random][currentRotation]
    } else {
      if (!current.every(index => squares[currentPosition+index].classList.contains('free'))) {
        if (currentRotation === 0) { // Первая позиция фигуры перейдет в последнюю
          currentRotation = current.length
        }
        currentRotation--
        current = thePieces[random][currentRotation]
        console.log("Ротация не удалась из-за недостатка места");
      }
    }
    if (current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
      freeze()
      clearInterval(timerId);
    }
    }
  }

  function checkRotationX(){
    console.log("-----------РОТАЦИЯ X-----------");
    console.log("текущая элемент - #"+random);
    console.log("текущая позиция = "+currentPosition);
    console.log("Ротация возможна - "+current.every(index => squares[currentPosition + index].classList.contains('free')));
    console.log("текущая ротация = "+currentRotation);

    if (currentPosition % width >= 5) {
      const isAtRightEdge = current.some(index => (currentPosition + index) % width === 0)
      if (isAtRightEdge) {
        currentRotation++
        if (currentRotation === current.length) { // Последняя позиция фигуры переходит в первую
          currentRotation = 0
        }
        current = thePieces[random][currentRotation]
      } else {
        if (!current.every(index => squares[currentPosition+index].classList.contains('free'))) { // Если нету свободных клеток
          currentRotation++
          if (currentRotation === current.length) { // Последняя позиция фигуры переходит в первую
            currentRotation = 0
          }
          current = thePieces[random][currentRotation]
          console.log("Ротация не удалась из-за недостатка места");
        }
      }
      if (current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
        freeze()
        clearInterval(timerId);
      }
    } else if (currentPosition % width < 5) {
      const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 9)
      if (isAtLeftEdge) {
        currentRotation++
        if (currentRotation === current.length) { // Последняя позиция фигуры переходит в первую
          currentRotation = 0
        }
        current = thePieces[random][currentRotation]
      } else {
        if (!current.every(index => squares[currentPosition+index].classList.contains('free'))) { // Если нету свободных клеток
          currentRotation++
          if (currentRotation === current.length) { // Последняя позиция фигуры переходит в первую
            currentRotation = 0
          }
          current = thePieces[random][currentRotation]
          console.log("Ротация не удалась из-за недостатка места");
        }
      }
      if (current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
        freeze()
        clearInterval(timerId);
      }

    }
  }

  // Поворот фигуры "вперед"
  function rotateZ() {
    if (blocker == false) {
      if (currentPosition>0) { // Проверяем: упирается ли фигура в потолок
        undraw()
        currentRotation++
        if (currentRotation === current.length) { // Последняя позиция фигуры переходит в первую
          currentRotation = 0
        }
        current = thePieces[random][currentRotation]
        checkRotationZ()
        draw();
      }
    }
  }
  // Поворот фигуры "назад"
  function rotateX() {
    if (blocker == false) {
      if (currentPosition>0) { // Проверяем: упирается ли фигура в потолок
        undraw()
        if (currentRotation === 0) { // Первая позиция фигуры перейдет в последнюю
          currentRotation = current.length
        }
        currentRotation--
        current = thePieces[random][currentRotation]
        checkRotationX()
        draw();
      }
    }
  }

  //
  const displaySquares = document.querySelectorAll('.mini-grid div')
  const displayWidth = 4
  let displayIndex = 0

  //
  const upNextPieces = [
    [displayWidth,displayWidth+1,displayWidth+2,displayWidth*2+1],     // T Piece
    [displayWidth, displayWidth+1, displayWidth+2, displayWidth*2+2],  // J piece
    [displayWidth,displayWidth+1,displayWidth*2+1,displayWidth*2+2],   // Z Piece
    [displayWidth+1,displayWidth+2,displayWidth*2+1,displayWidth*2+2], // O Piece
    [displayWidth+1, displayWidth+2,displayWidth*2,displayWidth*2+1],  // S piece
    [displayWidth, displayWidth+1, displayWidth+2, displayWidth*2],    // L Piece
    [displayWidth,displayWidth+1,displayWidth+2,displayWidth+3]        // I Piece
  ]
  //
  function displayShape() {
  //
    displaySquares.forEach(square => {

      let div = document.createElement('div');
      square.classList.remove('piece')
      let freediv = document.querySelectorAll('.displayFree div')    // Убираем квадрат из квадрата фигуры
      for (var i = 0; i < freediv.length; i++) {
        if (freediv[i] != null) {
          freediv[i].remove()
        }
      }
      square.style.background = ''
    })

    upNextPieces[nextRandom].forEach(index => {
      let divShine = document.createElement('div');
      let divCorner = document.createElement('div');
      displaySquares[displayIndex+index].classList.add('piece')
      divShine.classList.add('shine')
      divCorner.classList.add('corner')
      displaySquares[displayIndex+index].appendChild(divCorner)
      displaySquares[displayIndex+index].appendChild(divShine)

      levelSettings()
      function levelSettingsDisplay(colorMain, colorSecondary){
        if (nextRandom == 1 || nextRandom == 4) {

          displaySquares[displayIndex+index].style.background = 'linear-gradient(345deg, black, '+colorMain+')'

        } else if (nextRandom == 2 || nextRandom == 5) {

          displaySquares[displayIndex+index].style.background = 'linear-gradient(345deg, black, '+colorSecondary+')'

        } else {
          let divInner = document.createElement('div');
          divInner.classList.add('inner')
          displaySquares[displayIndex+index].appendChild(divInner)
          displaySquares[displayIndex+index].style.background = 'linear-gradient(345deg, black, '+colorMain+')'

        }
      }
      function levelSettings(){
        if (levelCounter%10 == 0) { //  level n+0
          levelSettingsDisplay('#2337ec','#3dbdfd')
        }
        if (levelCounter%10 == 1) { //  level n+1
          levelSettingsDisplay('#01a903','#85d30d')
        }
        if (levelCounter%10 == 2) { //  level n+2
          levelSettingsDisplay('#c000c1','#fd77ff')
        }
        if (levelCounter%10 == 3) { //  level n+3
          levelSettingsDisplay('#2137ec','#51db49')
        }
        if (levelCounter%10 == 4) { //  level n+4
          levelSettingsDisplay('#e80059','#57fc9d')
        }
        if (levelCounter%10 == 5) { //  level n+5
          levelSettingsDisplay('#5cfa96','#5797fc')
        }
        if (levelCounter%10 == 6) { //  level n+6
          levelSettingsDisplay('#de2500','#737572')
        }
        if (levelCounter%10 == 7) { //  level n+7
          levelSettingsDisplay('#8700ff','#ab0210')
        }
        if (levelCounter%10 == 8) { //  level n+8
          levelSettingsDisplay('#2b38da','#d62b05')
        }
        if (levelCounter%10 == 9) { //  level n+9
          levelSettingsDisplay('#e02802','#fc9a3c')
        }
      }
    })
  }

  displayShape()

  function pauseGame() {
    if (pauseBlocker == false) {
      if (timerId) {
        clearInterval(timerId)
        timerId = null
        console.log("--------GAME PAUSED--------");
        console.log("Timer ID is - "+timerId);
        blocker = true
      } else {
        blocker = false
        timerId = setInterval(moveDown, currentSpeed)
        freeze()
        displayShape()
        console.log("-------GAME UNPAUSED-------");
        console.log("Timer ID is - "+timerId);
      }
    }


  }
  let counterPiece = Array.from(document.querySelectorAll('.displayPiece div'))
  function levelTrans(colorMain, colorSeconda
    squares.forEach(index => {
      if (index.classList.contains('J') || index.classList.contains('S')) {
        index.style.background = 'linear-gradient(345deg, black, '+colorMain+')'
      } else if (index.classList.contains('Z') || index.classList.contains('L')) {
        index.style.background = 'linear-gradient(345deg, black, '+colorSecondary+')'
      } else if (index.classList.contains('T') || index.classList.contains('O') || index.classList.contains('I')){
        index.style.background = 'linear-gradient(345deg, black, '+colorMain+')'
      }
    });

    counterPiece.forEach(index => {
      if (index.classList.contains('J') || index.classList.contains('S')) {
        index.style.background = 'linear-gradient(345deg, black, '+colorMain+')'
      } else if (index.classList.contains('Z') || index.classList.contains('L')) {
        index.style.background = 'linear-gradient(345deg, black, '+colorSecondary+')'
      } else if (index.classList.contains('T') || index.classList.contains('O') || index.classList.contains('I')){
        index.style.background = 'linear-gradient(345deg, black, '+colorMain+')'
      }
    });

  }

  function changeBackground(colorBottom, colorTop) {
    grid.style.background = 'linear-gradient(0deg, '+colorBottom+', '+colorTop+')'
  }
  levelTransitionCondition()
  function levelTransitionCondition(){
    if (levelCounter%10 == 0) { //  level n+0
      levelTrans('#2337ec','#3dbdfd')
    }
    if (levelCounter%10 == 1) { //  level n+0
      levelTrans('#01a903','#85d30d')
    }
    if (levelCounter%10 == 2) { //  level n+2
      levelTrans('#c000c1','#fd77ff')
    }
    if (levelCounter%10 == 3) { //  level n+3
      levelTrans('#2137ec','#51db49')
    }
    if (levelCounter%10 == 4) { //  level n+4
      levelTrans('#e80059','#57fc9d')
    }
    if (levelCounter%10 == 5) { //  level n+5
      levelTrans('#5cfa96','#5797fc')
    }
    if (levelCounter%10 == 6) { //  level n+6
      levelTrans('#de2500','#737572')
    }
    if (levelCounter%10 == 7) { //  level n+7
      levelTrans('#8700ff','#ab0210')
    }
    if (levelCounter%10 == 8) { //  level n+8
      levelTrans('#2b38da','#d62b05')
    }
    if (levelCounter%10 == 9) { //  level n+9
      levelTrans('#e02802','#fc9a3c')
  }
  }

let pauseBlocker = false

let iContainer = [] // объявляем контейнер
  let tetrisCombo = 0
  function addScore(){
    draw()
      for (var i = 0; i < 199; i += width) {
       const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]
       if(row.every(index => squares[index].classList.contains('taken'))) {
         undraw()
         pauseBlocker = true
         blocker = true;
         console.log('blocking controls - '+blocker);
         console.log('bingo!');
         lineCounter +=1
         levelCheck()
         tetrisCombo +=1
         console.log('tetris combo = '+tetrisCombo);
         linesDisplay[1].innerHTML = lineCounter
         // анимируем плавное исчезновение элементов. !!! При этом элементы, по факту, никуда не убираються !!!
         row.forEach(index => {
           squares[index].style.opacity = '0'
           });

        // Контейнер вбирает в себя номер ряда который готов убраться
         iContainer = iContainer.concat(i)
         console.log(iContainer);

        // выставляем задержку на то, чтобы элементы пропали
         setTimeout(function () {

           for (var j = 0; j < iContainer.length; j++) { // цикл for для рядов, которые запомнил контейнер

             const row = [iContainer[j], iContainer[j]+1, iContainer[j]+2, iContainer[j]+3, iContainer[j]+4, iContainer[j]+5, iContainer[j]+6, iContainer[j]+7, iContainer[j]+8, iContainer[j]+9]
             console.log(row);
             // избавляемся от всех классов и тегов у ряда, добалвяя класс free
             row.forEach(index => {
               squares[index].classList.remove('taken')
               squares[index].classList.remove('piece')
               squares[index].classList.remove('T')
               squares[index].classList.remove('J')
               squares[index].classList.remove('Z')
               squares[index].classList.remove('O')
               squares[index].classList.remove('S')
               squares[index].classList.remove('L')
               squares[index].classList.remove('I')
               squares[index].classList.add('free')
               squares[index].style.backgroundColor = ''
               squares[index].style.background = ''
               let freediv = document.querySelectorAll('.free div')    // Убираем квадрат из квадрата фигуры
               for (var i = 0; i < freediv.length; i++) {
                 if (freediv[i] != null) {
                   freediv[i].remove()
                 }
               }
             });

             // удаляем из массива квадратов те квадраты, которые должны убраться и записываем их в переменную squaresRemoved
             const squaresRemoved = squares.splice(iContainer[j], width)

             console.log(squaresRemoved);
             // массив квадратов равняется новому массиву квадратов + добавоенныее в начало массива удаленные квадраты, которые имеют теперь только класс free
             squares = squaresRemoved.concat(squares)
             console.log(squares);
             squares.forEach(boom => {grid.appendChild(boom)}) // непосредственно добавояем квадраты
             // Выставляем opacity 1 для всех элементов
             for (var i = 0; i < squares.length; i++) {
              squares[i].style.opacity = '1'
             }
             levelTransitionCondition()
             setSpeed()
           }
           iContainer = [] // очищаем контейнер

         },1000)

      } else {
        displayShape()
      }

    } // for end



  if (tetrisCombo==1) {
    clearInterval(timerId)
    timerId = null
    setTimeout(function () {
      blocker = false
      pauseBlocker = false
      draw()
      timerId = setInterval(moveDown,currentSpeed)
    },1000)
    score = score+(40*(levelCounter+1))
    console.log("За 1 ряд на "+levelCounter+" уровне, Вы получили "+40*(levelCounter+1)+" очков");
  }
  if (tetrisCombo==2) {
    clearInterval(timerId)
    timerId = null
    setTimeout(function () {
      blocker = false
      pauseBlocker = false
      draw()
      timerId = setInterval(moveDown,currentSpeed)
    },1000)
    score = score+(100*(levelCounter+1))
    console.log("За 2 ряда на "+levelCounter+" уровне, Вы получили "+100*(levelCounter+1)+" очков");
  }
  if (tetrisCombo==3) {
    clearInterval(timerId)
    timerId = null
    setTimeout(function () {
      blocker = false
      pauseBlocker = false
      draw()
      timerId = setInterval(moveDown,currentSpeed)
    },1000)
    score = score+(300*(levelCounter+1))
    console.log("За 3 ряда на "+levelCounter+" уровне, Вы получили "+300*(levelCounter+1)+" очков");
  }
  if (tetrisCombo==4) {
    clearInterval(timerId)
    timerId = null
    setTimeout(function () {
      blocker = false
      pauseBlocker = false
      draw()
      timerId = setInterval(moveDown,currentSpeed)
    },1000)
    score = score+(1200*(levelCounter+1))
    console.log("За 4 ряда на "+levelCounter+" уровне, Вы получили "+1200*(levelCounter+1)+" очков");
  }
  scoreDisplay.innerHTML = score
  tetrisCombo = 0 // Reseting c-c-combo!
  console.log("let's Count combos - "+tetrisCombo);
} // end of addScore()


  function checkLuck() {
    let luck = iCounter/(totalPieces/7)
    console.log(iCounter+"/"+(totalPieces/7)+"="+luck);
    if (luck<0.9) {
      luck = 'poor :('
    } else if(luck >= 0.9 && luck<1.1) {
      luck = 'medium ;)'
    } else {
      luck = 'insane :O'
    }
    document.querySelector('.luck').innerHTML = luck;

  }
  let gameHasEnded //checking if game has ended
  const container = document.querySelector('.container')
  function gameOver() {
    if(current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      gameHasEnded = true;
      scoreDisplay.innerHTML = score;
      linesDisplay[0].innerHTML = lineCounter
      checkLuck()
      clearInterval(timerId)
      timerId = null
      console.log("GAME OVER");
      blocker = true;
      pauseBlocker = true

      setTimeout(()=>{

        document.querySelector('.gameOverDiv').style.display = "block"

        squares.forEach(square => {
          let freediv = document.querySelectorAll('.grid div')    // Убираем квадрат из квадрата фигуры
          for (var i = 0; i < freediv.length; i++) {
            if (freediv[i] != null) {
              freediv[i].classList.remove('taken')
              freediv[i].classList.remove('piece')
              freediv[i].classList.remove('T')
              freediv[i].classList.remove('J')
              freediv[i].classList.remove('Z')
              freediv[i].classList.remove('O')
              freediv[i].classList.remove('S')
              freediv[i].classList.remove('L')
              freediv[i].classList.remove('I')
              freediv[i].remove()
            }
          }
        })

        let freediv = document.querySelectorAll('.mini-grid div')
        // Убираем квадрат из квадрата фигуры
        for (var i = 0; i < freediv.length; i++) {
          if (freediv[i] != null) {
            freediv[i].remove()
          }
        }

        const enter = document.querySelector('.enter')
        function enterBlack() {
          enter.style.color = 'transparent'
          console.log('Enter became BLACK');
          setTimeout(()=>{
            console.log('Enter became WHITE');
            enter.style.color = 'white'
          },500)
        }

        flashingTimer = setInterval(enterBlack,1000)

        function continueGame() {
          container.style.display = "none"
          document.querySelector('.intro').style.display = "block"
        }
        function controlContinue(e) {
          if (e.keyCode === 13){
            if (gameHasEnded == true) {
              console.log('this shit does work');
              continueGame()
              clearInterval(flashingTimer)
              document.querySelector('.gameOverDiv').style.display = "none"
              gameHasEnded = false
            }
          }
        }
        document.addEventListener('keyup', controlContinue)

      },2000)

    }
  }

}

})

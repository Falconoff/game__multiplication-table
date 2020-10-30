//Создаем стартовый блок
createStartBlock();

// Функция запуска игры 
function start(){
	// создаём поле игры <div class="field">
	createField();
	// создаём шапку игры
	createHead();
	// создаём блок таймера
	createTimerBlock();
	// запускаем таймер обратного отсчёта до конца игры
	timerGame();
	// количество звезд при старте
	numStars = 3;
	// создаём блок очков
	createStarsBlock();
	// создаём краба
	createCrab();
	//создаем новое задание
	newTask();
}



// Создаём новую задачу
function newTask() {
	//Генерим условие задачи
	createTask();
	console.log(num1 +" x "+ num2 +" = " + rez);

	//случайное число номера шарика с правильным ответом
	numRightBall();

	// создаём с задержкой в 1 сек лифт со всем содержимым
	setTimeout( function() {
		// удаляем (если была) подсветку поля
		field.style.boxShadow = "none";
		// создаём блок-лифт
		createLift(); 
		
		// создаём рыбы с номерами 1-5 и случайным положением в своём секторе по оси Y
		createFish(1, 650, 800, 0, 200);
		createFish(2, 500, 600, 0, 200);
		createFish(3, 0, 100, 0, 200);
		createFish(4, 300, 450, 0, 200);
		createFish(5, 150, 250, 0, 200);

		/*=====================================================================================
			создаём шарики в 3 ряда (по 2 в ряду) с рандомной позицией в пределах своего ряда
		=======================================================================================*/
		createBall(1, getRndInteger(0, 20));
		createBall(2, getRndInteger(0, 20));
		createBall(3, getRndInteger(100, 120));
		createBall(4, getRndInteger(100, 120));
		createBall(5, getRndInteger(200, 220));
		createBall(6, getRndInteger(200, 220));


		ball_1 = document.querySelector("#ball1");
		ball_2 = document.querySelector("#ball2");
		ball_3 = document.querySelector("#ball3");
		ball_4 = document.querySelector("#ball4");
		ball_5 = document.querySelector("#ball5");
		ball_6 = document.querySelector("#ball6");
		pozBall_1 = ball_1.offsetLeft;
		pozBall_2 = ball_2.offsetLeft;
		pozBall_3 = ball_3.offsetLeft;
		pozBall_4 = ball_4.offsetLeft;
		pozBall_5 = ball_5.offsetLeft;
		pozBall_6 = ball_6.offsetLeft;

		// боремся с наложением шариков друг на друга
		difference(pozBall_1, pozBall_2, ball_1, ball_2);
		difference(pozBall_3, pozBall_4, ball_3, ball_4);
		difference(pozBall_5, pozBall_6, ball_5, ball_6);
		/*------------------------------------------------------------------------------*/

		/*===================================================================================
			проверяем правильность ответа при клике на шарик
		====================================================================================*/

		ball_1.onclick = function() {
			if (ball_1.innerText == rez) {
				rightAnswer();
			} else {
				wrongAnswer();
			} 
		}

		ball_2.onclick = function() {
			if (ball_2.innerText == rez) { 
				rightAnswer();
			} else {
				wrongAnswer();
			} 
		}

		ball_3.onclick = function() {
			if (ball_3.innerText == rez) { 
				rightAnswer();
			} else {
				wrongAnswer();
			} 
		}

		ball_4.onclick = function() {
			if (ball_4.innerText == rez) { 
				rightAnswer();
			} else {
				wrongAnswer();
			} 
		}

		ball_5.onclick = function() {
			if (ball_5.innerText == rez) { 
				rightAnswer();
			} else {
				wrongAnswer();
			} 
		}

		ball_6.onclick = function() {
			if (ball_6.innerText == rez) { 
				rightAnswer();
			} else {
				wrongAnswer();
			} 
		}
		/*---------------------------------------------*/
		
		liftUp();	// поднимаем лифт
	},1000);
}; // конец newTask


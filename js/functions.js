/*============================================================================
 функция получения случайного целого числа из заданного диапазона min - max
=============================================================================*/
function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}
/*---------------------------------------------------------------------------*/



// Создаем стартовый блок
function createStartBlock() {
	//создаем блок div
	startBlock = document.createElement("div");
	startBlock.className = "startBlock";
	document.body.appendChild(startBlock);
	// создаем кнопку <button id="start-knopka">Начать</button>
    startKnopka = document.createElement("button");
    startKnopka.id = "start-knopka";
    startKnopka.innerText = "Начать";
    startBlock.appendChild(startKnopka);
    // создаем кнопку <span id="start-text">"Помоги крабу..." </span>
    startBlockText=document.createElement("span");
 	startBlockText.id = "start-text";
 	startBlockText.innerText = "Помоги крабу собрать 10 звёздочек, решая пример";
	startBlock.appendChild(startBlockText);

	//при нажании на кнопку
	startKnopka.onclick = function(){
		// Удаляем стартовый блок
		startBlock.remove();
		//Запускаем игру
		start();
	}
}


// создаём поле игры <div class="field">
function createField() {
	field = document.createElement("div");
	field.className = "field";
	document.body.appendChild(field);
	
};


// Функция создания шапки на поле <div class="head">
function createHead() {
	head = document.createElement("div");
	head.className = "head";
	field.appendChild(head);
};



/* Функция создания таймер-блока в шапке
		<div class = "timerBlock">
        	Время: <div id="timer">100</div>
    	</div> */
function createTimerBlock() {
	let timerBlock = document.createElement("div");
		timerBlock.className = "timerBlock";
		head.appendChild(timerBlock);
		timerBlock.innerText = "Время: ";

		timer = document.createElement("div");
		timer.id = "timer";
		timerBlock.appendChild(timer);
		// передаём значение времени работы таймера
		timer.innerText = time;
}

// функция ОБРАТНОГО ОТСЧЁТА времени игры
function timerGame() {
	// задаём таймер до конца игры
	timerID = setInterval ( function() {
		// уменьшаем значение timerBlock на единицу
		timer.innerText--;
		// проверяем, если закончилось время или жизни (статус-конец), то...
		if (timer.innerText == 0) {
			// ...останавливаем таймер, чтоб в минус не уходил
			clearInterval(timerID);
			//вызываем функцию конец игры при плохом результате
			createEndBlockBad();
			//вызываем функцию очистки игрового поля от всех элементов
			deleteFieldElement()
		}
	}, 1000);
};


// Функция создания блока со звездами <div class="starsBlock"> в шапке
function createStarsBlock() {
	starsBlock = document.createElement("div");
	starsBlock.className = "starsBlock";
	head.appendChild(starsBlock);
	// в цикле вызываем создание звёзд на поле до текущего количества 
	for (var i = 0; i < numStars; i++) { 
		createStar(); 
	}
};

// Функция создания одной звезды
// <span><img src="images/star.png"></span>
function createStar(){
    star = document.createElement("span");
	starsBlock.appendChild(star);
	img=document.createElement("img");
	img.src="images/star.png";
	star.appendChild(img);
}
    





/*========================================================
	создаём краба
	<div id="crab"><div id="crab-text">
=========================================================*/
function createCrab() {
	crab = document.createElement("div");
	crab.id = "crab";
	field.appendChild(crab);

	crabText = document.createElement("div");
	crabText.id = "crab-text";
	crab.appendChild(crabText);
	
	//условия задачи добавляем крабу в ф-ции createTask
};



/*================================================================
	Уравнение
=================================================================*/

function createTask() {
	// определяем множители рандомно
	num1 = getRndInteger(2,9);
	num2 = getRndInteger(2,9);

	// определяем верный ответ
	rez = num1 * num2;

	// добавляем крабу условия задачи
	crabText.innerText = num1 +"x"+ num2;
	
}
/*---------------------------------------------------------------*/




/*=================================================================================
	ЛИФТ с рыбками и шариками
===================================================================================*/

// создаём блок-лифт <div id="lift">
function createLift() {
	lift = document.createElement("div");
	lift.id = "lift";
	field.appendChild(lift);
}

// функция движения блока ЛИФТ вверх на 1рх за 10мс
function liftUp() {
	timerLift = setInterval( function(){
		// изменяем текущее положение лифта
		lift.style.top = lift.offsetTop - 1 + "px";
		// если лифт вышел за верхнюю границу поля, то
		if (lift.offsetTop < -350) {
			// уменьшаем количество очков на 1
			numStars--;
			// завершаем движение лифта
			endTask();
		}
	}, 10);
};




/*===================================================================
	ф-ция создания рыбы
====================================================================*/
// создаём рыбу с номером i: <div id="fish[i]" class="fish"></div>
function createFish(numFish, pozXmin, pozXmax, pozYmin, pozYmax) {
	fish = document.createElement("div");
	// идентификатору по id присваиваем имя с номером шарика
	fish.id = "fish"+numFish;
	//присваиваем рыбке класс
	fish.className = "fish";
	// отправляем рыбку в лифт
	lift.appendChild(fish);
	// позиция по высоте в лифте
	fish.style.top = getRndInteger(pozYmin, pozYmax)+"px";
	// позиция по горизонтали
	fish.style.left = getRndInteger(pozXmin, pozXmax)+"px";
}
/*-------------------------------------------------------------------*/



/*========================================================================
	ф-ции создания шарика
==========================================================================*/

/* случайное число номера шарика с правильным ответом  */
function numRightBall() {
	rightBallNum = getRndInteger(1,6);
};


// создаём шарик с номером i: <div id="ball[i]" class="ball"><span>0</span></div>
function createBall(numBall, pozY) {
	ball = document.createElement("div");
	// идентификатору по id присваиваем имя с номером шарика
	ball.id = "ball"+numBall;
	ball.className = "ball";
	// отправляем шарик в лифт
	lift.appendChild(ball);
	// добавляем текст шарику
	let span = document.createElement("span");
	ball.appendChild(span);	
	
	// заносим случайному шарику правильный ответ, а остальным - случайное число
	if (numBall == rightBallNum) {
		span.innerText = rez;
	} else {
		span.innerText = getRndInteger(4,81);
	};
	// позиция по высоте в лифте
	ball.style.top = pozY+"px";
	// позиция по горизонтали
	ball.style.left = getRndInteger(0, 800)+"px";
}


// функция, предотвращающая наложение шариков друг на друга в одной строке
function difference(pozBall_1, pozBall_2, ball_1, ball_2) {
	//Разница между двумя шариками в одной строке 
	let diff = pozBall_1 - pozBall_2;
	// если шарики близко друг к другу...
	if (Math.abs(diff) < 100) {
	// тогда отодвигаем второй шарик
		//если 1й шар в левой половине поля и 2й слева от него, то смещаем 2-й вправо:
		if ((pozBall_1 <= 350) && (diff > 0)) {
			ball_2.style.left = pozBall_2 + getRndInteger(300,500)+"px";
		} 
			//если 1й шар в левой половине поля и 2й справа от него, то смещаем 2-й вправо:
		else if ((pozBall_1 <= 350) && (diff < 0)) {
			ball_2.style.left = pozBall_2 + getRndInteger(100,300)+"px";
		}
			//если 1й шар в правой половине поля и 2й слева от него, то смещаем 2-й влево:
			else if ((pozBall_1 > 350) && (diff > 0)) {
				ball_2.style.left = pozBall_2 - getRndInteger(100,250)+"px";
			}
				// 1й шар в правой половине поля и 2й справа от него, то смещаем 2-й влево:
				else /*((positionX1 > 350) && (diff < 0))*/ {
					ball_2.style.left = pozBall_2 - getRndInteger(300,450)+"px";
				}
	};
};
/*-----------------конец функций для создания шариков-----------------------------------*/



//Функция правильного ответа
function rightAnswer() {
	field.style.boxShadow = "0 0 30px #0f0";
	numStars++;
	endTask();
};

//Функция НЕ правильного ответа
function wrongAnswer() {
	field.style.boxShadow = "0 0 30px #f00";
	numStars--;
	endTask();
};



// окончание текущей задачи
function endTask() {
	lift.remove(); 				// удаляем лифт
	clearInterval(timerLift); 	// удаляем таймер
	starsBlock.remove(); 		// удаляем блок очков
	createStarsBlock(); 		// создаём обновлённый блок очков
	verifyStars(); 				// проверяем сколько у нас очков
};


// проверка количества звёзд
function verifyStars() {
	if (numStars >= 10) { 	// если набрали нужное кол-во очков
		clearInterval(timerID);			// останавливаем таймер игры
		deleteFieldElement();			// удаляем игровое поле
		createEndBlockGood();			// выводим поздравление
	} else 
	if (numStars < 1) {		// если очков не осталось
		clearInterval(timerID);			// останавливаем таймер игры
		deleteFieldElement();			// удаляем игровое поле
		createEndBlockBad();			// выводим таблицу умножения
	} else {					// иначе, запускаем ещё одну задачку
		newTask();
	}
};


//Удаление всех элементов на игровом поле
function deleteFieldElement(){
	field.remove(); //удаляем игровое поле
	head.remove();  // удаляем шапку игры
	timer.remove(); // удаляем таймер
	starsBlock.remove(); // удаляем блок очков
	crab.remove(); // удаляем краба
	lift.remove(); //удаляем лифт
	clearInterval(timerLift); // очищаем таймер лифт
}



// Создаем финишный блок "Повтори таблицу"
function createEndBlockBad() {
	endBlockBad = document.createElement("div");
	endBlockBad.className = "endBlockBad";
	document.body.appendChild(endBlockBad);
	// создаем кнопку <button id="endBlockBad-button">Начать новую игру</button>
    endBlockBadButton = document.createElement("button");
    endBlockBadButton.id = "endBlockBad-button";
    endBlockBadButton.innerText = "Начать новую игру";
    endBlockBad.appendChild(endBlockBadButton);
    // создаем  <span id="endBlockBad-text">"Повтори..." </span>
    endBlockBadText = document.createElement("span");
 	endBlockBadText.id = "endBlockBad-text";
 	endBlockBadText.innerText = "Повтори таблицу умножения";
	endBlockBad.appendChild(endBlockBadText);

    //При нажатии на кнопку
	endBlockBadButton.onclick = function(){
		//удаляем финишный блок "Повтори таблицу"
		endBlockBad.remove();
		//Запускаем игру
		start();
	};
};


// Создаем финишный блок "Молодец"
function createEndBlockGood() {
	endBlockGood = document.createElement("div");
	endBlockGood.className = "endBlockGood";
	document.body.appendChild(endBlockGood);
    // создаем  <span id="endBlockBad-text">"Молодец!" </span>
    endBlockGoodText = document.createElement("span");
 	endBlockGoodText.id = "endBlockGood-text";
 	endBlockGoodText.innerText = "МОЛОДЕЦ !";
	endBlockGood.appendChild(endBlockGoodText);
};


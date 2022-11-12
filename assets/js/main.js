/*==================== DARK/LIGHT THEME EVENTS ====================*/

const selectedTheme = localStorage.getItem("selected-theme");
const themeButton = document.getElementById("theme-button");
const lightTheme = "light-theme";
const iconSun = "uil-sun";
const iconMoon = "uil-moon";

const enableLightTheme = () => {
	// 1. Add the class to the body
	document.body.classList.add(lightTheme);
	// 2. Update lightMode in localStorage
	localStorage.setItem("selected-theme", "light");
	// 3. Update lightMode icon
	themeButton.classList.remove(iconSun);
	themeButton.classList.add(iconMoon);
};
if (selectedTheme === "light") {
	enableLightTheme();
}

const disableLightTheme = () => {
	// 1. Remove the class from the body
	document.body.classList.remove(lightTheme);
	// 2. Update lightMode in localStorage
	localStorage.setItem("selected-theme", "dark");
	// 3. Update lightMode icon
	themeButton.classList.remove(iconMoon);
	themeButton.classList.add(iconSun);
};

/*==================== VARIABLES ====================*/

const today = new Date();
const initialDate = new Date(2021, 08, 10);

function calcDate(date1, date2) {
	const diff = Math.floor(date1.getTime() - date2.getTime());

	if (diff <= 0) throw new Error('Invalid date');

	const day = 1000 * 60 * 60 * 24;

	const totalDays = Math.ceil(diff / day);
	const years = Math.floor(totalDays / 365);
	const daysLeft = Math.ceil(totalDays - ( years * 365));
	const months = Math.ceil(daysLeft / 30);

	let dateMessage = '';
	dateMessage = years ? years + `${years > 1 ? ' anos ' : ' ano '}` : '';
	dateMessage += months ? `${years?'e ':''}` + months + `${months > 1 ? ' meses ' : ' mês '}` : '';

	return dateMessage;
}

const xpTimeText = document.createTextNode(calcDate(today, initialDate));
const xpTimeElement = document.getElementById('xpTime');

xpTimeElement.appendChild(xpTimeText)

/*==================== SCROLL REVEAL ANIMATION ====================*/

const sr = ScrollReveal({
	origin: "top",
	distance: "60px",
	duration: 2500,
	delay: 400,
	//reset: true,
});

sr.reveal(`.home__img`);
sr.reveal(`.home__data`, { delay: 700 });
sr.reveal(`.home__social, .home__scroll`, { delay: 900, origin: "bottom" });

/*==================== DARK/LIGHT BUTTON EVENTS ====================*/

// When someone clicks the button
themeButton.addEventListener("click", () => {
	// get their darkMode setting
	const selectedTheme = localStorage.getItem("selected-theme");

	// if it not current enabled, enable it
	if (selectedTheme !== "light") {
		enableLightTheme();
		// if it has been enabled, turn it off
	} else {
		disableLightTheme();
	}
});

/*==================== MENU SHOW AND HIDDEN ====================*/

const $navMenu = document.getElementById("nav-menu"),
	$navToggle = document.getElementById("nav-toggle"),
	$navClose = document.getElementById("nav-close");

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if ($navToggle) {
	$navToggle.addEventListener("click", () => {
		$navMenu.classList.add("show-menu");
	});
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if ($navClose) {
	$navClose.addEventListener("click", () => {
		$navMenu.classList.remove("show-menu");
	});
}

/*==================== REMOVE MENU MOBILE ====================*/

const $navLink = document.querySelectorAll(".nav__link");

function linkAction() {
	// When we click on each nav__link, we remove the show-menu class
	$navMenu.classList.remove("show-menu");
}
$navLink.forEach(n => n.addEventListener("click", linkAction));

/*==================== ACCORDION SKILLS ====================*/

const $skillsHeader = document.querySelectorAll(".skills__header"),
	$skillsContent = document.getElementsByClassName("skills__content");

function toggleSkills() {
	let itemClass = this.parentNode.className;

	for (i = 0; i < $skillsContent.length; i++) {
		$skillsContent[i].className = "skills__content skills__close";
	}
	if (itemClass === "skills__content skills__close") {
		this.parentNode.className = "skills__content skills__open";
	}
}

$skillsHeader.forEach(el => {
	el.addEventListener("click", toggleSkills);
});

/*==================== SERVICES MODAL ====================*/

const $modalViews = document.querySelectorAll(".services__modal"),
	$modalBtns = document.querySelectorAll(".services__button"),
	$modalCloses = document.querySelectorAll(".services__modal-close");

// Fecha o modal, se detectado evento de clique fora do mesmo
const handleClickOutside = event => {
	$modalViews.forEach(item => {
		if (item === event.target) {
			$modalViews.forEach(modalView => {
				modalView.classList.remove("active-modal");
			});
		}
	});
};

// Torna modal ativo
let modal = function (modalClick) {
	$modalViews[modalClick].classList.add("active-modal");
	//Adiciona evento de clique para o documento(p/ verificar se usuário clicou fora)
	setTimeout(() => {
		document.addEventListener("click", handleClickOutside, false);
	}, 200);
};

//Aciona modal do respectivo butão clicado
$modalBtns.forEach((modalBtn, i) => {
	modalBtn.addEventListener("click", () => {
		modal(i);
	});
});

// Permite fechar modal se clicar no 'x' também
$modalCloses.forEach(modalClose => {
	modalClose.addEventListener("click", () => {
		$modalViews.forEach(modalView => {
			modalView.classList.remove("active-modal");
		});
	});
});

/*==================== WORK ====================*/
/*===== Active selector =====*/

const linkWork = document.querySelectorAll(".work__item");
const workCards = document.querySelectorAll(".work__card");

function activeWork() {
	const dataFilter = this.getAttribute("data-filter");

	linkWork.forEach(l => l.classList.remove("active-work"));
	workCards.forEach(l => {
		l.classList.remove("active");
		l.classList.add("hide");

		if (l.getAttribute("data-item") == dataFilter || dataFilter == "all") {
			l.classList.remove("hide");
			l.classList.add("active");
		}
	});
	this.classList.add("active-work");
}

linkWork.forEach(l => l.addEventListener("click", activeWork));

/*==================== Form Validation ====================*/

const fields = document.querySelectorAll("[required]"); //seleciona todos o inputs (que tem a tag required)
const form = document.querySelector("form");

form.addEventListener("submit", event => {
	event.preventDefault();
	form.submit(); //Se tudo estiver preenchido
});

function validateField(field) {
	//verifica se há erros
	function verifyErrors() {
		let foundError = false;

		for (let error in field.validity) {
			//se não for customError
			//Então verifica se tem erro
			if (field.validity[error] && !field.validity.valid) {
				foundError = error;
			}
		}

		return foundError;
	}

	function customMessage(typeError) {
		const messages = {
			text: {
				valueMissing: "*Campo obrigatório",
			},
			email: {
				valueMissing: "*Email obrigatório",
				typeMismatch: "*Por favor, preencha um email válido",
			},
			textarea: {
				valueMissing: "*Campo Obrigatório",
			},
		};

		return messages[field.type][typeError];
	}

	function setCustomMessage(message) {
		const spanError = field.parentNode.querySelector("span.error");

		if (message) {
			field.style.border = "1px solid red";
			spanError.classList.add("active");
			spanError.innerHTML = message;
		} else {
			field.style.border = "1px solid green";
			spanError.classList.remove("active");
			spanError.innerHTML = "";
		}
	}

	return function () {
		const error = verifyErrors();

		if (error) {
			const message = customMessage(error);

			setCustomMessage(message);
		} else {
			setCustomMessage();
		}
	};
}

function customValidation(event) {
	const field = event.target;
	const validation = validateField(field);

	validation();
}

for (let field of fields) {
	field.addEventListener("invalid", event => {
		//Eliminar o bubble
		event.preventDefault();
		customValidation(event);
	});
	field.addEventListener("blur", customValidation);
}

// Recaptcha Validation
window.onload = function () {
	var el = document.getElementById("g-recaptcha-response");
	if (el) {
		el.setAttribute("required", "required");
	}
};

//Limpar form após envio
window.onbeforeunload = () => {
	for (const form of document.getElementsByTagName("form")) {
		form.reset();
	}
};

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/

const sections = document.querySelectorAll("section[id]");

function scrollActive() {
	const scrollY = window.pageYOffset;

	sections.forEach(current => {
		const sectionHeight = current.offsetHeight;
		const sectionTop = current.offsetTop - 50;
		sectionId = current.getAttribute("id");

		if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
			document.querySelector(".nav__menu a[href*=" + sectionId + "]").classList.add("active-link");
		} else {
			document.querySelector(".nav__menu a[href*=" + sectionId + "]").classList.remove("active-link");
		}
	});
}
window.addEventListener("scroll", scrollActive);

/*==================== CHANGE BACKGROUND HEADER ====================*/

function scrollHeader() {
	const nav = document.getElementById("header");
	// When the scroll is greater than 80 viewport height, add the scroll-header class to the header tag
	if (this.scrollY >= 80) nav.classList.add("scroll-header");
	else nav.classList.remove("scroll-header");
}
window.addEventListener("scroll", scrollHeader);

/*==================== SHOW SCROLL UP ====================*/

function scrollUp() {
	const scrollUp = document.getElementById("scroll-up");
	// When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
	if (this.scrollY >= 560) scrollUp.classList.add("show-scroll");
	else scrollUp.classList.remove("show-scroll");
}
window.addEventListener("scroll", scrollUp);

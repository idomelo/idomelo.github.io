/*==================== MENU SHOW AND HIDDEN ====================*/

const $navMenu = document.getElementById('nav-menu'),
      $navToggle = document.getElementById('nav-toggle'),
      $navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if ($navToggle) {
    $navToggle.addEventListener('click', () =>{
        $navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if ($navClose) {
    $navClose.addEventListener('click', () =>{
        $navMenu.classList.remove('show-menu')
    })
}

/*==================== REMOVE MENU MOBILE ====================*/


const $navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    // When we click on each nav__link, we remove the show-menu class
    $navMenu.classList.remove('show-menu')
}
$navLink.forEach(n => n.addEventListener('click', linkAction))


/*==================== ACCORDION SKILLS ====================*/

const $skillsHeader = document.querySelectorAll('.skills__header'),
      $skillsContent = document.getElementsByClassName('skills__content')

function toggleSkills() {
    let itemClass = this.parentNode.className

    for(i = 0; i < $skillsContent.length; i++) {
        $skillsContent[i].className = 'skills__content skills__close'
    }
    if (itemClass === 'skills__content skills__close') {
        this.parentNode.className = 'skills__content skills__open'
    }
}

$skillsHeader.forEach((el) => {
    el.addEventListener('click', toggleSkills)
})


/*==================== SERVICES MODAL ====================*/


const $modalViews = document.querySelectorAll('.services__modal'),
      $modalBtns = document.querySelectorAll('.services__button'),
      $modalCloses = document.querySelectorAll('.services__modal-close')
      
// Fecha o modal, se detectado evento de clique fora do mesmo
const handleClickOutside = (event) => {
    $modalViews.forEach((item) => {
        
        if (item === event.target) {
            $modalViews.forEach((modalView) => {
                modalView.classList.remove('active-modal')
            })
        }
    })
}

// Torna modal ativo
let modal = function(modalClick) {
    $modalViews[modalClick].classList.add('active-modal')
    //Adiciona evento de clique para o documento(p/ verificar se usuário clicou fora)
    setTimeout(() => {document.addEventListener('click', handleClickOutside, false) }, 200);
}

//Aciona modal do respectivo butão clicado
$modalBtns.forEach((modalBtn, i) => {
    modalBtn.addEventListener('click', () => {
        modal(i)
    })
})

// Permite fechar modal se clicar no 'x' também
$modalCloses.forEach((modalClose) => {
    modalClose.addEventListener('click', () => {
        $modalViews.forEach((modalView) => {
            modalView.classList.remove('active-modal')
        })
    })
})


/*==================== PORTFOLIO SWIPER  ====================*/


let swiperPortfolio = new Swiper('.portfolio__container', {
    // cssMode: true,
    loop: true,
    loopedSlides: 3,
    spaceBetween: 48,
    grabCursor: true,

    autoplay: {
        delay: 5500,
    },
  
    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        // dynamicBullets: true,
    },
    
    // And if we need scrollbar
    // scrollbar: {
    //   el: '.swiper-scrollbar',
    // },
});


/*==================== Form Validation ====================*/

const fields = document.querySelectorAll('[required]') //seleciona todos o input (que tem a tag required)
const form = document.querySelector('form')

form.addEventListener('submit', event => {
    event.preventDefault()
    form.submit()//Se tudo estiver preenchido
})

function validateField(field) {
    //verifica se há erros
    function verifyErrors() {
        let foundError = false

        for(let error in field.validity){
            //se não for customError
            //Então verifica se tem erro
            if(field.validity[error] && !field.validity.valid ) {
                foundError = error
            }
        }

        return foundError
    }

    function customMessage(typeError) {
        const messages = {
            text: {
                valueMissing: 'Campo obrigatório'
            },
            email: {
                valueMissing: 'Email obrigatório',
                typeMismatch: 'Por favor, preencha um email válido'
            },
            textarea: {
                valueMissing:'Campo Obrigatório'
            }
        }

        return messages[field.type][typeError]
    }

    function setCustomMessage(message) {
        const spanError = field.parentNode.querySelector('span.error')

        if(message) {
            spanError.classList.add('active')
            spanError.innerHTML = message
        } else {
            spanError.classList.remove('active')
            spanError.innerHTML = ''
        }
    }

    return function() {
        const error = verifyErrors()

        if(error) {
            const message = customMessage(error)

            setCustomMessage(message)
        } else {
            setCustomMessage()
        }
    }
}

function customValidation(event) {
    const field = event.target
    const validation = validateField(field)

    validation()
}

for(let field of fields) {
    field.addEventListener('invalid', event => {
        //Eliminar o bubble
        event.preventDefault()
        customValidation(event)
    })
    field.addEventListener('blur', customValidation)
}

// Recaptcha Validation
window.onload = function() { 
    var el = document.getElementById('g-recaptcha-response'); 
    if (el) { 
      el.setAttribute('required', 'required'); 
    } 
}


/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/


const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)


/*==================== CHANGE BACKGROUND HEADER ====================*/ 


function scrollHeader(){
    const nav = document.getElementById('header')
    // When the scroll is greater than 80 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)


/*==================== SHOW SCROLL UP ====================*/ 

function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 560) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)


/*==================== DARK LIGHT THEME ====================*/


const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'uil-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'uil-moon' : 'uil-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
  themeButton.classList[selectedIcon === 'uil-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})

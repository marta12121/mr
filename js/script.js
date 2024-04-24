const mrinit = (function() {
    let counter = document.querySelectorAll(".counterwrap__counter");
    let counters = document.querySelectorAll(".counterwrap__counter");
    let typedText = document.querySelector("#typed-text");
    let cursor = document.querySelector(".cursor");
    let textArrayIndex = 0;
    let charIndex = 0;
    let mainSection = document.querySelectorAll('main div.sectionblock');
    let menuSection = document.querySelectorAll('.navpage__wrap li a');
    let textArray = ["UI/UX Design.", " Web Developer.", "Product Design.", "Digital Marketing."];

    // loadder page
    const loadder = function(e) {
        setTimeout(() => {
            document.querySelector(".preloader").style.display = "none";
        }, 1000);
    };

    // scroll spy 
    const scrolspy = function(e) {
        // for clickable event
        menuSection.forEach(v => {
            v.onclick = (() => {
                setTimeout(() => {
                    menuSection.forEach(j => j.classList.remove('activelink'));
                    v.classList.add('activelink');
                }, 300)
            });
        });
        // for window scroll spy event
        window.onscroll = (() => {
            mainSection.forEach((v, i) => {
                let rect = v.getBoundingClientRect().y
                if (rect < window.innerHeight - 100) {
                    menuSection.forEach(v => v.classList.remove('activelink'));
                    menuSection[i].classList.add('activelink');
                }
            });
        });
    };
    //animated typed init ------------------------
    const erase = function(e) {
        if (charIndex > 0) {
            cursor.classList.remove('blink');
            typedText.textContent = textArray[textArrayIndex].slice(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, 80);
        } else {
            cursor.classList.add('blink');
            textArrayIndex++;
            if (textArrayIndex > textArray.length - 1) {
                textArrayIndex = 0;
            }
            setTimeout(typeanimation, 1000);
        };
    };
    const typeanimation = function(e) {
        if (charIndex <= textArray[textArrayIndex].length - 1) {
            cursor.classList.remove('blink');
            typedText.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(typeanimation, 120);
        } else {
            cursor.classList.add('blink');
            setTimeout(erase, 1000);
        }
    };
    /* scroll counter */
    counters.forEach(function(item) {
        item.counterAlreadyFired = false
        item.counterSpeed = item.getAttribute("data-Speed") / 45
        item.counterTarget = +item.innerText
        item.counterCount = 0
        item.counterStep = item.counterTarget / item.counterSpeed
        item.updateCounter = function() {
            item.counterCount = item.counterCount + item.counterStep
            item.innerText = Math.ceil(item.counterCount)
            if (item.counterCount < item.counterTarget) {
                setTimeout(item.updateCounter, item.counterSpeed)
            } else {
                item.innerText = item.counterTarget
            }
        }
    });
    const counternumber = function() {
        const isScrolledIntoView = function(el) {
            var rect = el.getBoundingClientRect();
            var elemTop = rect.top;
            var elemBottom = rect.bottom;
            // Only completely visible elements return true:
            var isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
            // Partially visible elements return true:
            //isVisible = elemTop < window.innerHeight && elemBottom >= 0;
            return isVisible;
        };
        counter.forEach(function(item, id) {
            if (!isScrolledIntoView(item)) return
            item.updateCounter()
            item.counterAlreadyFired = true
        });
    };

    //binds event ----------------------------
    const bindEvents = function(e) {
        // window onbuffer
        window.onbeforeunload = function(e) {
            // allways force page to scroll top on refresh
            window.scrollTo(0, 0);
        };
        // window load
        window.addEventListener('load', (e) => {
            loadder(); // page load
        });
        // document load
        window.addEventListener('DOMContentLoaded', (e) => {
            typeanimation(); //type animation 
        });
        window.addEventListener("scroll", (e) => {
            scrolspy(); // scrollspy
            counternumber(); // counter 
        });
    };
    // init - initilizes elements and events
    const AppInit = function(e) {
        bindEvents();
    };
    return {
        AppInit: AppInit
    };
}());
//initilizing app
mrinit.AppInit();
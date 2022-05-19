// Create modal when day clicked on large calendar
function createDayModal() {

    if (menuCalendar.childNodes[30]) {
        menuCalendar.childNodes[30].remove
    }
    
    let dayModalContainer = document.createElement('div');

    let dayModalText = document.createElement('div');

    let largeCalendarArray = Array.from(document.querySelectorAll('.modal-week .day'))
     
     dayOfWeekModal.forEach(week => {
        week.addEventListener('click', (event) => {
            let clicked = event.currentTarget.children[1].textContent;
    return clicked
        })})
        console.log(clicked)

                if (clickedDay.charAt(1) && i.day == `${clickedDay.charAt(0)}${clickedDay.charAt(1)}`) {
                    return i.day == `${clickedDay.charAt(0)}${clickedDay.charAt(1)}`
     
                }
         else if (isNaN(clickedDay.charAt(1)) == true && i.day == clickedDay.charAt(0)) {
            return i.day == clickedDay.charAt(0)


        }
                else {
                    return undefined 
                }





            let modalObject = []

            if (confirmedMenuCalendar.filter(getClickedDay).length > 1) { 
            modalObject = confirmedMenuCalendar.filter(getClickedDay)[1]
        } else {
            modalObject = confirmedMenuCalendar.filter(getClickedDay)[0]
        }
        week.removeEventListener("click", ok);

console.log(modalObject)

            let dayModalTitle = document.createElement('h1');
            if (modalObject == undefined) {
                dayModalTitle.textContent = "No menu created for this day.";
                dayModalText.appendChild(dayModalTitle)

            } else {
                dayModalTitle.textContent = `Menu for ${month} ${modalObject.day}:`;
                dayModalTitle.classList.add('day-modal-title')
                dayModalText.classList.add('day-modal-text')

                dayModalText.appendChild(dayModalTitle)

                modalObject.menu.forEach(o => {
                    let dayModalDiv = document.createElement('div');

                    dayModalDiv.classList.add('day-modal-item');
                    dayModalDiv.innerHTML = `<span class="menu-item-ingredient">${o.name}</span> <i>for</i> 
          <span class="menu-item-ingredient">${o.type}</span><i> at</i> <span class="menu-item-ingredient">${o.time}</span> 
           <br><br> <h3 class="ingredients">Ingredients:</h3> `
                    for (let [i, q] of Object.entries(o)) {

                        if (i.includes('ingredient')) {
                            let ingredient = document.createElement('li');
                            ingredient.textContent = q.text;
                            dayModalDiv.appendChild(ingredient)

                        }
                    }
                    dayModalText.appendChild(dayModalDiv)

                })
            }


            let closeDayModalBtn = document.createElement('button');
            closeDayModalBtn.setAttribute('id', 'close-day-modal');

            closeDayModalBtn.textContent = 'Close';

            dayModalText.appendChild(closeDayModalBtn)
            dayModalText.classList.add('day-modal')
            dayModalContainer.appendChild(dayModalText.cloneNode(true))
            dayModalContainer.classList.add('day-modal-container')
            menuCalendar.addEventListener('click', function(e) {

                menuCalendar.appendChild(dayModalContainer);
                for (let i = 30; i <= menuCalendar.childNodes.length; i++) {
                    if (menuCalendar.childNodes.length > 31) {
                        menuCalendar.childNodes[i].remove()
                    }
                }

            });
            week.removeEventListener("click", ok);

            return
        // })

    // })

}
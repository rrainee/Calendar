const month = {};

/**
 * This function initialises the calendar and makes the select drop downs. 
 * It returns the selected values
 * @returns 
 */
function initialiseCalendar() {
    const time = new Date();
    const currentYear = time.getFullYear();
    const currentMonth = time.getMonth();
    const months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", 
        "Aug", "Sep", "Oct", "Nov", "Dec"];

    let htmlYear = "";
    for (let i = currentYear; i <= currentYear + 10; i++) {
        htmlYear += "<option value=\"" + i + "\">" + i + "</option> \n";
    }
    const elementYear = document.getElementById("year");
    elementYear.innerHTML = htmlYear;

    let htmlMonth = "";
    for (let i = 0; i < months.length; i++) {
        htmlMonth += "<option value=\"" + i + "\" " + (i === currentMonth ? "selected": "") + ">" + months[i] + "</option> \n";
    }
    const elementMonth = document.getElementById("month");
    elementMonth.innerHTML = htmlMonth;

    month.year = currentYear;
    month.month = currentMonth;

    return {selectedMonth: 11, selectedYear: 2024};


}

/**
 * This function takes in a month and year, and returns an array of all the 
 * dates of the month of that year with padding, so that the dates align with
 * the weekdays.
 * @param {number} month 0-11
 * @param {number} year 
 * @returns {array} dates
 */
function getDates(month, year) {
    let days = 0;

    if (month == 3 || month == 5 || month == 8 || month == 10) {
        days = 30;
    } else if (month == 1) {
        if (leapyear(year)) {
            days = 29;
        } else {
            days = 28;
        }
    } else {
        days = 31; 
    }

    let dates = [];
    let padding = 0;

    for (let i = 1; i <= days; i++) {
        const date = new Date(year, month, i);
        const weekday = date.getDay();

        /* For the first day of the month, add padding so the dates align with weekdays*/
        if (i == 1 && weekday != 1) {
            if (weekday == 0) {
                padding = 6;
            } else {
                padding = weekday - 1;
            }
            for (let j = 0; j < padding; j++) {
                dates.push("");
            }
        }
        dates.push(i);
    }
    console.log(dates, padding);
    
    return {dates, padding};
}

/**
 * This function takes in the dates gotten by getDates, and splits them into 
 * 7 day week arrays, ensuring no extra blank week at the end.
 * @param {array} dates 
 * @returns {array} month
 */
function getMonth(dates) {
    let month = [];
    let week = [];

    for (let i = 0; i < dates.length; i++) {
        week.push(dates[i]);

        if (week.length === 7) {
            month.push(week);
            week = [];
        }
    }

    let nextMonth = 1;
    if (week.some(day => day !== "")) {
        while (week.length < 7) {
            week.push(nextMonth); 
            nextMonth++;
        }
        month.push(week);
    }
    console.log(month);
    return month;
}


function updateCalendar() {
    const selectedYear = parseInt(document.getElementById("year").value);
    const selectedMonth = parseInt(document.getElementById("month").value);

    const dates = getDates(selectedMonth, selectedYear);
    const weeks = getMonth(dates.dates);

    const tbody = document.getElementById("calendar");
    tbody.innerHTML = ""; // rset previous rows

    weeks.forEach(week => {
        const row = document.createElement("tr");
        week.forEach(day => {
            const cell = document.createElement("td");
            if (day !== 0) {
                const button = document.createElement("button");
                button.textContent = day;
                
                cell.appendChild(button);
            } 
            row.appendChild(cell);
        });
        tbody.appendChild(row);
    });
}

/**
 * Leap year
 * @param {} year 
 * @returns 
 */
function leapyear(year) {
    return (year % 100 === 0) ? (year % 400 === 0) : (year % 4 === 0);
}


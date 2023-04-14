import "./calender.css";
import ChevronLeftLargeIcon from "@atlaskit/icon/glyph/chevron-left-large";
import ChevronRightLargeIcon from "@atlaskit/icon/glyph/chevron-right-large";
import { useEffect, useState } from "react";

export default function Calendar() {
  let date = new Date();
  const [currdate, setCurrDate] = useState(new Date());
  const [currYear, setCurrYear] = useState(currdate.getFullYear());
  const [currMonth, setCurrMonth] = useState(currdate.getMonth());
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  
  const handlePrev = () => {
    const decMonth = currMonth -1;
    setCurrMonth(decMonth);
    if(decMonth < 0 || decMonth > 11) { // if current month is less than 0 or greater than 11
      // creating a new date of current year & month and pass it as date value
      setCurrDate(new Date(currYear, decMonth, new Date().getDate()));
      setCurrYear(currdate.getFullYear()); // updating current year with new date year
      setCurrMonth(currdate.getMonth()); // updating current month with new date month
  } else {
    setCurrDate(new Date(currYear, decMonth));
  }
  }

  const handleNext = () => {
    const addMonth = currMonth + 1
      setCurrMonth(addMonth);
    if(addMonth < 0 || addMonth > 11) { // if current month is less than 0 or greater than 11
      // creating a new date of current year & month and pass it as date value
      setCurrDate( new Date(currYear, addMonth, new Date().getDate()));
      setCurrYear(currdate.getFullYear()); // updating current year with new date year
      setCurrMonth(currdate.getMonth()); // updating current month with new date month
  } 
    setCurrDate(new Date(currYear, addMonth)); // pass the current date as date lòvalue
  }

  const  firstDayOfMonth = new Date(currYear, currMonth, 1 )
  const weekdayOfFirstDay = firstDayOfMonth.getDay();
  let currentDays = [];

  for (let day = 0; day < 42; day++) {
    if (day === 0 && weekdayOfFirstDay === 0) {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 7);
    } else if (day === 0) {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() + (day - weekdayOfFirstDay));
    } else {
      firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
    }
    let calendarDay = {
      currentMonth: (firstDayOfMonth.getMonth() === currdate.getMonth()),
      date: (new Date(firstDayOfMonth)),
      month: firstDayOfMonth.getMonth(),
      number: firstDayOfMonth.getDate(),
      selected: (firstDayOfMonth.toDateString() === date.toDateString()),
      year: firstDayOfMonth.getFullYear()
    }
    currentDays.push(calendarDay);
  }
  return (
    <>
      <div className="header">
        <button className="previous-button" onClick={handlePrev}>
          <ChevronLeftLargeIcon className="left-icon" />
        </button>
        <span className="month">{months[currMonth]} {currYear} </span>
        <button className="next-button" onClick={handleNext}>
          <ChevronRightLargeIcon className="right-icon" />
        </button>
      </div>

      <ul className="weekdays">
        <li className="weekday-item">SUN</li>
        <li className="weekday-item">MON</li>
        <li className="weekday-item">TUE</li>
        <li className="weekday-item">WED</li>
        <li className="weekday-item">THU</li>
        <li className="weekday-item">FRI</li>
        <li className="weekday-item">SAT</li>
      </ul>

      <ul className="days">
        {
          currentDays.map((day, index) => {
            return (
              <li key={index} className={ (day.currentMonth ? "" : "inactive") + (day.selected ? "active" : "")  }
                    >
                <p>{day.number}</p>
              </li>
            )
          })
        }
      </ul>
    </>
  );
}

import React, { useState } from "react";

const Calculator = ({ values}) => {
  const [popup, setPopup] = useState(false);
  const [calculated, setCalculated] = useState(false);
  const [shippingDay, setShippingDay] = useState();

  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };

  const today = new Date().toLocaleString("tr-TR", options);

  function isWeekend(date) {
    return date.getDay() === 6 || date.getDay() === 0;
  }

  function isHoliday(date) {
    const holidays = { "6,4": "holiday 1", "11,25": "holiday 2" };
    const anyHoliday = Object.keys(holidays).some(
      (el) => el === `${date.getMonth()},${date.getDate()}`
    );
    return anyHoliday;
  }



  const calculateHandler = () => {
    const newDate = new Date(values.date).toLocaleString("tr-TR", options);
    const orderDate = new Date(values.date);
    let delay = 0;
    if (
      (newDate) =>
        today && values.fabric && values.quantity < 100 && values.quantity > 1
    ) {
      let shippingProcess;
      if (values.fabric === "cotton") {
        if (values.quantity < 50) {
          shippingProcess = 2 + delay;
        } else {
          shippingProcess = 3 + delay;
        }
      } else {
        if (values.quantity < 50) {
          shippingProcess = 4 + delay;
        } else {
          shippingProcess = 5 + delay;
        }
      }

      console.log("SHIPPING PROCESS - " + shippingProcess);
      let days = [orderDate];
      console.log("DAYS BEFORE PUSHING - " + days);
      for (let i = 1; i <= 10; i++) {
        const dummyDate = new Date(values.date);
        days.push(new Date(dummyDate.setDate(dummyDate.getDate() + i)));
      }
      let filteredDays = days.filter((date) => isWeekend(date) === false);
      filteredDays = filteredDays.filter((date) => isHoliday(date) === false);
      let finalDay = filteredDays[shippingProcess];
      const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      };
      setShippingDay(finalDay.toLocaleString("tr-TR", options));
      setCalculated(true);
    } else  {
      setPopup(true);
    }
  };

  return (
    <div>
      <div className="button">
        <button onClick={calculateHandler} className="calc-button">
          Calculate
        </button>
        {!calculated ? (
          <div className="estimated">
            Please enter your order information to estimate shipping date
          </div>
        ) : (
          <h3 className="estimated">
            Your Estimated Shipping Time is <span>{shippingDay}</span>
          </h3>
        )}
      </div>
      {popup ? (
        <div className="popup">
          <div className="popup_inner">
            <h1 className="popup-text">
              Please Fill All Information Correctly
            </h1>
            <button className="popup-button" onClick={() => setPopup(false)}>
              CLOSE
            </button>
          </div>
        </div>
      ) : (
        <div style={{ visibility: "hidden" }}></div>
      )}
    </div>
  );
};

export default Calculator;

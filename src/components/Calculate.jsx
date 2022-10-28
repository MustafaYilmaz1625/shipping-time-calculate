import React, { useEffect, useState } from "react";
import { BsCalendar4 } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { TiWarningOutline } from "react-icons/ti";

const Calculator = () => {
  const [type, setType] = useState("text");
  let initialValues = { date: "", fabric: "", quantity: "" };
  const [values, setValues] = useState(initialValues);
  let initialWarning = { date: true, fabric: true, quantity: true };
  const [warnings, setWarnings] = useState(initialWarning);
  const [color, setColor] = useState("grey");
  const [popup, setPopup] = useState(false);
  const [calculated, setCalculated] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const [shippingDay, setShippingDay] = useState();

  const options = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  };

  let today = new Date().toLocaleString("tr-TR", options);
  const typeHandler = () => {
    setType("date");
  };

  useEffect(() => {
    if (values.quantity < 100 && values.quantity > 1) {
      setWarnings({ ...warnings, quantity: true });
    } else {
      setWarnings({ ...warnings, quantity: false });
    }
  }, [values.quantity]);

  useEffect(() => {
    if (values.fabric) {
      setWarnings({ ...warnings, fabric: true });
      setColor("black");
    } else {
      setWarnings({ ...warnings, fabric: false });
    }
  }, [values.fabric]);

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

  function getDayName(dateStr, locale) {
    let date = new Date(dateStr);
    return date.toLocaleDateString(locale, { weekday: "long" });
  }

  useEffect(() => {
    let dateObj = new Date(values.date);
    let todayObj = new Date();
    // console.log("DATEOBJ - " + dateObj);
    // console.log("TODAY - " + todayObj);
    if (dateObj <= todayObj && values.date !== "") {
      setWarnings({ ...warnings, date: false });
      console.log(values.date);
    } else {
      setWarnings({ ...warnings, date: true });
    }
  }, [values.date]);

  const calculateHandler = () => {
    let newDate = new Date(values.date).toLocaleString("tr-TR", options);
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
    } else {
      setPopup(true);
    }
  };

  return (
    <div className="calc">
      <div className="company">The Company</div>
      <div className="shipping-time">
        Shipping Time <br /> Calculator
      </div>
      <ul className="inputs">
        <li className="input-li">
          <div className="input-box">
            <span className={warnings.date ? "closed warn" : "opened warn"}>
              Can't select a past date
              <TiWarningOutline className="warn-icon" />
            </span>
            <BsCalendar4 className="icon" />
            <input
              placeholder="Order Date"
              className="input date"
              type={type}
              onFocus={typeHandler}
              onBlur={typeHandler}
              id="date"
              value={values.date}
              onChange={(e) => setValues({ ...values, date: e.target.value })}
            />
          </div>
        </li>
        <li className="input-li">
          <div className="input-box">
            <span className={warnings.fabric ? "closed warn" : "opened warn"}>
              Select a fabric type
              <TiWarningOutline className="warn-icon" />
            </span>
            <IoIosArrowDown className="icon" />
            <select
              className={`input fabric ${color}`}
              type="radio"
              placeholder="Fabric Type"
              value={values.fabric}
              onChange={(e) => setValues({ ...values, fabric: e.target.value })}
            >
              <option className="option" value="" style={{ color: "grey" }}>
                Fabric Type
              </option>
              <option className="option" value="cotton">
                Cotton
              </option>
              <option className="option" value="linen">
                Linen
              </option>
            </select>
          </div>
        </li>
        <li className="input-li">
          <div className="input-box">
            {isShown ? (
              <span className="info">
                Shipping Dates May Vary Based on Quantity
              </span>
            ) : (
              <div style={{ visibility: "hidden" }}></div>
            )}

            <span className={warnings.quantity ? "closed warn" : "opened warn"}>
              Select between 1 and 100
              <TiWarningOutline className="warn-icon" />
            </span>
            <svg
              onMouseEnter={() => setIsShown(true)}
              onMouseLeave={() => setIsShown(false)}
              stroke="currentColor"
              fill="currentColor"
              strokeWidth="0"
              viewBox="0 0 1024 1024"
              className="icon info-icon"
              height="1em"
              width="1em"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm32 664c0 4.4-3.6 8-8 8h-48c-4.4 0-8-3.6-8-8V456c0-4.4 3.6-8 8-8h48c4.4 0 8 3.6 8 8v272zm-32-344a48.01 48.01 0 0 1 0-96 48.01 48.01 0 0 1 0 96z"></path>
            </svg>
            {/* <AiFillInfoCircle className="icon info-icon" /> */}
            <input
              type="number"
              className="input quantity"
              placeholder="Quantity"
              value={values.quantity}
              onChange={(e) =>
                setValues({ ...values, quantity: Number(e.target.value) })
              }
            />
          </div>
        </li>
      </ul>
      <div className="button">
        <button onClick={calculateHandler} className="calc-button">
          Calculate
        </button>
        {!calculated ? (
          <div className="estimated">
            Please enter your order information to estimate shipping date
          </div>
        ) : (
          <div className="estimated">
            Your Estimated Shipping Time is <span>{shippingDay}</span>
          </div>
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

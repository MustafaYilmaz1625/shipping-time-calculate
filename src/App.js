import React, { useEffect, useState } from "react";
import Calculate from "./components/calculate/Calculate";
import { BsCalendar4 } from "react-icons/bs";
import { IoIosArrowDown } from "react-icons/io";
import { TiWarningOutline } from "react-icons/ti";
import "./App.css";

function App() {
  const [type, setType] = useState("text");
  const initialValues = { date: "", fabric: "", quantity: "" };
  const [values, setValues] = useState(initialValues);
  const [color, setColor] = useState("grey");
  const initialWarning = { date: true, fabric: true, quantity: true };
  const [warnings, setWarnings] = useState(initialWarning);
  const [isShown, setIsShown] = useState(false);

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

  useEffect(() => {
    let dateObj = new Date(values.date);
    let todayObj = new Date();
    if (dateObj <= todayObj && values.date !== "") {
      setWarnings({ ...warnings, date: false });
      console.log(values.date);
    } else {
      setWarnings({ ...warnings, date: true });
    }
  }, [values.date]);

  const typeHandler = () => {
    setType("date");
  };

  return (
    <div className="App">
      <div className="calc">
        <div>
          <h1 className="company">The Company</h1>
          <h2 className="shipping-time">
            Shipping Time <br /> Calculator
          </h2>
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
                  onChange={(e) =>
                    setValues({ ...values, date: e.target.value })
                  }
                />
              </div>
            </li>
            <li className="input-li">
              <div className="input-box">
                <span
                  className={warnings.fabric ? "closed warn" : "opened warn"}
                >
                  Select a fabric type
                  <TiWarningOutline className="warn-icon" />
                </span>
                <IoIosArrowDown className="icon" />
                <select
                  className={`input fabric ${color}`}
                  type="radio"
                  placeholder="Fabric Type"
                  value={values.fabric}
                  onChange={(e) =>
                    setValues({ ...values, fabric: e.target.value })
                  }
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

                <span
                  className={warnings.quantity ? "closed warn" : "opened warn"}
                >
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
                ></svg>
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
        </div>
        <Calculate
          values={values}
          warnings={warnings}
          setWarnings={setWarnings}
          setType={setType}
          setColor={setColor}
        />
      </div>
    </div>
  );
}

export default App;

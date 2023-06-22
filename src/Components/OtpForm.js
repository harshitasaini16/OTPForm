import { useEffect, useMemo, useRef, useState } from "react";

const OtpForm = ({ count }) => {
  const inputRef = useRef([]);
  const [submitEnable, setSubmitEnable] = useState(false);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (value.length === 1 && index < count - 1) {
      inputRef.current[index + 1].focus();
    } else if (value.length === 1 && index === count - 1) {
      inputRef.current[index].blur();
    } else if (index > 0 && value.length === 0) {
      inputRef.current[index - 1].focus();
    }
    let f = true;
    inputRef.current.map((x) => {
      if (x.value === "") {
        return (f = false);
      }
    });
    console.log(f);
    if (f === true) {
      setSubmitEnable(true);
    } else {
      setSubmitEnable(false);
    }
  };

  const handleKeyPress = (e, index) => {
    const v = e.key;
    if (e.key === "Enter") {
      if (index < count - 1) {
        inputRef.current[index + 1].focus();
      }
    } else if (e.key === "Backspace") {
      if (index > 0 && e.target.value === "") {
        inputRef.current[index - 1].focus();
      }
    } else if (e.key === inputRef.current[index].value) {
      inputRef.current[index].value = e.key;
      inputRef.current[index + 1].focus();
    }
  };

  const handleClear = () => {
    inputRef.current.forEach((x) => (x.value = ""));
    inputRef.current[0].focus();
    setSubmitEnable(false);
  };

  const handleSubmit = () => {
    const otp = inputRef.current.map((x) => {
      return x.value;
    });
    console.log(otp);
  };

  const arr = useMemo(() => {
    let a = [];
    let i = 0;
    while (i < count) {
      a.push(i);
      i++;
    }
    return a;
  }, [count]);

  useEffect(() => {
    inputRef.current[0].focus();
  }, []);

  return (
    <div className="otpform">
      <h1 className="heading">Enter the valid OTP</h1>
      <div className="input-container">
        {arr.map((x, index) => {
          return (
            <input
              key={index}
              type="text"
              ref={(r) => (inputRef.current[index] = r)}
              className="input"
              onChange={(e) => handleChange(e, index)}
              onFocus={(e) => e.target.select()}
              onKeyUp={(e) => handleKeyPress(e, index)}
            />
          );
        })}
      </div>
      <div className="btn-container">
        <button className="btn" onClick={handleClear}>
          Clear
        </button>
        <button
          className={submitEnable ? "btn" : "btn-dissable"}
          disabled={!submitEnable}
          onClick={handleSubmit}
        >
          Verify
        </button>
      </div>
    </div>
  );
};
export default OtpForm;

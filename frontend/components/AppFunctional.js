import React, { useState } from "react";

// Suggested initial states
const initialState = {
  message: "",
  email: "",
  steps: 0,
  index: 4,
};
// the index the "B" is at

export default function AppFunctional(props) {
  // THE FOLLOWING HELPERS ARE JUST RECOMMENDATIONS.
  // You can delete them and build your own logic from scratch.
  const [state, setState] = useState(initialState);

  function getXY(index) {
    const row = Math.floor(index / 3);
    const col = index % 3;
    return { x: col + 1, y: row + 1 };
  }

  function getXYMessage(index) {
    const { x, y } = getXY(index);
    return `Coordinates (${x}, ${y})`;
  }

  function reset() {
    setState(initialState);
  }

  function getNextIndex(direction) {
    const { index } = state;
    const [x, y] = [index % 3, Math.floor(index / 3)];
    const nextIndexes = {
      left: x === 0 ? index : index - 1,
      up: y === 0 ? index : index - 3,
      right: x === 2 ? index : index + 1,
      down: y === 2 ? index : index + 3,
    };
    return nextIndexes[direction] ?? index;
  }

  function move(evt) {
    const direction = evt.target.dataset.direction;
    const nextIndex = getNextIndex(direction);
    setState({
      ...state,
      message: getXYMessage(nextIndex),
      steps: state.steps + 1,
      index: nextIndex,
    });
  }

  function onChange(evt) {
    setState({
      ...state,
      email: evt.target.value,
    });
  }

  function onSubmit(evt) {
    evt.preventDefault();

    const payload = {
      message: state.message,
      email: state.email,
      steps: state.steps,
    };

    fetch("/api/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        // Do something with the response data
      })
      .catch((error) => {
        console.error("There was an error:", error);
      });
  }

  return (
    <div id="wrapper" className={props.className}>
      <div className="info">
        <h3 id="coordinates">Coordinates (2, 2)</h3>
        <h3 id="steps">You moved 0 times</h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div key={idx} className={`square${idx === 4 ? " active" : ""}`}>
            {idx === 4 ? "B" : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message"></h3>
      </div>
      <div id="keypad">
        <button id="left">LEFT</button>
        <button id="up">UP</button>
        <button id="right">RIGHT</button>
        <button id="down">DOWN</button>
        <button id="reset">reset</button>
      </div>
      <form>
        <input id="email" type="email" placeholder="type email"></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}

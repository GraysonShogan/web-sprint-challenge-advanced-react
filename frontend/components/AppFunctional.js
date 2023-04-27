import React, { useState } from "react";

const initialState = {
  message: "",
  email: "",
  steps: 0,
  index: 4,
};

export default function AppFunctional(props) {
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
    const email = evt.target.value;
    setState({
      ...state,
      email: email,
    });
  }

  function onSubmit(evt) {
    evt.preventDefault();

    const payload = {
      x: getXY(state.index).x,
      y: getXY(state.index).y,
      steps: state.steps,
      email: state.email,
    };

    fetch("/api/result", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unprocessable Entity");
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
        <h3 id="coordinates">{getXYMessage(state.index)}</h3>
        <h3 id="steps">You moved {state.steps} times</h3>
      </div>
      <div id="grid">
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
          <div
            key={idx}
            className={`square${idx === state.index ? " active" : ""}`}
          >
            {idx === 4 ? "B" : null}
          </div>
        ))}
      </div>
      <div className="info">
        <h3 id="message">{state.message}</h3>
      </div>
      <div id="keypad">
        <button id="left" onClick={move} data-direction="left">
          LEFT
        </button>
        <button id="up" onClick={move} data-direction="up">
          UP
        </button>
        <button id="right" onClick={move} data-direction="right">
          RIGHT
        </button>
        <button id="down" onClick={move} data-direction="down">
          DOWN
        </button>
        <button id="reset" onClick={reset}>
          reset
        </button>
      </div>
      <form onSubmit={onSubmit}>
        <input
          id="email"
          type="email"
          placeholder="type email"
          value={state.email}
          onChange={onChange}
        ></input>
        <input id="submit" type="submit"></input>
      </form>
    </div>
  );
}

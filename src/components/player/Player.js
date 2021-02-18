import React from "react";

function Player({ children }) {
  return <div className="m-2">{children}</div>;
}

Player.Name = ({ name }) => <div>Player: {name}</div>;
Player.Points = ({ points }) => <div>Points: {points}</div>;

export default Player;

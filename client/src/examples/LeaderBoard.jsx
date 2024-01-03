import React from "react";
import {
    usePlayer,
    usePlayers
  } from "@empirica/core/player/classic/react";
import { Button } from "../components/Button";

export function LeaderBoard(){
  const allPlayers = usePlayers();
  const player = usePlayer();

  const sortedPlayers = allPlayers.sort((a, b) => {
    const scoreA = a.get("score") || 0;
    const scoreB = b.get("score") || 0;
    return scoreB - scoreA;
  });

  function handleSubmit() {
    console.log('Moving on from results round');
    player.stage.set("submit", true);
  }
  

  return (
    <div className="mt-5 p-5 border rounded">
      <h2 className="text-lg font-semibold mb-3">Leaderboard</h2>
      <div>
        {sortedPlayers.map((player, index) => (
          <div
            key={player.id}
            className={`flex justify-between items-center py-2 ${
              index % 2 === 0 ? "bg-gray-100" : "bg-white"
            }`}
          >
            <p className="text-sm">
              {index + 1}. Player {player.id}
            </p>
            <p className="text-sm font-semibold">
              Score: {player.get("score") || 0}
            </p>
          </div>
        ))}
      </div>
      <p>Your player id is {player.id}</p>
      <br/>
      <Button handleClick={handleSubmit} primary>
        I'm done!
      </Button>
    </div>
  );
};


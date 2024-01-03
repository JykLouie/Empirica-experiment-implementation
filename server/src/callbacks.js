import { ClassicListenersCollector } from "@empirica/core/admin/classic";
export const Empirica = new ClassicListenersCollector();

Empirica.onGameStart(({ game }) => {

  const round0 = game.addRound({
    name: "Advertise 1",
    task: "advertise",
  });
  round0.addStage({ name: "advertiseProduct", duration: 240 });

  const warrantRound0 = game.addRound({
    name: "Warrant 1",
    task: "warrant",
  });
  warrantRound0.addStage({ name: "warrantProduct", duration: 120 });

  const resultround0 = game.addRound({
    name: "Results 1",
    task: "results",
  });
  resultround0.addStage({ name: "Result", duration: 140 });

  const leaderBoard0 = game.addRound({
    name: "LeaderBoard",
    task: "leaderBoard",
  });
  leaderBoard0.addStage({ name: "LeaderBoard", duration: 140 });

  const round1 = game.addRound({
    name: "Advertise 2",
    task: "advertise2",
  });
  round1.addStage({ name: "advertiseProduct", duration: 240 });

  const warrantRound1 = game.addRound({
    name: "Warrant 2",
    task: "warrant2",
  });
  warrantRound1.addStage({ name: "warrantProduct", duration: 120 });

  const resultRanoud1 = game.addRound({
    name: "Results 2",
    task: "results2",
  });
  resultRanoud1.addStage({ name: "Result", duration: 140 });

  const leaderBoard1 = game.addRound({
    name: "LeaderBoard",
    task: "leaderBoard",
  });
  leaderBoard1.addStage({ name: "LeaderBoard", duration: 140 });

  const round2 = game.addRound({
    name: "Advertise 3",
    task: "advertise3",
  });
  round2.addStage({ name: "advertiseProduct", duration: 240 });

  const warrantRound2 = game.addRound({
    name: "Warrant 3",
    task: "warrant3",
  });
  warrantRound2.addStage({ name: "warrantProduct", duration: 120 });

  const resultRanoud2 = game.addRound({
    name: "Results 3",
    task: "results3",
  });
  resultRanoud2.addStage({ name: "Result", duration: 140 });

  const leaderBoard2 = game.addRound({
    name: "LeaderBoard",
    task: "leaderBoard",
  });
  leaderBoard2.addStage({ name: "LeaderBoard2", duration: 140 });

  const round3 = game.addRound({
    name: "Advertise 4",
    task: "advertise4",
  });
  round3.addStage({ name: "advertiseProduct", duration: 240 });

  const warrantRound3 = game.addRound({
    name: "Warrant 4",
    task: "warrant4",
  });
  warrantRound3.addStage({ name: "warrantProduct", duration: 120 });

  const resultRanoud3 = game.addRound({
    name: "Game Results",
    task: "results4",
  });
  resultRanoud3.addStage({ name: "Result", duration: 140 });

  const leaderBoard3 = game.addRound({
    name: "LeaderBoard",
    task: "leaderBoard",
  });
  leaderBoard3.addStage({ name: "LeaderBoard2", duration: 140 });


});

Empirica.onRoundStart(({ round }) => {});

Empirica.onStageStart(({ stage }) => {
  // calculateAdvertiserScore(stage);
});

Empirica.onStageEnded(({ stage }) => {});

Empirica.onRoundEnded(({ round }) => {});

Empirica.onGameEnded(({ game }) => {});

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function calculateAdvertiserScore(stage) {
  if (
    stage.get("name") !== "Advertise" ||
    stage.round.get("task") !== "advertise" ||
    stage.get("name") !== "Advertise Again" ||
    stage.round.get("task") !== "advertiseAgain"
  ) {
    return;
  }

  for (const player of stage.currentGame.players) {
    console.log('calculating advertiser score')
    let adQuality = player.get("adQuality")
    let salesCount = 0
    let randomDraw = 0
    if (adQuality == "extraordinary") {
      randomDraw = getRandomInt(100)
      salesCount = randomDraw * 15;
    } {
      let randomDraw = getRandomInt(100)
      salesCount = randomDraw * 10;
    }

    player.set("numBuyers", randomDraw);

    let totalScore = player.get("score") || 0;
    player.set("salesCount", salesCount);
    player.set("score", totalScore + salesCount);
    player.set("scoreUpdated", true)
  }
}

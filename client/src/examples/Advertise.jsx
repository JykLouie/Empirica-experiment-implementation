import {
    Slider,
    usePlayer,
    usePlayers,
    useStage,
  } from "@empirica/core/player/classic/react";
  import React, {useState} from "react";
  import { Avatar } from "../components/Avatar";
  import { Button } from "../components/Button";
  import "@empirica/core/player/classic/react";
  
  export function Advertisement({roundNumber}) {
    const player = usePlayer();
    const players = usePlayers();
    const stage = useStage();
    const roundNumberText = 'round' + roundNumber;
    //console.log('roundNumberText', roundNumberText);

    //This fix the issue of read undefined error when user did not click submit before countdown ends.
    //A better way to do is to save all data for every change made by the user before submit
    player.set(roundNumberText.concat("_choices"),[0,0,0,0,0])

    function handleChange() {
      console.log("something happened");
    }
    function handleSubmit() {
      console.log("Player.stage set to true");

      player.set(roundNumberText.concat("_choices"),
      [player.round.get("productionQuality"),
      player.round.get("advertisementQuality"),
      player.round.get("priceOfProduct"),
      player.round.get("productionCost"),
      player.round.get("warrantAmount"),
      player.round.get("warrantAmount"),])

      player.stage.set("submit", true);//player.stage.submit();
    }

    function handleProductionChoice(e, productionQuality, cost) {
      player.round.set("productionQuality",productionQuality);
      if (player.round.get("productionQuality") === "low"){player.round.set("productionCost", 5)}
      if (player.round.get("productionQuality") === "high"){player.round.set("productionCost", 9)}     
      console.log("Saved production quality to player.round object: ", productionQuality);
      console.log("Saved production cost to player.round object: ", player.round.get("productionCost"));
    }
    
    function handleAdverisementChoice(e, advertisementQuality) {
      player.round.set("advertisementQuality", advertisementQuality);
      console.log("Saved advertisement quality to player.round object: ", advertisementQuality);
    }

    function handlePriceChoice(e, priceOfProduct) {
      player.round.set("priceOfProduct", priceOfProduct);
      console.log("Saved priceOfProduct to player.round object: ", priceOfProduct);
    }

    function handleWarrantAmountChange(e){
      let newWarrantAmount = parseInt(e.target.value, 10);
      newWarrantAmount = Math.min(Math.max(newWarrantAmount, 0), 400);
      player.round.set("warrantAmount", newWarrantAmount);
    }
  
    const isResultStage = stage.get("name") === "result";
  
    if (players.length > 1  && isResultStage) {
      product = (
        <div className="grid grid-cols-2 items-center">
          {product}
          <div>
            {isResultStage ? (
              <>
                <div className="text-gray-500 text-2xl">You</div>
                <div className="border-b-3 border-blue-500/50 pb-2 mb-8">
                  {PlayerScore(player, () => {}, isResultStage)}
                </div>
              </>
            ) : null}
            {players
              .filter((p) => p.id !== player.id)
              .map((p) => PlayerScore(p, handleChange, isResultStage))}
          </div>
        </div>
      );
    } else if (players.length == 1 && isResultStage) {
      product = (
        <div className="grid grid-cols-2 items-center">
          {product}
          <div>
            {isResultStage ? PlayerScore(player, () => {}, isResultStage) : null}
          </div>
        </div>
      );
    }
    return (
      <div class="h-full flex items-center justify-center overflow-y-auto">
      <div className="container mx-auto space-y-10 p-8">
        {}
        <div className="h-100"></div>
        <div className="h-75"></div>
        <div>
          <h1><b>You are a producer of toothpaste.</b> </h1>
          <h1>You will now decide what to produce, how to advertise it and the price.</h1>
        </div>

        <div className="flex flex-wrap">
          <div className="mb-12 w-0.95/2 border rounded p-4">
            <h1><b>You are a producer of toothpaste</b></h1>
              <h1><b>Choose what to produce.</b> All your products this round will be the quality you select. <br/> Your current choice is to produce: <b>{player.round.get("productionQuality")} </b> quality toothspaste.</h1>
              <div className="flex flex-wrap justify-center space-x-4"> {/* This flex container will lay out its children (products) in a row */}
              <ProductionAlternative title="Standard Toothpaste" cost="5" quality="low" imageUrl={"url(/images/toothpastestandard.jpg)"} on_button_click={(e) => handleProductionChoice(e, "low")}/>
              <ProductionAlternative title="Amazing Toothpaste" cost="9" quality="high" imageUrl={"url(/images/toothpaseamazing.jpg)"} on_button_click={(e) => handleProductionChoice(e, "high")}/> {/*Here we need to pass what kind of advertisement option the player chose*/ }
              </div>
          </div>

          <div className="mb-12 w-0.1/2"></div>

          <div className="mb-12 w-0.95/2 border rounded p-4">
            <h1><b>Choose how you want to advertise it.</b> All your products will be advertised this way.</h1>
            <p>When people are buying, they will only know the price and the advertised quality.
              They will not know the true quality until they have bought the product.</p> <br/>
            <p><strong>Note: </strong>You have the ability to make any kind of advertisement<br/> about your product in order to maximize your sales.</p>
            <p>Your current choice is to advertise your product as: <b>{player.round.get("advertisementQuality")} </b> quality toothspaste.</p>
            <div className="flex flex-wrap justify-center space-x-4"> {/* This flex container will lay out its children (products) in a row */}
            <AdvertisementAlternative title="Standard Toothpaste (low quality)"  quality="low" imageUrl={"url(/images/toothpastestandard.jpg)"} on_button_click={(e) => handleAdverisementChoice(e, "low")}/>
            <AdvertisementAlternative title="Amazing Toothpaste (high quality)"  quality="high" imageUrl={"url(/images/toothpaseamazing.jpg)"} on_button_click={(e) => handleAdverisementChoice(e, "high")}/>
            </div>
          </div>

          <div className="mb-12 w-0.95/2 border rounded p-4">
            <h1><b>Choose the price for your product</b></h1>
            <br/>
            <p> A typical price for <b>low </b> quality toothpaste is : $10 ,and typical price for <b>high</b> quality toothpaste is : $15 </p>
            <p><strong>Note: </strong>You have the ability to set any kind of price for your product in order to maximize your sales.</p>

            <p>Your current choice is to sell at a price of: <b>$ {player.round.get("priceOfProduct")} </b></p>
            <br/>
            <div className="flex flex-wrap justify-center space-x-4"> 
            <PriceButton text={'$10'} on_button_click={(e) => handlePriceChoice(e, 10)}></PriceButton>
            <PriceButton text={'$15'} on_button_click={(e) => handlePriceChoice(e, 15)}></PriceButton>
            </div>
            <br/>
            <ProfitMarginCalculation producerPlayer = {player}/>
          </div>

          <div className="mb-12 w-0.1/2"></div>

          <div className="mb-12 w-0.95/2 border rounded p-4">
            <h1><b>Choose the amount of money you wish to spend on warrant</b></h1>
            <h1><b>If you choose not to spend money on warrant, enter 0</b></h1>
            <div className="flex flex-wrap justify-center space-x-4"> 
            <label htmlFor="numberInput">Enter a number (max 400):</label>
            <input
              type="number"
              id="numberInput"
              value={player.round.get("warrantAmount")}
              onChange={handleWarrantAmountChange}
              max="400"
            />
            </div>
          </div>

          
        </div>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
          <NextRoundButton on_button_click={(e) => handleSubmit(e)} />
        </div>
        <br/>

      </div>
      </div>
    );
  }
  
  function NextRoundButton({on_button_click}){
    return (
    <Button handleClick={on_button_click}> Go to market (next round) </Button>
    )
  }

  function ProductionAlternative({ title, imageUrl, cost, quality, on_button_click }) {
    return (
      <div className="w-64 p-4">
        <div
          className="h-48 w-full max-w-full bg-contain bg-center bg-no-repeat"
          style={{
            backgroundImage:imageUrl
              //"url(https://media.istockphoto.com/id/638349734/photo/ttoothpaste-containers-on-white-isolated-background.jpg?s=612x612&w=0&k=20&c=eF1XyMlRaQLI9ETehA3_7En5_3D41GX7FKb8cIWeP8k=)",
              //"url(https://i.ibb.co/fF6mWV6/toothpastehigh.jpg)"
              //"url(/root/bucode/empirica-dev/sverre_experiment_test_claims/client/public/images/toothpaseamazing.jpg)" 
              //"url(/images/toothpaseamazing.jpg)"
              //"url(/images/toothpasestandard.jpg)"

          }}
          alt={title}
        />
        <div className="flex flex-col items-center mt-4">
          <h2 className="text-center">{title}. <br /> {quality} quality </h2>
          <Button handleClick={on_button_click} adQuality={quality} primary>
            💸 Produce this quality at a cost of ${cost} per unit
          </Button>
        </div>
      </div>
    );
  }
  
  function AdvertisementAlternative({ title, imageUrl, quality, on_button_click }) {
    return (
      <div className="w-64 p-4">
        <div
          className="h-48 w-full max-w-full bg-contain bg-center bg-no-repeat"
          style={{
            backgroundImage:
              imageUrl
              //"url(https://media.istockphoto.com/id/638349734/photo/ttoothpaste-containers-on-white-isolated-background.jpg?s=612x612&w=0&k=20&c=eF1XyMlRaQLI9ETehA3_7En5_3D41GX7FKb8cIWeP8k=)",
          }}
          alt={title}
        />
        <div className="flex">
          <h2>{title}. <br/> </h2>
          {/*{price} points per unit sold</h2>*/}
        </div>
        <Button handleClick={on_button_click} adQuality={quality} primary>
          📣 Advertise as {quality} quality
            </Button>
      </div>
    );
  }

  function PriceButton({text, price, on_button_click}){
    return(
      <Button handleClick={on_button_click} >
          🏷️ Sell my product for {text} {price}
            </Button>
    )
  }

  function PlayerScore(player, onChange, isResultStage) {
    return (
      <div key={player.id} className="py-4">
        <div className="flex items-center space-x-6">
          <div className="h-12 w-12 shrink-0">
            <Avatar player={player} />
          </div>

          {isResultStage ? (
            <div className="flex flex-col items-center space-y-0.5">
              <div className="text-2xl font-semibold leading-none font-mono">
                {player.round.get("score") || 0}
              </div>
              <h1 className="text-xs font-semibold uppercase tracking-wider leading-none text-gray-400">
                Score
              </h1>
            </div>
          ) : null}
        </div>
      </div>
    );
  }


  function ProfitMarginCalculation({producerPlayer}){
    let profit = producerPlayer.round.get("priceOfProduct") - producerPlayer.round.get("productionCost")
    return(
      <div>
        
        <p>You have chosen to produce <b>{producerPlayer.round.get("productionQuality")}</b> quality toothpaste and advertise it as <b>{producerPlayer.round.get("advertisementQuality")}</b> quality toothpase at a <b>price of ${producerPlayer.round.get("priceOfProduct")}</b>.</p>
        <h1><p>This gives a <b>profit of  ${profit}</b> per product sold.</p></h1>

      </div>
    )
  }

import {
    Slider,
    usePlayer,
    usePlayers,
    useStage,
  } from "@empirica/core/player/classic/react";
import React, {useState} from "react";
import { Button } from "../components/Button";
import "@empirica/core/player/classic/react";

  export function Warrant({roundNumber}){
    const players = usePlayers();
    const player = usePlayer();
    const roundNumberText = 'round' + roundNumber;
    const [selectedWarrant, setSelectedWarrant] = useState(null);

    const handleWarrantSelection = (playerId) => {
        const selectedPlayer = players.find((p) => p.id === playerId);
        const advertisementQuality = selectedPlayer.get(roundNumberText.concat("_choices"))[1];
        const priceOfProduct = selectedPlayer.get(roundNumberText.concat("_choices"))[2];
      
        setSelectedWarrant({
          playerId: playerId,
          advertisementQuality: advertisementQuality,
          priceOfProduct: priceOfProduct,
        });
      };

    const handleClearChoice = () => {
        setSelectedWarrant(null);
    }
    
    const handleChallenge = () => {   
        if (selectedWarrant !== null) {
          const challengedPlayer = players.find(
            (p) =>
              p.id === selectedWarrant.playerId
          );
          
          if (challengedPlayer) {
            console.log("found")
            const roundChoices = challengedPlayer.get(roundNumberText.concat("_choices")).slice();
            const challengedProductionQuality =
              challengedPlayer.get(roundNumberText.concat("_choices"))[0];
            const challengedAdvertisementQuality =
              challengedPlayer.get(roundNumberText.concat("_choices"))[1];
    
            // Check if production and advertisement qualities match
            const challengeSuccessful =
              challengedProductionQuality !== challengedAdvertisementQuality;
            // If challenge successful, clear warrant amount for the challenged player
            if (challengeSuccessful) {
                console.log("callenge success")
                console.log(challengedPlayer)
                roundChoices[4] = 0;
                challengedPlayer.set(roundNumberText.concat("_choices"), roundChoices);
            }
    
            // Reset selectedWarrant after challenge
            setSelectedWarrant(null);
          }

          player.stage.set("submit", true);
        }
      };
    
      const handleSkip = () => {
        setSelectedWarrant(null);
        player.stage.set("submit", true);
      }

      function NextRoundButton({on_button_click}){
        return (
        <Button handleClick={on_button_click}> Challenge </Button>
        )
      }

      function SkipButton({on_button_click}){
        return (
        <Button handleClick={on_button_click}> Skip </Button>
        )
      }

      function WarrantButton({on_button_click}){
        return (
        <Button handleClick={on_button_click}> Select </Button>
        )
      }

      function ClearChoiceButton({on_button_click}){
        return (
            <Button handleClick={on_button_click}> Clear Choice </Button>
            )       
      }

      return (
        <div className="container mx-auto space-y-10 p-8">
          {players.some((p) => p.id !== player.id && p.get(roundNumberText.concat("_choices"))[4] !== 0) ? (
            players.map((p) => {
              const advertisementQuality = p.get(roundNumberText.concat("_choices"))[1];
              const priceOfProduct = p.get(roundNumberText.concat("_choices"))[2];
              const warrantAmount = p.get(roundNumberText.concat("_choices"))[4];

              // Check if the player spent money on warrant
              // Unfortunately for now the only identifier empirica has for the players is the id. Avartar might work but there is no option to upload one for now.
              if (warrantAmount !== 0 &&  p.id !== player.id) {
                return (
                  <div key={p.id} className="mb-12 w-0.99/2 border rounded p-4 relative">
                    <p>
                      Player {p.id} posted a warrant for their product.
                    </p>
                    <p>Advertised quality of the product: {advertisementQuality}</p>
                    <p>Price of the product: {priceOfProduct}</p>
                    <WarrantButton
                      on_button_click={(e) => handleWarrantSelection(p.id)}
                      disabled={selectedWarrant !== null}
                    >
                      Select Warrant
                    </WarrantButton>
                  </div>
                );
              }

              return null; // No money spent on warrant by this player
            })
          ) : (
            <div className="mb-12 w-0.99/2 border rounded p-4 relative">
              <p>
                Seem like no other players have posted any warrant. Please click skip to skip this stage.
              </p>
            </div>
          )}
    
          {/* Challenge and Skip buttons */}
          <div>
          You've chosen to challenge {selectedWarrant ? `Player ${selectedWarrant.playerId}'s warrant with advertised quality ${selectedWarrant.advertisementQuality} and price ${selectedWarrant.priceOfProduct}.` : 'No warrant selected.'}
          </div>
          <ClearChoiceButton on_button_click={(e) => handleClearChoice(e)}/>
          <div className="flex justify-center space-x-4 mt-4">
            <NextRoundButton on_button_click={(e) => handleChallenge(e)} />
            <SkipButton on_button_click={(e) => handleSkip(e)} />
          </div>
          <br />
        </div>
      );


  }


Feature Design:

    User Story: 
    On the advertising page (before putting the products into the market), the producer has the option to add a warrant for the product. Warrant requires a certain amount of money, but can attract more people to buy. The Producer can choose how much money to spend on the warrant. After introducing the product into the market and before settling scores, use a page to show all the market warrants to all producers. A producer may choose to challenge a warrant (only one). If the challenge succeeds, it can result in additional turnover from the warrant not being available at settlement. Challenge failure has no impact on the initiator.

    Notes:
    1. The warrant functionality can be placed at the bottom of the advertising stage below the price determination section.
    2. In the actual experiment, the conversion of warrant and turnover needs a more elaborate design and calculation. This implementation is just an approximation.


Reflection:
    In the real-world industrial market, the projection of this function is a variety of certificates, guarantees, and "consumer feedback." When consumers buy an item, consumers need certain information to confirm that the purchased item is what they want. Publicity from merchants is not enough, because merchants generally promote their products positively rather than neutrally out of interest. As a result, merchants need to spend additional resources to purchase third-party resources to demonstrate product quality to customers. In the design of the simulation, this mechanism in reality is reduced to the simple function of spending extra money in exchange for turnover. There is no need to choose the type of certification, and there is no need to consider the number of certifications, only the commercial benefits and risks of the warrant are retained. In the challenge phase, since there is not much real cost to challenge authentication in reality, it is also designed to have no impact on challenge failure. However, this leads to the goal of maximizing profits (eliminating potential competitors' profits) by making all players challenge all products except their own. Therefore, limiting challenge opportunities to once per round can effectively limit the effect of the challenge.


A few bugs and suggestions:
    
    Bugs:

        1. When the countdown ends and the player did't submit, the result page fails to load. This brings the player to a blank page without any button to help the user proceed.
            a. This might be caused by the fact that "player.set(roundNumberText.concat("_choices"), [some properties])" only happens when the user clicks submit. If the user does not submit before the countdown ends, those properties(which will be used in the warrant and result page) won't be stored and will cause "TypeError: Cannot read properties of undefined" when you trying to read them.
                i. I fixed this by setting all properties to 0 initially at the advertising stage. A better way to solve this would be to save properties every time on any change made by the player.
            b. You might also want to make an error wrapper & error page for unexpected errors in the future to help players understand the situation in case when something unexpected happens.

        2. Refreshing the webpage at the result page will cause the random number to regenerate. Users can actively change the number of customers by refreshing the page(kind of severe bug for it ruins the data). 
            a. This might be caused by the fact that the Math.random() will regenerate a number every time you reload the page, and const will not be saved when the page reloads.
                i. I fixed this by setting up a local variable to save the value when the score is generated for the first time. And once the value is there the webpage reads the value directly. A better way to solve this is to set up a real backend system and a database(because the user can still change their score on the client side if they know how to). Since you might want to visualize all experiment data, the database is also a better option to export.

    Suggestions:
        1. Create specific div blocks for white spacing instead of repeating <br>. (Or if you wish to use <br> to separate code into sections for readability, comment is a better option)
        2. If there are multiple kinds of products in the experiment, try not to hard code them in advertising.
        3. Seems like currently, the timer on the top of the game seems to be "position: relative", which causes the page content to overlap with the timer when removing the <br>s you set on the top of the advertising page. Fixing this might require adjustment for the contents in the emprica package. 

About design:
    I redesigned the advertise page. The original design makes the page too long, which will force the user to scroll up and down when they try to change or comfirm the selections. Current design stacked each two sections horizontally, this avoided above situation. Also, I added a border to each section so that it is easier for user to identify them.
    For the warrant page I applied the same design.

About Leaderboard:
    Implemented with usePlayers()
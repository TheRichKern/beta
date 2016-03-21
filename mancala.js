$(document).ready ( function() {

	//This file contains objects, functionality, and style code for
	//divs within the html.  There are essentially 6 types of divs

	// 1) turnMarker tracks what the current turn is and is queried to determinie
	// which click and mouse events are available

	// 2) there are two notification divs that guide the user into understanding
	// the results of the distribution.  These have a similar role to promtps.

	// 3) red mancala is the scoring area for the red player.  The user does not
	// directly interact with it, but it functions the same way traditional mancala
	// is played.

	// 4) blue mancala is the scoring area for the blue player.  The functionality
	// and use of this div is exactly symmetrical to red mancala.

	// 5) there are 6 red pits that use mouse over and onclick events.  pits determine
	// distribution of points in terms of quantity and direction.

	// 6) there are 6 blue pits that are symetrical to the red pits in terms of
	// functionality and and use.

	// When interpreting this code, note that the main idea is to link divs to objects
	// and vice versa to link objects back to divs.

//OBJECT DEFINITIONS:

	// This constructor is not called on fully in code, but is provided to show
	// clarity and make the overall definition of a pitObject disambigous
	function pitObject(pit, next, steal, score, color) {
    	 this.currentPitID = pit;
    	 this.nextPitID = next;
    	 this.stealPitID = steal;
    	 this.currentPitScore = score;
    	 this.color = color;};

	// First, all pit objects are created with no attributes.  This step is necessary
	// due to the fact that each object references two other objects  therefore at the
	// time of defining name value pairs for each pit and mancala the object must already
	// exist.  If not done this way some objects will have undefined properties.

	var bluePit1 = new pitObject();
	var bluePit2 = new pitObject();
	var bluePit3 = new pitObject();
	var bluePit4 = new pitObject();
	var bluePit5 = new pitObject();
	var bluePit6 = new pitObject();
	var blueMancala = new pitObject();
 	var redPit1 = new pitObject();
	var redPit2 = new pitObject();
 	var redPit3 = new pitObject();
	var redPit4 = new pitObject();
	var redPit5 = new pitObject();
	var redPit6 = new pitObject();
	var redMancala = new pitObject();

	//the first red pit aleady exists.  Here name value pairs are being added as
	//attributes.  Firstly the currentPitID is given a value that matche the html
	//ID such that it can be easily linked back during stuly and update operations
	redPit1.currentPitID = "#redPit1";

	//nextPitID is defined so that the javascript can loop trough in the appropriate order.
	//a simply array is not used, because in the case of a games like mancala, the loop has to
	//return back on itself.  defining a nextPitID achieves the desired cyclical loop.
	//The user experiences this property as the values get distributed in a
	//counter-clockwise direction on screen.
	redPit1.nextPitID = redPit2;

	//similar to the nextPitID, each pit must be paired with a specific pit of the opposite
	//player.  The user experiences this property when a value is removed from a pit
	//which lies 'opposite the table' so to speak.
	redPit1.stealPitID = bluePit6;

	//this property is used to evaluate which pits may be chosen by the user as well as
	//whether a steal condition is met.  Also this property determins how far values
	//will get ditributed and of course the check to determine if the game has ended
	//and who the winner is.
    redPit1.currentPitScore = 4;

    //This property is used to control the turnMarker and some prompts as well as
    //determines conditions during distribution of points.
    redPit1.color = "Red";

	//all red pits and blue pits are defined and used in the same way as redPit1.
	redPit2.currentPitID = "#redPit2";
	redPit2.nextPitID = redPit3;
	redPit2.stealPitID = bluePit5;
    redPit2.currentPitScore = 4;
	redPit2.color = "Red";

	redPit3.currentPitID = "#redPit3";
	redPit3.nextPitID = redPit4;
	redPit3.stealPitID = bluePit4;
    redPit3.currentPitScore = 4;
	redPit3.color = "Red";

	redPit4.currentPitID = "#redPit4";
	redPit4.nextPitID = redPit5;
	redPit4.stealPitID = bluePit3;
    redPit4.currentPitScore = 4;
	redPit4.color = "Red";

	redPit5.currentPitID = "#redPit5";
	redPit5.nextPitID = redPit6;
	redPit5.stealPitID = bluePit2;
    redPit5.currentPitScore = 4;
	redPit5.color = "Red";

	// both the red pit 6 and blue pit 6 define their mancala as the next pit
	// this property gets changed depending on the which players turn it is.
	redPit6.currentPitID = "#redPit6";
	redPit6.nextPitID = redMancala;
	redPit6.stealPitID = bluePit1;
    redPit6.currentPitScore = 4;
	redPit6.color = "Red";

	//mancalas are similar to other pits except that they start as zero points
	//and they act as a bank for each players running score.
	//the steal condition does not apply to mancalas.
	redMancala.currentPitID = "#redMancala";
	redMancala.nextPitID = bluePit1;
	redMancala.stealPitID = "";
    redMancala.currentPitScore = 0;
	redMancala.color = "Red";

	bluePit1.currentPitID = "#bluePit1";
	bluePit1.nextPitID = bluePit2;
	bluePit1.stealPitID = redPit6;
    bluePit1.currentPitScore = 4;
	bluePit1.color = "Blue";

	bluePit2.currentPitID = "#bluePit2";
	bluePit2.nextPitID = bluePit3;
	bluePit2.stealPitID = redPit5;
    bluePit2.currentPitScore = 4;
	bluePit2.color = "Blue";

	bluePit3.currentPitID = "#bluePit3";
	bluePit3.nextPitID = bluePit4;
	bluePit3.stealPitID = redPit4;
    bluePit3.currentPitScore = 4;
	bluePit3.color = "Blue";

	bluePit4.currentPitID = "#bluePit4";
	bluePit4.nextPitID = bluePit5;
	bluePit4.stealPitID = redPit3;
    bluePit4.currentPitScore = 4;
	bluePit4.color = "Blue";

	bluePit5.currentPitID = "#bluePit5";
	bluePit5.nextPitID = bluePit6;
	bluePit5.stealPitID = redPit2;
    bluePit5.currentPitScore = 4;
	bluePit5.color = "Blue";

	bluePit6.currentPitID = "#bluePit6";
	bluePit6.nextPitID = blueMancala;
	bluePit6.stealPitID = redPit1;
    bluePit6.currentPitScore = 4;
	bluePit6.color = "Blue";

	blueMancala.currentPitID = "#blueMancala";
	blueMancala.nextPitID = redPit1;
	blueMancala.stealPitID = "";
    blueMancala.currentPitScore = 0;
	blueMancala.color = "Blue";

	//Although the currentPitID acts as a link from the object back to the div,
	//the named pitArray acts as a link from the div to the object.  This array
	//simplifies the use of parameters in the core functionality.
	pitArray = {
		redPit1: redPit1,
		redPit2: redPit2,
		redPit3: redPit3,
		redPit4: redPit4,
		redPit5: redPit5,
	    redPit6: redPit6,
	    redMancala: redMancala,
		bluePit1: bluePit1,
		bluePit2: bluePit2,
		bluePit3: bluePit3,
		bluePit4: bluePit4,
		bluePit5: bluePit5,
	    bluePit6: bluePit6,
	    blueMancala: blueMancala
	};

//CORE FUNCTIONALITY:

	//This function updates all div to show their current amount of points as per
	//each object.  This will run after every move.
	var updateAll = function() {
		$('#redPit1').html(redPit1.currentPitScore);
		$('#redPit2').html(redPit2.currentPitScore);
		$('#redPit3').html(redPit3.currentPitScore);
		$('#redPit4').html(redPit4.currentPitScore);
		$('#redPit5').html(redPit5.currentPitScore);
		$('#redPit6').html(redPit6.currentPitScore);
		$('#redMancala').html(redMancala.currentPitScore);
		$('#bluePit1').html(bluePit1.currentPitScore);
		$('#bluePit2').html(bluePit2.currentPitScore);
		$('#bluePit3').html(bluePit3.currentPitScore);
		$('#bluePit4').html(bluePit4.currentPitScore);
		$('#bluePit5').html(bluePit5.currentPitScore);
		$('#bluePit6').html(bluePit6.currentPitScore);
		$('#blueMancala').html(blueMancala.currentPitScore);
	};

	//Checks to see if game is over and declares winner.
	//This will run after every move.
	var checkVictory = function() {
		//if either player has no available moves (meaning a zero in all pits) the game ends
		//checking for that condition
		var totalBluePits = bluePit1.currentPitScore + bluePit2.currentPitScore + bluePit3.currentPitScore + bluePit4.currentPitScore + bluePit5.currentPitScore + bluePit6.currentPitScore;
		var totalRedPits = redPit1.currentPitScore + redPit2.currentPitScore + redPit3.currentPitScore + redPit4.currentPitScore + redPit5.currentPitScore + redPit6.currentPitScore;
			if (totalBluePits === 0 || totalRedPits === 0){
				//if the game is over, total the points for both players.
				//points that were still in pits get added to that score that player has.
				redMancala.currentScore = redMancala.currentScore + totalRedPits;
				blueMancala.currentScore = blueMancala.currentScore + totalBluePits;
					//any lingering on screen notes no longer make sense whent the game ends
					//so they are cleared.
					$('#notifications').html("");
					$('#noteArea2').html("");
					//determines which player has the better score and reports that on screen
					if ((redMancala.currentPitScore + totalRedPits) > (blueMancala.currentPitScore + totalBluePits)) {
							$('#turnMarker').html("RED WINS!");
							$('#turnMarker').css("color", "darkred");
					} else if ((redMancala.currentPitScore + totalRedPits) < (blueMancala.currentPitScore + totalBluePits)){
							$('#turnMarker').html("BLUE WINS!");
							$('#turnMarker').css("color", "darkblue");
					} else {
							$('#turnMarker').html("Tie Game!");
							$('#turnMarker').css("color", "black"); }

			}
	};

	//starts game by setting the turn marker to indicate it is blue players turn.
	$('#turnMarker').click( function() {
		if ($('#turnMarker').html() === "Let's Play") {
			$('#turnMarker').html("Blue's Turn");
			$('#turnMarker').css("color", "darkblue");
		}
	});

	//controls scenario of two human players or player vs computer
	$('#scenario').click( function() {
		if ($('#scenario').html() === "Blue(Human) vs Red(Computer)") {
			$('#scenario').html("Blue(Human) vs Red(Human)");
		} else {
			$('#scenario').html("Blue(Human) vs Red(Computer)");
		}
	});



	//pointMove function see also POINT MOVE PARAMETERS
	//p and m passed into this function differently if a blue pit (div) or a red pit (div) is clicked.
	var pointMove = function (p, m) {
		//call on array to derive and define object based on clicked pit (div)
		var selectedPit = pitArray[p];
		//temporarily show the user which pit they clicked on:
		$(selectedPit.currentPitID).css("border-color", "yellow");
		//distribution only happens if a pit currently contains points
		if (selectedPit.currentPitScore > 0){
			//targetPit acts like a cursor as the distribution loop is performed.
			var targetPit = selectedPit;
			//distribution loops as many times as the number of points
			//the selected pit started with
			for (i=0; i<(selectedPit.currentPitScore); i++) {
				//the code should start adding point to the NEXT pit
				targetPit = targetPit.nextPitID;
				//this code added so that the user can better witness the distribution
				$(targetPit.currentPitID).fadeOut(500);
				$(targetPit.currentPitID).fadeIn(1000);
				//each pit that gets looped to should get a point added to its current score
				targetPit.currentPitScore = targetPit.currentPitScore + 1;
				}
			//after the looping is done the points from the pit the user clicked on should be flushed
			selectedPit.currentPitScore = 0;
		}

		//immediately after distributing points the last pit to receive +1 points may or may not steal under these conditions:
		//to steal the last pit must be the same color as the player who clicked it
		//to steal the last pit must have ended up with only 1 point in it
		//points can only be stolen from the pit across the table from the last pit

		//stealPit is defined as the pit across from the last targeted pit
		var stealPit = targetPit.stealPitID;
		//checking for the three steal conditions:
		if (stealPit.currentPitScore > 0 && targetPit.color === selectedPit.color && targetPit.currentPitScore === 1) {
				//when stealing the points from the opponents pit get added to the mancala of the player whose turn it is.
				//here m is parameter representing the mancala of the color of the player who made the pit selection
				m.currentPitScore = m.currentPitScore + stealPit.currentPitScore;
				//this code added so that the user can better witness the distribution
				$(stealPit.currentPitID).fadeOut(1000);
				$(stealPit.currentPitID).fadeIn(1000);
			//alerting players on screen that the steal event was successful (with proper grammar)
			if (stealPit.currentPitScore === 1){
				$('#noteArea2').html(selectedPit.color + " Stole </br>" + stealPit.currentPitScore + " Point!");
			}
			else {
				$('#noteArea2').html(selectedPit.color + " Stole </br>" + stealPit.currentPitScore + " Points!");
			}
			//when a steal even happens that last point gets added to the mancala as well.
			//for example red steals 4 points.  Those 4 points from the blue side were already added
			//but the 1 point that landed in the right pit should also be added to the red mancala.
			m.currentPitScore = m.currentPitScore + 1;
			//both the last target pit and the steal pit are flushed to zero points.
			targetPit.currentPitScore = 0;
			stealPit.currentPitScore = 0;
		}

		//updates the mancala board to reflect changes to point values stored in objects
		updateAll();

		//another possibility on a single move is that if the last pit were that players mancala that player takes another turn.
		//checking for the extra turn condition
		if (targetPit === m){
			//alerting players on screen if an extra turn is to be taken
			$('#notifications').html(selectedPit.color + " Goes Again!");

			//triggers another turn for the red computer
			if ( ($('#turnMarker').html() === "Red's Turn") ){
				setTimeout(function() {
					redChoiceComputer();
					}, 2000);
			}

		}
		//handling turn marker based on whether the extra turn condition happens or not
		else if (selectedPit.color ===  "Red"){
			$('#turnMarker').html("Blue's Turn");
			$('#turnMarker').css("color", "darkblue");
		}
		else if (selectedPit.color ===  "Blue"){
			$('#turnMarker').html("Red's Turn");
			$('#turnMarker').css("color", "darkred");
		}

		//Checks for victory
		checkVictory();

		//this triggers red to try taking another turn if red is the computer
		if ($('#scenario').html() === "Blue(Human) vs Red(Computer)") {

			setTimeout(function() {
				$('.redPit').css("border-color", "white");
				}, 2000);
		}
	};

	//Controls the user experience for red player
	$('.redPit').mouseover( function() {
		//only activates while it is red players turn and only activates for clickable pits
		if ( ($('#turnMarker').html() === "Red's Turn") && ($(this).html()>0) ){
			//clears any notifications from the last turn
			$('#notifications').html("");
			$('#noteArea2').html("");
			//indicates which pit the player is floating the mouse over
			$(this).css("border-color", "darkred");
		}
	});

	//releases the float over indication
	$('.redPit').mouseout( function() {
		$(this).css("border-color", "white");
	});

	//POINT MOVE PARAMETERS see also pointMove function.
	$('.redPit').click( function() {
		//only activates while it is red players turn and only activates for clickable pits
		if ( ($('#turnMarker').html() === "Red's Turn") && ($(this).html()>0) ){
			//this variable is parameter for the pointMove function.
			//associates the div that was clicked on to the object
			var pitID = $(this).attr('id');
			//defines the mancala that this player is targeting as a point bank
			var mancala = redMancala;
			//during red players turn the distribution should skip the blue mancala
			//changing this property makes it so blue mancala will be ignored in the loop
			bluePit6.nextPitID = redPit1;
			//since the symmetrical action of skipping the opponents mancala is also done
			//during the blue players turn, this will restore the use of the red mancala
			redPit6.nextPitID = redMancala;
			//call on point move function with the two paramenters
		    pointMove(pitID, mancala);
		}
	});

	//symetrical to red mousover function
	$('.bluePit').mouseover( function() {
		if ( ($('#turnMarker').html() === "Blue's Turn") && ($(this).html()>0) ){
			$('#notifications').html("");
			$('#noteArea2').html("");
			$(this).css("border-color", "darkblue");
		}
	});

	//symetrical to red mousout function
	$('.bluePit').mouseout( function() {
		$(this).css("border-color", "white");
	});

	//symetrical to red click function with the exception of calling the computer to play for red
	$('.bluePit').click( function() {
		if ( ($('#turnMarker').html() === "Blue's Turn") && ($(this).html()>0) ){
			var pitID = $(this).attr('id');
			var mancala = blueMancala;
			redPit6.nextPitID = bluePit1;
			bluePit6.nextPitID = blueMancala;
		    pointMove(pitID, mancala);
		}
		//this triggers the computer to respond as red if playing against computer
		if ($('#scenario').html() === "Blue(Human) vs Red(Computer)") {
			redChoiceComputer();
			}
	});

	//This is only used if computer is playing.
	//Computer always plays red if playing.
	//Randomly chooses an available red pit
	var redChoiceComputer = function () {
		//this will make it so function only runs on Reds turn (computer)
		if ( ($('#turnMarker').html() === "Red's Turn") ){

			//array to available to hold possible choices for red computer
			var computerChoiceArray = [];
			// red may only choose from pits that currently have a score
			// this adds only those proper pits to choose from into the computer choice array
			if (redPit1.currentPitScore > 0) {computerChoiceArray.push("redPit1");}
			if (redPit2.currentPitScore > 0) {computerChoiceArray.push("redPit2");}
			if (redPit3.currentPitScore > 0) {computerChoiceArray.push("redPit3");}
			if (redPit4.currentPitScore > 0) {computerChoiceArray.push("redPit4");}
			if (redPit5.currentPitScore > 0) {computerChoiceArray.push("redPit5");}
			if (redPit6.currentPitScore > 0) {computerChoiceArray.push("redPit6");}

			//rather than "$(this).attr('id')" computer should pass value randomly chosen from it's own special array
  		  	var roll = Math.floor(Math.random() * computerChoiceArray.length);
			//using that random choice as a parameter for pointMove function
			var pitID = computerChoiceArray[roll];
			//red should pass redmancala as parameter
			var mancala = redMancala;
			//see click event for red pit for explanation:
			bluePit6.nextPitID = redPit1;
			redPit6.nextPitID = redMancala;
			//call on function to distribute points as if red player picked a pit.
			//A timeout function is used here to give the illusion that the computer is an opponent thinking about a move.
			//So the push to the move function is delayed 4.5 seconds
			setTimeout(function() {
				pointMove(pitID, mancala);
				}, 4500);

			//clearing the onscreen notification
			$('#noteArea2').html("");
		}
	};

});

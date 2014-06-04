var Cell = {
  isOn : function() {
    return $( this ).hasClass( "on" );
  },
  isOff : function() {
    return !this.isOn();
  },
  flip : function() {
    if( this.isOn() ) {
      $( this ).removeClass( "on" ).addClass( "off" );
    } else {
      $( this ).removeClass( "off" ).addClass( "on" );
    }
  },
  randomStatus : function() {
    if( Math.round( Math.random() ) == 1 ) {
      return "off";
    }

    return "on";
  },
  flipToRandom : function() {
    $( this ).removeClass( "on" ).removeClass( "off" ).addClass( this.randomStatus() );
  }
}

window.LightsOut = {};

LightsOut.start = function() {
  var gameOverDiv  = $( "#game_over" ),
      resetButton  = $( "#reset" ),
      movesText    = $( "#moves_text" ),
      solvedText   = $( "#solved_text" ),
      cellSelector = ".cell",
      solved       = false;

  resetButton.click( function() {
    movesText.html( "0" );
    gameOverDiv.hide( "slow" );
    solved = false;

    $( cellSelector ).each( function() {
      $.extend( this, Cell );
      this.flipToRandom();
    } );
  } );

  $( cellSelector ).click( function() {
    if( solved ) { return; }

    var element = $( this ),
        id      = element.attr( "id" ),
        row     = parseInt( id.substring( 1, 2 ) ),
        col     = parseInt( id.substring( 3, 4 ) ),
        moves   = parseInt( movesText.html() );

    movesText.html( moves + 1 );

    var points = new Array();
    points.push( [row, col] );

    for( i = -1; i < 2; i++ ) {
      points.push( [row + i, col] );
      points.push( [row, col + i] );
    }

    for( i = 0; i < points.length; i++ ) {
      var rowCol  = points[ i ],
          r       = rowCol[ 0 ],
          c       = rowCol[ 1 ],
          element = document.getElementById( "r" + r + "c" + c );

      if( element ) {
        element.flip();
      }
    }

    console.log($(cellSelector).filter("on"));
    if( $( cellSelector ).filter( ".on" ).length == 0 ) {
      solved = true;
      gameOverDiv.show( "slow" );
      solvedText.html( parseInt( solvedText.html() ) + 1 );
    }
  } );

  gameOverDiv.hide();
  resetButton.click();
}

"use strict";
/**
 * rotational-puzzle.js
 *
 * JS for the rotaional puzzle
 * Created by Benjamin Friedman Wilson
 # Created on Dec. 16th, 2021
 */
((_window) => {

  /* SFC32 (Simple Fast Counter PRNG), a variant at least */
  function sfc32(a, b, c, d) {
    return function() {
      // right shift assign all values
      a >>>= 0; b >>>= 0; c >>>= 0; d >>>= 0;
      let t = (a + b) | 0;
      a = b ^ b >>> 9;
      b = c + (c << 3) | 0;
      c = c << 21 | c >>> 11;
      d = d + 1 | 0;
      t = t + d | 0;
      c = c + t | 0;
      return (t >>> 0) / 4294967296;
    }
  }

  // prep our PRNG with an arbitrary seed to test, will be overriden in most cases
  let sfc32PRNG = sfc32(4013,139,137,919);

  let defaultPuzzleState = {
    rotation: 0,
    rotationIndex: 0,
    positionX: 0,
    positionY: 0,
    maxLength: 0,
    pathPopulation: 5,
    difficulty: 20,
  };

  // puzzle instance
  let Puzzle = {

    // reset the puzzle state
    reset: function() {
      Object.assign(Puzzle, defaultPuzzleState);
    },

    /* Puzzle.createBlock
     *
     * Creates a block for the puzzle internally for a given type
     * returns an object of type & block
     */
    createBlock: function(type) {
      if(type && type == 3) {
        // player block
        type = 3;

      } else if(type && type == 4) {
        // goal block
        type = 4;

      } else {
        if (Math.floor(sfc32PRNG() * Puzzle.pathPopulation) == 0) {
          // barrier
          type = 0; //barrier

        } else {
          // open space, a path
          type = 1; //path

        }
      }
      return type;
    },

    renderBlockType: function(x,y,t) {
      let cls = "";
      if(t == 0) {
        cls = "barrier";
      } else if(t == 1) {
        cls = "path";
      } else if(t == 3) {
        cls = "player";
      } else if(t == 4) {
        cls = "victory";
      } else {
        console.error("renderBlockType received undefined type " + t);
      }
      return "<div id='pos-" + x + "-" + y + "' class='block " + cls + "'></div>";
    },

    /*
     * Puzzle.rotate
     *
     * Takes degrees, rotates the puzzle accordingly
     */
    rotate: function(deg) {
      Puzzle.rotation+=deg;
      let field = document.getElementsByClassName("field")[0];
      field.style = "width:" + (30 * Puzzle.maxLength) + "px;transform: rotate("+Puzzle.rotation+"deg);";

      // recalculate how to apply gravity to the player
      Puzzle.respectGravity();

    },

    // Rotate the puzzle counter clockwise
    rotateCounterClockwise: function() {
      Puzzle.rotationIndex = Puzzle.rotationIndex >= 3 ? 0 : Puzzle.rotationIndex+1;
      Puzzle.rotate(90);
    },

    // Rotate the puzzle clock wise
    rotateClockwise: function() {
      Puzzle.rotationIndex = Puzzle.rotationIndex <= 0 ? 3 : Puzzle.rotationIndex-1;
      Puzzle.rotate(-90);
    },

    // Animate movement of the player
    animateMove: function() {
      let x = Puzzle.positionX;
      let y = Puzzle.positionY;

      let translateX = 30 * x;
      let translateY = 30 * y;

      if(_window.mobilecheck()) {
        // 2x
        translateY-=(y * 2);
      } else {
        // 0.4
        translateY-=(y * 0.4);
      }

      const transform = "transform:translate("+translateX+"px, "+translateY+"px)";
      const player = document.getElementsByClassName("player")[0];

      setTimeout(function() {
        player.style = transform;
      }, 300);

    },

    // Determine whether a down move is valid from this point
    canMoveDown: function() {
      let x = Puzzle.positionX;
      let y = Puzzle.positionY;
      return (Puzzle.grid[y+1] !== undefined && Puzzle.grid[y+1][x] !== 0);
    },

    // Determine whether an up move is valid from this point
    canMoveUp: function() {
      let x = Puzzle.positionX;
      let y = Puzzle.positionY;
      return (Puzzle.grid[y-1] !== undefined && Puzzle.grid[y-1][x] !== 0);
    },

    // Determine whether a left move is valid from this point
    canMoveLeft: function() {
      let x = Puzzle.positionX;
      let y = Puzzle.positionY;
      return (Puzzle.grid[y][x-1] !== undefined && Puzzle.grid[y][x-1] !== 0);
    },

    // Determine whether a right move is valid from this point
    canMoveRight: function() {
      let x = Puzzle.positionX;
      let y = Puzzle.positionY;
      return (Puzzle.grid[y][x+1] !== undefined && Puzzle.grid[y][x+1] !== 0);
    },

    // Move down one position
    moveDown: function() {
      Puzzle.positionY++;
    },

    // Move up one position
    moveUp: function() {
      Puzzle.positionY--;
    },

    // Move left one position
    moveLeft: function() {
      Puzzle.positionX--;
    },

    // Move right one position
    moveRight: function() {
      Puzzle.positionX++;
    },

    /**
     * Forces the player block to respect gravity given the current rotational position
     * Settling at the lowest point
     */
    respectGravity: function() {
      // get current pos
      let currentX = Puzzle.positionX;
      let currentY = Puzzle.positionY;

      if(Puzzle.rotationIndex == 0) {
        while(Puzzle.canMoveDown()) {
          Puzzle.moveDown();
        }

      } else if(Puzzle.rotationIndex == 1) {
        // normal along x
        while(Puzzle.canMoveRight()) {
          Puzzle.moveRight();
        }

      } else if(Puzzle.rotationIndex == 2) {
        // reverse along y
        while(Puzzle.canMoveUp()) {
          Puzzle.moveUp();
        }

      } else if(Puzzle.rotationIndex == 3) {
        // reverse along x
        while(Puzzle.canMoveLeft()) {
          Puzzle.moveLeft();
        }
      }

      // run the final block action
      Puzzle.runBlockAction();

      // animate the final movement
      Puzzle.animateMove();
    },

    // report victory for the player
    victory: function() {
      let h = "<div class='victory'>Puzzle Completed ✔️</div>";
      let field = document.getElementsByClassName("field")[0];
      field.style = "";
      field.innerHTML = h;
    },

    // Run the action of this block, where only the victory block triggers an action
    runBlockAction: function() {
      let block = Puzzle.grid[Puzzle.positionY][Puzzle.positionX];
      if(block === 0) {
        // barrier
      } else if(block === 1) {
        // path
      } else if(block == 3) {
        // player
      } else if(block == 4) {
        // victory!
        setTimeout(function() {
          //location.reload();
          Puzzle.victory();
        }, 1000);
      }
    },

    // builds a new puzzle w/ the given dimension for both sides
    build: function(dimen, diff, seed) {

      // reset puzzle to start
      Puzzle.reset();

      // setup with a square of 'side' elements
      let odds = (dimen ^ 2) * 2;

      // set params
      Puzzle.maxLength = dimen; // set puzzle dimens
      Puzzle.grid = []; // init the grid
      Puzzle.difficulty = diff; // set difficulty
      Puzzle.seed = seed; // also add 128 bit seed
      // update the PRNG with a pre-built seed.
      sfc32PRNG = sfc32(seed[0],seed[1],seed[2],seed[3]);

      // construct the grid of objects first
      for(let x = 0; x < dimen; x++) {
        Puzzle.grid[x] = [];
        for(let y = 0; y < dimen; y++) {
          let typ;
          if(x == 0 && y == 0) {
            // player to start
            typ = Puzzle.createBlock(3);
          } else {
            // barrier
            typ = Puzzle.createBlock();
          }
          Puzzle.grid[x][y] = typ;
        }
      }

      // use BFS to place a sufficiently difficult end point
      if(!Puzzle.generateSolution()) {
        // reload the page to regenerate the puzzle
        alert("No solution in this puzzle for difficulty " + Puzzle.difficulty);
        //location.reload();
      }

      // build grid for placement
      let html = "";
      for(let x = 0; x < dimen; x++) {
        html+="<div class='row'>";
        for(let y = 0; y < dimen; y++) {
          let t = Puzzle.grid[x][y];
          html+=Puzzle.renderBlockType(x,y,t);
        }
        html+="</div>";
      }

      // get and attach the puzzle to the field
      let field = document.getElementsByClassName("field")[0];
      field.style = "width:" + (30 * Puzzle.maxLength) + "px;";
      field.innerHTML = html;

      // initialize 'swipe' detection for mobile devices
      Puzzle.detectSwipe('rotational-puzzle', function(element, d) {
        if(d === 'l') {
          Puzzle.rotateCounterClockwise();
        } else if(d === 'r') {
          Puzzle.rotateClockwise();
        }
      });

      // set interval for block updates post puzzle creation
      setTimeout(function () {
        Puzzle.respectGravity();
      }, 300);

    },


    // Generate a solution of sufficient difficulty for this puzzle
    generateSolution: function() {

      // use this puzzle's difficulty to determine what we're solving for
      let d = Puzzle.difficulty;

      let initialX = Puzzle.positionX;
      let initialY = Puzzle.positionY;

      let oldX = initialX;
      let oldY = initialY;

      while(initialX < Puzzle.maxLength && Puzzle.grid[initialX+1][initialY] != 0) {
        initialX++;
      }

      // list of already visited positions as key/value pairs
      let visited = {};
      // queue of positions to check
      let queue = [{
        x: initialX,
        y: initialY,
        d: d,
        r: 1,
        p: ""
      }];

      let count = 0;

      while(queue.length > 0) {
        count++;

        // get next possible solution position
        let sol = queue[0];
        queue = queue.slice(1);

        if(sol.d < 0) {
          // too far, discard
          continue;
        }

        let key = sol.x + "-" + sol.y;

        if(sol.d == 0 && visited[key] === undefined) {
          // done, set to solution and exit
          Puzzle.grid[sol.x][sol.y] = 4; // Victory block
          // replace old positions
          Puzzle.positionX = oldX;
          Puzzle.positionY = oldY;
          console.info("* Produced puzzle after " + count + " iterations!");
          // in case you want the solution...
          //console.info(sol.p);
          return true;

        }

        // add to visited
        if(visited[key] === undefined) {
          visited[key] = 1;
        } else {
          visited[key]+=1;
        }

        if(visited[key] > 1) {
          // skip, do not push, do not continue using this solution
          continue;

        }

        // generate 2 more solutions to try out w/ d-1
        // alternating rotation L/R and Up/Down
        let sol1 = {
          x: sol.x,
          y: sol.y,
          d: sol.d-1,
          r: sol.r == 1 ? 0 : 1,
          p: sol.p
        };

        let sol2 = Object.assign({}, sol1);

        if(sol1.r == 0) {
          // generate new solutions along Y
          sol1 = Puzzle.pushSol(0,-1,sol1);
          sol2 = Puzzle.pushSol(0,1,sol2);
        } else {
          // generate new solutions along X
          sol1 = Puzzle.pushSol(-1,0,sol1);
          sol2 = Puzzle.pushSol(1,0,sol2);
        }

        queue.push(sol1);
        queue.push(sol2);

      }

      // no solution here
      Puzzle.positionX = oldX;
      Puzzle.positionY = oldY;
      return false;

    },

    // Push solution along X and Y coordinates
    pushSol: function(x,y,sol) {
      if(x != 0) {
        while(((sol.x > 0 && x < 0) || (sol.x < Puzzle.maxLength-1 && x > 0)) && Puzzle.grid[sol.x+x][sol.y] != 0) {
          sol.x+=x;
        }
      } else {
        while(((sol.y > 0 && y < 0) || (sol.y < Puzzle.maxLength-1 && y > 0)) && Puzzle.grid[sol.x][sol.y+y] != 0) {
          sol.y+=y;
        }
      }
      sol.p+=",("+sol.x+","+sol.y+")";
      return sol;
    },

    // Handles a rotation event
    handleRotation: function(event) {
      if(event.keyCode === 37) {
        // rotate counter clockwise
        Puzzle.rotateCounterClockwise();

      } else if(event.keyCode === 39) {
        // rotate clockwise
        Puzzle.rotateClockwise();

      }
    },


    // Detect a swipe gesture on the puzzle
    detectSwipe: function(el,func) {
      let swipe_det = new Object();
      swipe_det.sX = 0; swipe_det.sY = 0; swipe_det.eX = 0; swipe_det.eY = 0;
      let min_x = 30;  //min x swipe for horizontal swipe
      let max_x = 30;  //max x difference for vertical swipe
      let min_y = 50;  //min y swipe for vertical swipe
      let max_y = 60;  //max y difference for horizontal swipe
      let direc = "";
      let ele = document.getElementById(el);
      ele.addEventListener('touchstart',function(e){
        let t = e.touches[0];
        swipe_det.sX = t.screenX;
        swipe_det.sY = t.screenY;
      },false);
      ele.addEventListener('touchmove',function(e){
        e.preventDefault();
        let t = e.touches[0];
        swipe_det.eX = t.screenX;
        swipe_det.eY = t.screenY;
      },false);
      ele.addEventListener('touchend',function(e){
        //horizontal detection
        if ((((swipe_det.eX - min_x > swipe_det.sX) || (swipe_det.eX + min_x < swipe_det.sX)) && ((swipe_det.eY < swipe_det.sY + max_y) && (swipe_det.sY > swipe_det.eY - max_y) && (swipe_det.eX > 0)))) {
          if(swipe_det.eX > swipe_det.sX) direc = "r";
          else direc = "l";
        }
        //vertical detection
        else if ((((swipe_det.eY - min_y > swipe_det.sY) || (swipe_det.eY + min_y < swipe_det.sY)) && ((swipe_det.eX < swipe_det.sX + max_x) && (swipe_det.sX > swipe_det.eX - max_x) && (swipe_det.eY > 0)))) {
          if(swipe_det.eY > swipe_det.sY) direc = "d";
          else direc = "u";
        }

        if (direc != "") {
          if(typeof func == 'function') func(el,direc);
        }
        direc = "";
        swipe_det.sX = 0; swipe_det.sY = 0; swipe_det.eX = 0; swipe_det.eY = 0;
      },false);
    }

  };

  // Setup and prepare the puzzle
  function main() {

    if (_window.addEventListener) {
      // all except IE 8 and earlier
      _window.addEventListener("keydown", Puzzle.handleRotation);

    } else if (_window.attachEvent) {
      // ie8 and earlier
      _window.attachEvent("onkeydown", Puzzle.handleRotation);

    }

    _window.mobilecheck = function() {
      let check = false;
      (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||_window.opera);
      return check;
    };

    if(_window.Puzzle) {
      console.error("Puzzle already set on the window, overriding!");
    }

    _window.Puzzle = Puzzle;

    // find a puzzle to setup
    let p = document.getElementById('rotational-puzzle');
    if (p) {
      let dimen = p.getAttribute("dimen");
      let diff = p.getAttribute("diff");
      let seed = p.getAttribute("seed");
      Puzzle.build(dimen,diff,[2524,12433,31,seed]);
    }
  }

  _window.onload = function() {
    main();
    //Puzzle.build(15,5);
  };

})(window);

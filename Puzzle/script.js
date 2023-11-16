class Box {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    } /* Se representa aqui un casilla de la cuadricula
      x representa la coordenada horizontal de la casilla en la cuadrícula.
      y representa la coordenada vertical de la casilla en la cuadrícula.*/

     // Este método verifica si la casilla actual está en la fila superior de la cuadrícula (fila con índice 0) = null.
    getTopBox() {
      if (this.y === 0) return null;
      return new Box(this.x, this.y - 1);
    }
     // Este método verifica si la casilla actual está en la columna más a la derecha de la cuadrícula (columna con índice 3). 
     //Si es así, no es posible moverse hacia la derecha,
    getRightBox() {
      if (this.x === 3) return null;
      return new Box(this.x + 1, this.y);
    }
  // Este método verifica si la casilla actual está en la fila inferior de la cuadrícula (fila con índice 3) = null
  // Si no con las mismas coordenadas x pero con y aumentado en 1
    getBottomBox() {
      if (this.y === 3) return null;
      return new Box(this.x, this.y + 1);
    }
  //este verifica si la casilla actual está en la columna más a la izquierda de la cuadrícula (columna con índice 0) = null.
  //Si no crea y devuelve una nueva instancia de Box con x disminuido en 1 y y sin cambios 
    getLeftBox() {
      if (this.x === 0) return null;
      return new Box(this.x - 1, this.y);
    }
  
    //obtener las casillas adyacentes en las cuatro direcciones posibles: arriba, derecha, abajo e izquierda. 
    //Luego, filtra cualquier casilla que sea null donde no es posible moverse en esa dirección) y devuelve solo las casillas adyacentes válidas
    getNextdoorBoxes() {
      return [
        this.getTopBox(),
        this.getRightBox(),
        this.getBottomBox(),
        this.getLeftBox()
      ].filter(box => box !== null);
    }
  
    //Este método utiliza el resultado de getNextdoorBoxes() para seleccionar aleatoriamente una de las casillas adyacentes. 
    //Primero, obtiene todas las casillas adyacentes válidas llamando a this.getNextdoorBoxes()
    getRandomNextdoorBox() {
      const nextdoorBoxes = this.getNextdoorBoxes();
      return nextdoorBoxes[Math.floor(Math.random() * nextdoorBoxes.length)];
    }
  }
  
  /**se utiliza para intercambiar dos casillas en la cuadrícula del juego. Recibe la cuadrícula (grid) y dos objetos Box (box1 y box2) 
   * y se encarga de intercambiar los valores en la cuadrícula para representar el movimiento de una casilla a otra. */
  const swapBoxes = (grid, box1, box2) => {
    const temp = grid[box1.y][box1.x];
    grid[box1.y][box1.x] = grid[box2.y][box2.x];
    grid[box2.y][box2.x] = temp;
  };
  
  const isSolved = grid => {
    return (
      grid[0][0] === 1 &&
      grid[0][1] === 2 &&
      grid[0][2] === 3 &&
      grid[0][3] === 4 &&
      grid[1][0] === 5 &&
      grid[1][1] === 6 &&
      grid[1][2] === 7 &&
      grid[1][3] === 8 &&
      grid[2][0] === 9 &&
      grid[2][1] === 10 &&
      grid[2][2] === 11 &&
      grid[2][3] === 12 &&
      grid[3][0] === 13 &&
      grid[3][1] === 14 &&
      grid[3][2] === 15 &&
      grid[3][3] === 0
    ); // Comprueba si la cuadrícula del juego está resuelta (en el estado ganador).
  };
      // Se crea una cuadrícula inicial resuelta.
  const getRandomGrid = () => {
    let grid = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 0]];

    // Baraja la cuadrícula moviendo la casilla vacía 1000 veces.
    let blankBox = new Box(3, 3); //Esto representa la casilla vacía en la cuadrícula inicial.
    for (let i = 0; i < 1000; i++) {
      const randomNextdoorBox = blankBox.getRandomNextdoorBox(); //para obtener una casilla adyacente válida de manera aleatoria.
      swapBoxes(grid, blankBox, randomNextdoorBox); //swapBoxes para intercambiar la casilla vacía (blankBox) con la casilla adyacente
      blankBox = randomNextdoorBox; //se actualiza para representar la nueva ubicación de la casilla vacía, que ahora es la casilla adyacente seleccionada.
    }
    // Si la cuadrícula está resuelta, la baraja de nuevo.
    if (isSolved(grid)) return getRandomGrid();
    return grid;   // Devuelve la cuadrícula barajada.
  };
  
  class State {
    constructor(grid, move, time, status) {
      this.grid = grid; //Una matriz bidimensional que representa la cuadrícula del juego en ese estado. 
      this.move = move; //Un número entero que representa la cantidad de movimientos realizados en el juego hasta el momento.
      this.time = time; //Un número entero que representa el tiempo transcurrido en el juego en segundos.
      this.status = status; //Una cadena que representa el estado del juego, que puede ser "ready" (listo)
    }
  
    //ready crea y devuelve una instancia de la clase State que representa el estado inicial del juego cuando está "listo" para comenzar. 
    static ready() {
      return new State(
        [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]],
        0,
        0,
        "ready"
      );
    } //La cuadrícula se inicializa con todos los valores en 0 y tiempo y estado se establecen en 0 y ready
  
    static start() {
      return new State(getRandomGrid(), 0, 0, "playing");
    }   // Representa el estado del juego, con la cuadrícula actual, el número de movimientos, el tiempo y el estado del juego.
  }
  
  //es la encargada de controlar la lógica del juego y la interfaz de usuario del rompecabezas deslizante.
  class Game { 
    constructor(state) {
      this.state = state; // Almacena una instancia de la clase State, que representa el estado actual del juego, incluyendo la cuadrícula, el número de movimientos, el tiempo y el estado del juego.
      this.tickId = null; //Un identificador utilizado para controlar el temporizador del juego.
      this.tick = this.tick.bind(this); //Una función que se utiliza para actualizar el tiempo transcurrido en el juego. Se llama en intervalos regulares para aumentar el tiempo en 1 segundo.
      this.render(); //se encarga de actualizar la interfaz de usuario del juego con la información del estado actual del juego.
      this.handleClickBox = this.handleClickBox.bind(this); //Una función que maneja el evento de clic en una casilla del juego.
    }
  
    //se utiliza para crear una instancia de la clase Game con un estado inicial "listo" para comenzar el juego.
    //Puede regresar el juego a su estado inicial
    static ready() {
      return new Game(State.ready());
    }
  
    tick() {
      this.setState({ time: this.state.time + 1 });
    }   // Incrementa el tiempo del juego en cada tick.
  
    setState(newState) {
      this.state = { ...this.state, ...newState };
      this.render();
    }   // Actualiza el estado del juego y vuelve a renderizar.
  
    /**se obtienen las casillas adyacentes a la casilla en la que se hizo clic utilizando el método getNextdoorBoxes() de la casilla box. 
     * Estas casillas adyacentes se almacenan en un array llamado nextdoorBoxes. */
    handleClickBox(box) {
      return function() {
        const nextdoorBoxes = box.getNextdoorBoxes();
        //Luego, se busca la casilla vacía entre las casillas adyacentes. 
        const blankBox = nextdoorBoxes.find(
          nextdoorBox => this.state.grid[nextdoorBox.y][nextdoorBox.x] === 0
        ); //(this.state.grid) sea igual a 0 (casilla vacía). Si es asi, se almacena en la variable blankBox.

        /**Luego se crea una copia de la cuadrícula actual (this.state.grid) en una nueva variable newGrid. 
         * Esta copia se utiliza para realizar el movimiento sin modificar directamente la cuadrícula del estado actual. */
        if (blankBox) {
          const newGrid = [...this.state.grid];
          swapBoxes(newGrid, box, blankBox); //para intercambiar la casilla en la que se hizo clic (box) con la casilla vacía (blankBox) en la cuadrícula newGrid
          if (isSolved(newGrid)) {
            clearInterval(this.tickId);
            this.setState({
              status: "won",
              grid: newGrid,
              move: this.state.move + 1
            }); // se verifica si la cuadrícula después del movimiento está en el estado resuelto utilizando la función isSolved(newGrid). 
            //Si es así, significa que el jugador ha ganado el juego.
          } else {
            this.setState({
              grid: newGrid,
              move: this.state.move + 1
            }); //Si la cuadrícula no está en el estado resuelto después del movimiento, se actualiza el estado del juego con this.setState para reflejar el nuevo estado de la cuadrícula y aumentar el número de movimientos en 1.
          }
        }
      }.bind(this);
    }   // Maneja el evento de hacer clic en una casilla.
  
    render() {       // (Código para renderizar la interfaz de usuario del juego)
      const { grid, move, time, status } = this.state;
  
      // Render grid
      const newGrid = document.createElement("div");
      newGrid.className = "grid";
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          const button = document.createElement("button");
  
          if (status === "playing") {
            button.addEventListener("click", this.handleClickBox(new Box(j, i)));
          }
  
          button.textContent = grid[i][j] === 0 ? "" : grid[i][j].toString();
          newGrid.appendChild(button);
        }
      }
      document.querySelector(".grid").replaceWith(newGrid);
  
      // Render button
      const newButton = document.createElement("button");
      if (status === "ready") newButton.textContent = "Play";
      if (status === "playing") newButton.textContent = "Reset";
      if (status === "won") newButton.textContent = "Play";
      newButton.addEventListener("click", () => {
        clearInterval(this.tickId);
        this.tickId = setInterval(this.tick, 1000);
        this.setState(State.start());
      });
      document.querySelector(".footer button").replaceWith(newButton);
  
      // Render move
      document.getElementById("move").textContent = `Move: ${move}`;
  
      // Render time
      document.getElementById("time").textContent = `Time: ${time}`;
  
      if (status === "won") {
        document.querySelector(".message").textContent = "You win!";
      } else {
        document.querySelector(".message").textContent = "";
      }
    }
  }
  
  const GAME = Game.ready();
  // Crea una instancia del juego en el estado inicial "listo".

  
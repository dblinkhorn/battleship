// constructs instances of new ships with name/length of ship as input
const ShipFactory = (shipName, shipLength) => ({
  shipName: `${shipName}`,
  hitpoints: Array(shipLength).fill(0),
  sunk: false,
  coords: [],
  // records position of ship hit
  hit(position) {
    return this.hitpoints[position] = 1;
  },
  // determines whether all of a ship's points have been hit
  isSunk(hitpoints) {
    if (this.hitpoints.every(hit => hit === 1)) {
      this.sunk = true;
      return true;
    } return false;
  }
});

// tests equality of two objects based on the values of
// their properties rather than memory location, as is default
function deepEqual(x, y) {
  const ok = Object.keys, tx = typeof x, ty = typeof y;
  return x && y && tx === 'object' && tx === ty ? (
    ok(x).length === ok(y).length &&
      ok(x).every(key => deepEqual(x[key], y[key]))
  ) : (x === y);
}

// creates gameboard instances one for each player
// stores ship names and coordinates of locations on board
const gameboard = () => ({
  // adds a new ship to board & sets coords
  createShip(ship, length, shipCoords) {
    let newShip = ShipFactory(ship, length);
    newShip.coords.push(shipCoords)
    this.ships.push(newShip)
    return newShip;
  },
  // determines whether enemy shot is a hit and initiates
  // hit method to change hitpoint of struck ship

  //
  // need to get below loop to STOP once a hit is found OR push coords to misses array
  //
  receiveAttack(coords) {
    console.log(this.ships);
    for (let ship = 0; ship < this.ships.length; ship++) {
      console.log(this.ships[ship]);
      for (let shipCoords = 0; shipCoords < this.ships[ship].coords.length; shipCoords++) {
        console.log(this.ships[ship].coords[shipCoords]);
        for (let coord = 0; coord < this.ships[ship].coords[shipCoords].length; coord++) {
          console.log(this.ships[ship].coords[shipCoords][coord])
          if (deepEqual(coords, this.ships[ship].coords[shipCoords][coord])) {
            console.log('true');
            return true;
          }
        }
      }
    }
  },
  ships: [],
  misses: [],
})

module.exports = { ShipFactory, gameboard }
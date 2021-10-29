const battleship = require('../src/index');

// tests that ShipFactory creates ship object with correct keys/values
test('ship object should have correct number of hitpoints (array length)', () => {
  expect(battleship.ShipFactory('Carrier', 5)).toMatchObject({
    shipName: 'Carrier',
    hitpoints: [0,0,0,0,0],
    sunk: false,
    coords: [],
  });
});

const testShip = battleship.ShipFactory('Carrier', 5);
testShip.hitpoints = [1,1,1,1,1];

const testShip2 = battleship.ShipFactory('Carrier', 5);
testShip2.hitpoints = [1,0,0,0,0];

// tests that isSunk() method returns true
test('isSunk method should return true if all hitpoints equal 1', () => {
  expect(testShip.isSunk(testShip.hitpoints)).toBe(true);
});

// tests that isSunk() method returns false
test('isSunk method should return false if any hitpoints equal 0', () => {
  expect(testShip2.isSunk(testShip2.hitpoints)).toBe(false);
});

// tests that hit() method changes the value of hitpoints array position 
test('hit() method should set 0 index of hitpoints array to a 1', () => {
  expect(testShip.hit(0)).toBe(testShip.hitpoints[0] = 1);
});

// tests that gameboard() returns proper keys/values/methods
test('gameboard() should return correct gameboard object', () => {
  expect(JSON.stringify(battleship.gameboard())).toBe(JSON.stringify({
    createShip(ship, coords) {
      let newShip = {[`${ship.shipName}`]: coords};
      Object.assign(this.ships, newShip);
      return newShip;
    },
    ships: [],
    misses: [],
  }));
});

const testBoard = battleship.gameboard();

const testAttack = [2,3];
const testAttack2 = [1,7];

// tests that gameboard() createShip method properly utilizes ShipFactory
// and places created ship object within gameboard() "ships" array
test("gameboard()'s createShip method adds created ship to its ships array", () => {
  expect(JSON.stringify(testBoard.createShip('Carrier', 5, [[1,1], [1,2], [1,3], [1,4], [1,5]]))).toBe(JSON.stringify(
    {
      shipName: 'Carrier',
      hitpoints: [0,0,0,0,0],
      sunk: false,
      coords: [[[1,1], [1,2], [1,3], [1,4], [1,5]]],
      hit(position) {
        return this.hitpoints[position] = 1;
      },
      isSunk() {
        if (this.hitpoints.every(hit => hit === 1)) {
          this.sunk = true;
          return true;
        } return false;
      }
    }
  )
  );
});

testBoard.createShip('Carrier', 5, [[1,1], [1,2], [1,3], [1,4], [1,5]])
testBoard.createShip('Destroyer', 4, [[2,1], [2,2], [2,3], [2,4]]);

// tests that receiveAttack method can correctly determine if coords are a hit
test("gameboard()'s receiveAttack method should return true on hit", () => {
  expect(testBoard.receiveAttack(testAttack)).toBe(true);
});

test("gameboard()'s receiveAttack method should return false on miss", () => {
  expect(testBoard.receiveAttack(testAttack2)).toBe(false);
});

for (let ship in testBoard.ships) {
  for (let hitpoint in testBoard.ships[ship].hitpoints) {
    testBoard.ships[ship].hitpoints[hitpoint] = 1;
  }
  testBoard.ships[ship].isSunk();
}

// tests whether allSunk method determines whether all ships on gameboard have been sunk
test("if all ships have been sunk, allSunk method should return true", () => {
  expect(testBoard.allSunk()).toBe(true);
})
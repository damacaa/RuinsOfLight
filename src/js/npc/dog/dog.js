class Dog extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "droneShotKey");
    this.speed = 200;

    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.entities.push(this);

    this.x = x;
    this.y = y;

    //this.body.setAllowGravity(false);
    //this.body.setSize(6, 6, true);

    this.scene.anims.create({
      key: 'droneShot',
      frames: this.scene.anims.generateFrameNumbers('droneShotKey', { start: 0, end: 3 }),
      frameRate: 4,
      repeat: -1
    });

    this.anims.play('droneShot', true);

    this.setOrigin(0.5, 0.5);
    this.setDepth(3);

    this.way;

  }

  FindWay(world, endX, endY) {
    let startX = Math.round(this.x / 32);
    let startY = Math.round(this.y / 32);

    let columns = world.width;
    let rows = world.height;

    //Inicialización del mundo con todas las células nuertas
    let cells = new Array(columns);

    //Rellena el array de arrays para hacer una matriz
    for (var i = 0; i < cells.length; i++) {
      cells[i] = new Array(rows);
    }

    for (let i = 0; i < columns; i++) {
      for (let j = 0; j < rows; j++) {
        let tile = world.getTileAt(i, j);
        if (tile) {
          cells[i][j] = new Cell(tile.index, i, j);
        } else {
          cells[i][j] = new Cell(0, i, j);
        }
      }
    }

    cells[startX][startY].state = 1;
    cells[endX][endY].state = 2;

    let start = new Node(cells[startX][startY], null);
    start.ComputeFScore(endX, endY);

    let openList = [];
    let closedList = [];
    openList.push(start);

    let current = openList[0];

    let count = 0;

    while (openList.length > 0 && count < 999999) {
      count++;
      current.cell.state = 4;

      let minF = Infinity;
      openList.forEach(n => {
        if (n.f < minF) {
          minF = n.f;
          current = n;
        }
      });

      current.cell.state = 1;

      let index = openList.indexOf(current);
      if (index > -1) {
        openList.splice(index, 1);
      }

      if (current.x == endX && current.y == endY) {
        this.way = current;
        console.log("Found the way");
        break;
      } else {
        for (let i = -1; i < 2; i++) {
          for (let j = -1; j < 2; j++) {

            if (i != 0 || j != 0) {//Not checking self
              let currentX = current.x + i;
              let currentY = current.y + j;

              if (currentX >= 0 && currentX < columns && currentY >= 0 && currentY < rows) {//add "&& i!=j" to avoid diagonals
                let neighbour = cells[currentX][currentY];

                if (neighbour.state == 0 || neighbour.state == 2) {
                  neighbour.state = 3;

                  let newNode = new Node(neighbour, current);
                  let cost = neighbour.cost;
                  if (i == j) { cost *= 1.41; }
                  if (j < 0) { cost *= 5; }
                  if (j > 0) { cost *= 0.5; }

                  newNode.ComputeFScore(endX, endY, cost);

                  openList.push(newNode);
                }
                cells[current.x + i][current.y + j] = neighbour;
              }
            }
          }
        }
      }
    }
  }

  Update() {
    if (this.way) {
      //console.log(this.way.x + ":" + this.way.y);
      this.scene.add.rectangle(this.way.x * 32, this.way.y * 32, 3, 3, 0xD79968).setDepth(10).setOrigin(0.5, 0.5);
      this.x = this.way.x;
      this.y = this.way.y;
      if (this.way.parent) { this.way = this.way.parent; }
    }
  }
}
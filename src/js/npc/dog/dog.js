class Dog extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'dog');
    this.speed = 190;
    this.dir = 0;

    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.entities.push(this);
    this.scene.physics.add.existing(this);

    //this.body.setAllowGravity(false);
    //this.body.setSize(6, 6, true);

    this.scene.anims.create({
      key: 'dogWalk',
      frames: this.scene.anims.generateFrameNumbers('dog', { start: 0, end: 3 }),
      frameRate: 4,
      repeat: -1
    });

    this.scene.anims.create({
      key: 'dogIdle',
      frames: this.scene.anims.generateFrameNumbers('dog', { start: 8, end: 9 }),
      frameRate: 4,
      repeat: -1
    });

    this.scene.anims.create({
      key: 'dogJump',
      frames: this.scene.anims.generateFrameNumbers('dog', { start: 4, end: 5 }),
      frameRate: 4,
      repeat: 0
    });

    this.scene.anims.create({
      key: 'dogFall',
      frames: this.scene.anims.generateFrameNumbers('dog', { start: 6, end: 7 }),
      frameRate: 4,
      repeat: 0
    });

    this.anims.play('dogWalk', true);

    this.setOrigin(0.5, 0.5);
    this.setDepth(9);
    this.body.setSize(16, 16);
    this.body.offset.x = 16;
    this.body.offset.y = 16;

    this.way = [];

    this.scene.physics.add.collider(this, this.scene.groundLayer);
  }

  FindWay(world, endX, endY) {
    this.way = [];

    console.log(this.x, this.y);
    let startX = Math.round(this.x / 32);
    let startY = Math.round(this.y / 32);

    endX = Math.round(endX / 32);
    endY = Math.round(endY / 32);

    console.log(startX, startY, " => ", endX, endY)

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
        console.log("Found the way");
        while (current.parent) {
          let w = { x: current.x * 32 + 16, y: current.y * 32 + 16 };
          //this.scene.add.rectangle(w.x, w.y, 3, 3, 0xD79968).setDepth(10).setOrigin(0.5, 0.5);
          this.way.push(w);
          current = current.parent;
        }
        break;
      } else {
        for (let i = -1; i < 2; i++) {
          for (let j = -1; j < 2; j++) {

            if (Math.abs(i + j) == 1) {//Not checking self i != 0 || j != 0 //Math.abs(i + j) == 1
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

                  if (j > 0) {
                    cost *= 0.5;
                    if (i == 0) { cost = 0; }
                  }

                  let tile = world.getTileAt(currentX, currentY + 1);
                  if (!tile) {
                    cost *= 100;
                  }

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

  Update(time, delta) {
    if (this.way.length > 1 && this.scene.camera.worldView.contains(this.x + (32 * this.dir), this.y) || !this.body.blocked.down) {
      let idx = this.way.length - 1;
      let x = Math.abs(this.way[idx].x - this.x) > 16;
      let y = Math.abs(this.way[idx].y - this.y) > 32;

      if (x || y) {
        if (x) {
          let dif = this.way[idx].x - this.x;

          if (dif > 0) {
            this.dir = 1;
            this.flipX = false;
          } else {
            this.dir = -1;
            this.flipX = true;
          }
          this.body.setVelocityX(this.dir * this.speed);
          if (this.body.blocked.left || this.body.blocked.right) { this.body.setVelocityY(-100); }
        }
        if (y) {
          let speedY = this.way[idx].y - this.y + 32;
          speedY = speedY / Math.abs(speedY);
          if (speedY < 0) {
            this.body.setVelocityY(speedY * this.speed);
          }
          if (this.body.blocked.up) { this.body.setVelocityX(-100); }
        }
      } else {
        this.way.pop()
      }

      //Animations
      if (this.body.blocked.down) {
        this.anims.play('dogWalk', true);
      } else {
        if (this.body.velocity.y > 0) {
          this.anims.play('dogFall', true);
        } else {
          this.anims.play('dogJump', true);
        }
      }

    } else {
      //console.log(this.scene.player0.x, this.x);
      this.flipX = !(this.scene.player0.x > this.x);
      this.body.setVelocityX(0);
      this.anims.play('dogIdle', true);
    }
  }
}
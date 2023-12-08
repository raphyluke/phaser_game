// import the phaser.js file
// start the server : http-server --proxy http://localhlhost:8080?
class Example extends Phaser.Scene
    {
        constructor (){
            super();
            this.player = null;
        }
        preload ()
        {
            this.load.image("tileset", "assets/Tileset.png")
            this.load.image("background", "assets/Background.png")
            
        }

        create ()
        {
            this.physics.world.createDebugGraphic();
            // put the background image
            const bg = this.add.image(400, 300, 'background')
            // opacity of the background
            bg.setAlpha(0.3)
            const level = [
                [11, 11, 11, 11, 22, null, null, null, null, null, null, null, null, null, null],
                [11, 11, 11, 22, null, null, null, null, null, null, null, null, null, null, null],
                [11, 11, 22, null, null, null, null, null, null, null, null, null, null, null, null],
                [11, 22, null, null, null, null, null, null, null, null, null, null, null, null, null],
                [13, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
                [13, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null, 0, 1, 1, 1, 2, null, null],
                [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
                [null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
                [0, 1, 1, 1, 1, 2, null, null, null, null, null, null, null, null, null],
            ]
            const map = this.make.tilemap({ data: level, tileWidth: 32, tileHeight: 32 });
            const tileset = map.addTilesetImage('tileset');
            const layer = map.createLayer(0, tileset, 0, 0);
            // create collision on all tiles in this layer
            layer.setCollisionByExclusion([-1]);

            // create a 32x32 square as a player
            this.player = this.add.rectangle(32, 32, 32, 32, 0x6666ff);
            // add physics to the player
            this.physics.add.existing(this.player);
            // add gravity to the player
            this.player.body.gravity.y = 200;

            // add a collider between the player and the layer
            this.physics.add.collider(this.player, layer);

            this.player.setPosition(32, 500);
        }
        update(){
            const acceleration = 600; // Adjust as needed
            const maxSpeed = 200; // Maximum speed
            const drag = 500; // Drag or friction
        
            // Set drag
            this.player.body.setDragX(drag);

           if (this.input.keyboard.checkDown(this.input.keyboard.addKey('SPACE'), 500)) {
                // jump
                this.player.body.setVelocityY(-200);
            }
            else if (this.input.keyboard.checkDown(this.input.keyboard.addKey('LEFT'), 500)) {
                // move left
                console.log("left")
                this.player.body.setAccelerationX(-acceleration);
            }
            else if (this.input.keyboard.checkDown(this.input.keyboard.addKey('RIGHT'), 500)) {
                // move right
                console.log("right")
                this.player.body.setAccelerationX(acceleration);
            }
            else {
                // set acceleration to 0 so DRAG will take over
                this.player.body.setAccelerationX(0);
            }

            // cap the velocity at maxSpeed
            this.player.body.velocity.x = Phaser.Math.Clamp(this.player.body.velocity.x, -maxSpeed, maxSpeed);
        }
    }



    const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        scene: Example,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 200 }
            }
        }
    };

    const game = new Phaser.Game(config);
window.onload = function() {

    var game = new Phaser.Game(400, 490, Phaser.AUTO, 'game_div');

    var main_state = {
        preload: function() {
            // Everything in this will be executed in the beginning.. usually we load game assets here.

            this.game.stage.backgroundColor = '#71c5cf';

            this.game.load.image('bird', '/images/bird.png');
            this.game.load.image('pipe', '/images/pipe.png');
        },

        create: function() {
            // called after preload and we setup the game, display sprites, add labels, etc.

            this.bird = this.game.add.sprite(100, 245, 'bird');

            this.bird.body.gravity.y = 1000;

            var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

            space_key.onDown.add(this.jump, this);

            // pipes

            this.pipes = game.add.group();
            this.pipes.createMultiple(20, 'pipe');

            this.timer = this.game.time.events.loop(1500, this.add_row_of_pipes, this);

            // score

            this.score = 0;

            var style = {
                font: "30px Arial",
                fill: "#ffffff"
            };

            this.label_score = this.game.add.text(20, 20, "0", style);

        },

        update: function() {
            // we spend most of our time here, this function is called 60 times per second

            if (this.bird.inWorld == false) {
                this.restart_game();
            }

            this.game.physics.overlap(this.bird, this.pipes, this.restart_game, null, this);

        },

        jump: function() {
            this.bird.body.velocity.y = -350;
        },

        restart_game: function() {
            this.game.state.start('main');
            this.game.time.events.remove(this.timer);

        },

        add_one_pipe: function(x, y) {
            var pipe = this.pipes.getFirstDead();

            pipe.reset(x, y);

            pipe.body.velocity.x = -200;

            pipe.outOfBoundsKill = true;
        },

        add_row_of_pipes: function() {
            var hole = Math.floor(Math.random() * 5) + 1;

            for (var i = 0; i < 8; i++) {
                if (i != hole && i != hole + 1) {
                    this.add_one_pipe(400, i * 60 + 10);
                }
            }

            this.score += 1;
            this.label_score.content = this.score;
        }
    }

    game.state.add('main', main_state);
    game.state.start('main');
}
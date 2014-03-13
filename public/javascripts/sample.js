// window.onload = function() {

//     var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {
//         preload: preload,
//         create: create
//     });

//     function preload() {

//         game.load.image('logo', '/images/phaser.png');

//     }

//     function create() {

//         var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');
//         logo.anchor.setTo(0.5, 0.5);

//     }

// };

window.onload = function() {

    var game = new Phaser.Game(500, 600, Phaser.AUTO, 'game_div');

    var main_state = {
        preload: function() {
            // Everything in this will be executed in the beginning.. usually we load game assets here.

            game.load.image('hello', '/images/hello.png');

        },

        create: function() {
            // called after preload and we setup the game, display sprites, add labels, etc.

            this.hello_sprite = game.add.sprite(200, 300, 'hello');

        },

        update: function() {
            // we spend most of our time here, this function is called 60 times per second

            this.hello_sprite.angle += 1;
        }
    }

    game.state.add('main', main_state);
    game.state.start('main');
}
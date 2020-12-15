var CustomPipeline = new Phaser.Class({

    Extends: Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline,

    initialize:
        //https://github.com/mattdesl/lwjgl-basics/wiki/ShaderLesson5
        //https://labs.phaser.io/edit.html?src=src\camera\camera%20blur%20shader.js
        function CustomPipeline(game) {
            Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline.call(this, {
                game: game,
                renderer: game.renderer,
                fragShader:
                    `precision mediump float;

                //"in" attributes from our vertex shader
                varying vec4 outColor;
                varying vec2 outTexCoord;

                //declare uniforms
                uniform sampler2D u_texture;
                uniform float resolution;
                uniform float radius;
                uniform vec2 dir;

                void main() {
                    //this will be our RGBA sum
                    vec4 sum = vec4(0.0);

                    //our original texcoord for this fragment
                    vec2 tc = outTexCoord;


                    //the amount to blur, i.e. how far off center to sample from 
                    //1.0 -> blur by one pixel
                    //2.0 -> blur by two pixels, etc.
                    float blur = radius / resolution;

                    //the direction of our blur
                    //(1.0, 0.0) -> x-axis blur
                    //(0.0, 1.0) -> y-axis blur
                    float hstep = dir.x;
                    float vstep = dir.y;

                    bool hasLight = false;
                    float remaining = 1.0;

                    //apply blurring, using a 9-tap filter with predefined gaussian weights 
                    //if(texture2D(u_texture, vec2(tc.x, tc.y)) == vec4(238, 238, 186, 1)){}

                    vec4 neighbour;

                    neighbour = vec4(texture2D(u_texture, vec2(tc.x - 4.0 * blur * hstep, tc.y - 4.0 * blur * vstep)).rgb,1.0);
                    if(neighbour.r > 0.92 && neighbour.g > 0.92 && neighbour.b > 0.71){
                        sum += texture2D(u_texture, vec2(tc.x - 4.0 * blur * hstep, tc.y - 4.0 * blur * vstep)) * 0.0162162162;
                        remaining = remaining-0.0162162162;
                        hasLight = true;
                    }

                    neighbour = vec4(texture2D(u_texture, vec2(tc.x - 3.0 * blur * hstep, tc.y - 3.0 * blur * vstep)).rgb,1.0);
                    if(neighbour.r > 0.92 && neighbour.g > 0.92 && neighbour.b > 0.71){
                        sum += texture2D(u_texture, vec2(tc.x - 3.0 * blur * hstep, tc.y - 3.0 * blur * vstep)) * 0.0540540541;
                        remaining = remaining- 0.0540540541;
                        hasLight = true;
                    }

                    neighbour = vec4(texture2D(u_texture, vec2(tc.x - 2.0 * blur * hstep, tc.y - 2.0 * blur * vstep)).rgb,1.0);
                    if(neighbour.r > 0.92 && neighbour.g > 0.92 && neighbour.b > 0.71){
                        sum += texture2D(u_texture, vec2(tc.x - 2.0 * blur * hstep, tc.y - 2.0 * blur * vstep)) * 0.1216216216;
                        remaining = remaining- 0.1216216216;
                        hasLight = true;
                    }

                    neighbour = vec4(texture2D(u_texture, vec2(tc.x - 1.0 * blur * hstep, tc.y - 1.0 * blur * vstep)).rgb,1.0);
                    if(neighbour.r > 0.92 && neighbour.g > 0.92 && neighbour.b > 0.71){
                        sum += texture2D(u_texture, vec2(tc.x - 1.0 * blur * hstep, tc.y - 1.0 * blur * vstep)) * 0.1945945946;
                        remaining = remaining- 0.1945945946;
                        hasLight = true;
                    }

                    neighbour = vec4(texture2D(u_texture, vec2(tc.x + 1.0 * blur * hstep, tc.y + 1.0 * blur * vstep)).rgb,1.0);
                    if(neighbour.r > 0.92 && neighbour.g > 0.92 && neighbour.b > 0.71){
                        sum += texture2D(u_texture, vec2(tc.x + 1.0 * blur * hstep, tc.y + 1.0 * blur * vstep)) * 0.1945945946;
                        remaining = remaining- 0.1945945946;
                        hasLight = true;
                    }

                    neighbour = vec4(texture2D(u_texture, vec2(tc.x + 2.0 * blur * hstep, tc.y + 2.0 * blur * vstep)).rgb,1.0);
                    if(neighbour.r > 0.92 && neighbour.g > 0.92 && neighbour.b > 0.71){
                        sum += texture2D(u_texture, vec2(tc.x + 2.0 * blur * hstep, tc.y + 2.0 * blur * vstep)) * 0.1216216216;
                        remaining = remaining- 0.1216216216;
                        hasLight = true;
                    }

                    neighbour = vec4(texture2D(u_texture, vec2(tc.x + 3.0 * blur * hstep, tc.y + 3.0 * blur * vstep)).rgb,1.0);
                    if(neighbour.r > 0.92 && neighbour.g > 0.92 && neighbour.b > 0.71){
                        sum += texture2D(u_texture, vec2(tc.x + 3.0 * blur * hstep, tc.y + 3.0 * blur * vstep)) * 0.0540540541;
                        remaining = remaining- 0.0540540541;
                        hasLight = true;
                    }

                    neighbour = vec4(texture2D(u_texture, vec2(tc.x + 4.0 * blur * hstep, tc.y + 4.0 * blur * vstep)).rgb,1.0);
                    if(neighbour.r > 0.92 && neighbour.g > 0.92 && neighbour.b > 0.71){
                        sum += texture2D(u_texture, vec2(tc.x + 4.0 * blur * hstep, tc.y + 4.0 * blur * vstep)) * 0.0162162162;
                        remaining = remaining- 0.0162162162;
                        hasLight = true;
                    }

                    sum += texture2D(u_texture, vec2(tc.x, tc.y)) * remaining;

                    if(hasLight){
                        gl_FragColor = vec4(sum.rgb, 1.0);
                        //gl_FragColor = vec4(1.0,0.0,0.0,1.0);
                    }else{
                        gl_FragColor = vec4(texture2D(u_texture, vec2(tc.x, tc.y)).rgb, 1.0);
                    }
            }
            `
            });
        }

});

var config;
var game;
var customPipeline;

window.onload = function () {
    config = {
        type: Phaser.WEBGL,
        pixelArt: true,
        roundPixels: false,
        scale: {
            mode: Phaser.Scale.RESIZE,// Phaser.Scale.FIT || Phaser.Scale.RESIZE
            parent: 'phaser-example',
            width: 480,
            height: 270
        },
        physics: {
            default: 'arcade',

            arcade: {
                gravity: { y: 981 },
                //debug: true
            }
        },
        scene: [MainMenu, AltarRoom, BossRoom, Dungeons, GameOver, Credits]
    }

    game = new Phaser.Game(config);

    customPipeline = game.renderer.addPipeline('Custom', new CustomPipeline(game));
    customPipeline.setFloat1('resolution', game.config.width);
    customPipeline.setFloat1('radius', 1.0);
    customPipeline.setFloat2('dir', 1.0, 1.0);
}


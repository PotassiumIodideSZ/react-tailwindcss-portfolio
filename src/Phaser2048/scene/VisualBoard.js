import {tileSize} from "./GameStart.js"


export function moveTileVisually(tile, tile2 , gameScene){
    const deltaX = tile.x - tile2.x;
    const deltaY = tile.y - tile2.y;
    const tileRect = tile.rect;
    const tileText = tile.text;
    //sprite.setVelocityX(200);
    gameScene.tileTween = gameScene.tweens.add({
        targets: [tileRect, tileText],
        x: '+='+tileSize*deltaX, // new x position
        y: '+='+tileSize*deltaY, // new y position
        duration: 2000, // duration of the tween in milliseconds
        ease: 'Linear' // easing function
    });
    
    gameScene.tileTween.on('complete', function(){console.log(gameScene.tileTween);});

    console.log(deltaX, deltaY, tile, tile2);
}
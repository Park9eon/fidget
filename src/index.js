'use strict';
import * as PIXI from 'pixi.js';
import './style.css';
import fidgetUrl from './fidget.png';

(() => {
    let delta = 0;
    // 전체화면
    const app = new PIXI.Application({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    const fidget = PIXI.Sprite.fromImage(fidgetUrl);
    fidget.anchor.set(0.5);

    app.renderer.autoResize = true;
    app.renderer.backgroundColor = 0x00beac;
    app.stage.addChild(fidget);
    app.ticker.add((delta) => {
        onTicker(delta);
    });
    const application = document.getElementById('application');
    application.appendChild(app.view);
    console.log('I`m Ready!');
    // 휄 이벤트 등록
    if (application.addEventListener) {
        // Other
        application.addEventListener("mousewheel", onWheel, false);
        // FireFox
        application.addEventListener("DOMMouseScroll", onWheel, false);
    } else {
        // IE
        application.attachEvent("onmousewheel", onWheel);
    }

    onRender();

    window.onresize = function () {
        app.renderer.resize(window.innerWidth, window.innerHeight);
        onRender();
    };

    function onRender() {
        fidget.x = window.innerWidth / 2;
        fidget.y = window.innerHeight / 2;
    }

    function onWheel(event) {
        const {wheelDelta, detail} = window.event || event;
        delta = wheelDelta || -detail;
        // if delta > 0 == ↑ else ↓
    }

    function onTicker(d) {
        fidget.rotation += 0.1 * delta * d;
    }
})();

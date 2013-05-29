window.onload = function () {
    var c = document.getElementById('canvas'),
        cH = document.getElementById('canvasHidden'),
        pb = document.getElementById('progressBarVal'),
        pbValIn = document.getElementById('pbValIn'),
        pbValOut = document.getElementById('pbValOut');
    if (c.getContext) {
        var ctx = c.getContext('2d'),
            ctxH = cH.getContext('2d'),
            img = new Image(),
            w = 0, h = 0, dots = 15000, sync = 1000,
            padding = 15,
            minF = 18, maxF = 40,
            imgData, imgDataPixels;
        img.onload = function () {
            w = this.width;
            h = this.height;
            c.setAttribute('width', w + padding * 2);
            c.setAttribute('height', h + padding * 2);
            cH.setAttribute('width', w);
            cH.setAttribute('height', h);
            ctx.textAlign = "center";
            ctx.textBaseline = "middle"
            ctx.font = "22px Times New Roman";
            ctxH.drawImage(img, 0, 0, w, h);
            pb.parentNode.style.display = "block";
            imgData = ctxH.getImageData(0, 0, w, h).data;
            imgDataPixels = imgData.length / 4;
            requestAnimFrame(draw);
        }
        var r = Math.floor(Math.random() * 5),
            alph, aLen;
        switch (r) {
            case 0: alph = 'Raspberry'; break;
            case 1: alph = 'FultonStreet'; break;
            case 2: alph = 'Apples'; break;
            case 3: alph = 'TimeIsPreciuos'; break;
            case 4: 
                alph = 'RailroadWayOut№3';
                dots = 30000;
            break; 
        }
        aLen = alph.length
        img.src = 'Images/' + r + '.jpg';
        var drawn = 0;
        function draw()  {
            for (var i = 0; i < sync; i++) {
                var pixel = Math.floor(Math.random() * imgDataPixels),
                    dataplace = pixel * 4,
                    x = pixel % w + padding,
                    y = Math.floor(pixel / w) + padding,
                    d = [imgData[dataplace], imgData[dataplace+1], imgData[dataplace+2], imgData[dataplace+3]],
                    l = alph[Math.floor(Math.random() * aLen)];
                ctx.font = Math.floor(Math.random() * (maxF - minF + 1)) + minF + "px Times New Roman";
                ctx.fillStyle = 'rgba(' + d[0] + ',' + d[1] + ', ' + d[2] + ', ' + (d[3] / 255) + ')';
                ctx.fillText(l, x, y);
            }
            drawn += sync;
            var p = Math.floor(drawn / dots * 100);
            pb.style.width = p + '%';
            pbValIn.innerHTML = parseInt(p) + '%';
            pbValOut.innerHTML = parseInt(p) + '%';
            if (drawn < dots) requestAnimFrame(draw);
            else pb.parentNode.style.display = "none";
        }
    }
}

window.requestAnimFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(b, a) {
        window.setTimeout(b, 1000 / 60);
    };
})();

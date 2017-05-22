window.DebugCanvas = (function() {
    var canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.pointerEvents = 'none';
    canvas.width = canvas.style.width = window.innerWidth;
    canvas.height = canvas.style.height = window.innerHeight
    document.body.appendChild(canvas);
    var ctx = canvas.getContext('2d');
    var applyContextOptions = function(options) {
        options = options || {};
        ctx.lineWidth = options.lineWidth || 1;
        ctx.strokeStyle = options.strokeStyle || '#F00';
        if (options.lineDash) {
            ctx.setLineDash(options.lineDash);
        }
        if (options.opacity) {
            ctx.globalAlpha = options.opacity;
        }
    };
    var api = {
        show: function() {
            canvas.style.display = 'block';
        },
        hide: function() {
            canvas.style.display = 'none';
        },
        clear: function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        },
        draw: {
            circle: function(x, y, radius, options) {
                options = options || {};
                ctx.beginPath();
                ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
                ctx.closePath();
                api.draw.stroke(options);
            },
            rect: function(x, y, width, height, options) {
                ctx.beginPath();
                ctx.rect(x, y, width, height);
                ctx.closePath();
                api.draw.stroke(options);
            },
            line: function(x, y, x1, y1, options) {
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x1, y1);
                ctx.closePath();
                api.draw.stroke(options);
            },
            moveTo: function(x, y) {
                ctx.moveTo(x, y);
            },
            stroke: function(options) {
                ctx.save();
                applyContextOptions(options);
                ctx.stroke();
                ctx.restore();
            },
            image: function(img, x, y, w, h, dx, dy, dw, dh, options) {
                ctx.save();
                switch (arguments.length) {
                    case 2:
                        applyContextOptions(x);
                        ctx.drawImage(img, 0, 0);
                        break;
                    case 1:
                        ctx.drawImage(img, 0, 0);
                        break;
                    case 4:
                    case 3:
                        applyContextOptions(w);
                        ctx.drawImage(img, x, y);
                        break;
                    case 6:
                    case 5:
                        applyContextOptions(dx);
                        ctx.drawImage(img, x, y, w, h);
                        break;
                    default:
                        applyContextOptions(options);
                        ctx.drawImage(img, x, y, w, h, dx, dy, dw, dh);
                }
                ctx.restore();
            }
        }
    };
    api.clear();
    return api;
})();

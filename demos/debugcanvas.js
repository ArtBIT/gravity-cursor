window.DebugCanvas = (function() {
    var canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.pointerEvents = 'none';
    canvas.width = canvas.style.width = window.innerWidth;
    canvas.height = canvas.style.height = window.innerHeight
    document.body.appendChild(canvas);
    var ctx = canvas.getContext('2d');
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
                options = options || {};
                ctx.save();
                if (options.lineDash) {
                    ctx.setLineDash(options.lineDash);
                }
                ctx.lineWidth = options.lineWidth || 1;
                ctx.strokeStyle = options.strokeStyle || '#F00';
                ctx.stroke();
                ctx.restore();
            }
        }
    };
    api.clear();
    return api;
})();

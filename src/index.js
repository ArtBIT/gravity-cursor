window.GravityCursor = (function() {
    const VIRTUAL_CURSOR_CLASSNAME = 'virtual-cursor';
    const VIRTUAL_CURSOR_ZINDEX = 10000;

    let cursor;
    let forces = [];
    let body = document.getElementsByTagName('body')[0];
    let html = document.getElementsByTagName('html')[0];

    const CursorAssets = {
        mac_retina: {
            src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAsCAMAAABFXPg2AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAB7FBMVEUAAAAAAAAAAAD9/f0AAAAAAAD5+fkAAAAAAAD29vYAAAAAAAAAAAD09PQAAAAAAAAAAAAAAAAAAAAAAAAAAAD09PQAAADx8fHz8/Pw8PDv7+/////q6urv7+/p6emZmZmbm5udnZ2goKClpaWurq68vLzMzMze3t79/f1DQ0MAAAAAAAAAAAAAAAAAAAAAAAAAAAD9/f3S0tIAAAAAAAAAAAAAAAAAAAAAAAD6+vqdnZ3+/v74+PgJCQkAAAAAAAD6+vqAgIAAAADn5+fLy8v4+Ph0dHQAAACkpKT09PT6+vp3d3cGBgb29vb///+mpqb4+Ph+fn4AAAAAAAAAAADPz8/t7e36+vp5eXkAAABJSUn9/f38/Pw5OTmSkpIAAAAAAADk5OTc3NySkpL19fXw8PD29vbS0tJVVVXBwcH////p6emjo6MGBgYcHBz29vbd3d1tbW0AAAAAAAD///94eHj+/v4PDw9oaGgAAABubm53d3eBgYGHh4dlZWXf398UFBROTk4RERH29vbS0tLOzs6dnZ0bGxs4ODgxMTHb29ujo6PHx8cvLy/4+PgVFRVdXV3q6uoGBgbg4OACAgKGhoZPT08eHh78/Py6urqwsLAlJSVGRkaPj48EBARYWFjv7+8jIyN+fn7m5ub2NuO1AAAAdHRSTlMAAQKJAwWLBAmNBwgOjgoSCxYGDBeIGH9+dHD9Y2HHa2loZmNeV1BG+EEvLCooJB4N94gfHBsZFRDwcv3fHBQP7Fo3wVTqTy5otelNKt/8KONJJh0hhorgOyIx9egSMRoRqF5LtsvdfiFv/sJpLCTbo00pI5smug4AAAABYktHRACIBR1IAAAACXBIWXMAABYlAAAWJQFJUiTwAAACEklEQVQ4y33U92OTQBQH8ByCh4QSArGOOurWaGO0DcGVqHVvYxxx7739NoqzarVaZ511r3/UIwWEAL4f+OVzD97d414ikSCEJGKDEG4Ex8UuILyAkZSPc04QgVFSnPNJGUBLnFMlhf84VdNATx0tWqRTPQNcv1HH6Eineitji/mYKHc4zl2OcY+tm8DYkP9j61aE+zjK/Wz7OC3QnwDbPj7gQQ55Ezd7M1u3Ax5i647fwxzwCGbeNsHxKPZ5kO/eGw647nHvffZ48BButE2kPu7te2SnP8akye1Tpk6bPmPmLDvd4f4+4Anjp5g9Jzt3Xkdufjpv/53D3D+ABXhmpz/HwlxnV8EomqqX/WIAixYvefmK8WssXVYyy7KuSJRzvj2I5StWdqOH8ZtBrJJFTRMo71WO1Wuya9fh7Tvm77E+L3DEubcN3rCxI5fbtBkfGH8c2rJV4vzXYNv2yo5Wo7oTn+ziPmOXQr2OqaXde2qFlGwae/fVvzD+iv0HNJd50Tx4KHNYkZRU5xF8s6zvP4ZwVORdllTTlEXKa3njGH7++v2HVXpcdd/OUU0U2RYJr5SqJxqnffLUaV1wmHA8ZVtk67Ry4Qxw9tz5C9Wi6rI9mBpbJFQtXrx0+Ur2as0wk+HLyEllo1apXOtKm4oQnlWEKmbGYL3Qk0LUJGNDSpfzrBV85CAkHBVYK2JnIHHL9OIv2U7sgZRDHOgAAAAASUVORK5CYII=',
            height: 22,
            width: 15
        },
        mac: {
            src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAVCAMAAABBhy+7AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAA+VBMVEUAAAAAAAD7+/sAAAD09PQAAAAAAAD09PTz8/PS0tJqampubm5+fn6np6cAAAD19fXw8PD39/cJCQkAAAAAAAAAAAAAAAD19fWzs7OgoKDX19cAAAD+/v6ysrIAAAAICAj29vb09PQAAAAAAADFxcUAAAAAAADR0dH8/Py2trYAAAAAAAAAAABRUVH29vb39/fJycni4uLp6emjo6MHBwcAAAAAAAAAAAD////T09MUFBTS0tIAAAAXFxfb29sbGxseHh4aGhrr6+vv7+/39/c5OTni4uIKCgqurq5BQUFmZmZDQ0PQ0NDW1tY9PT1tbW2np6cgICCioqIFyGmYAAAAOHRSTlMAAooIjg4QiH6dTUpBMQT92N4bFBILA/t4aU0B+3AgIt6zBQ1lGwqE/CMGCQcp9txCpsJpJQ8iGe73bXgAAAABYktHRACIBR1IAAAACXBIWXMAAAsSAAALEgHS3X78AAAArUlEQVQY003P1xKCMBRFUaKCvSuWWFFsYG9Rr1jA3v3/jzGMwOS8rac9h0MuxDFzEw9rnixYC2S5YiwQYE0Ja82xSdhoXsSQ2ocYOrZo26Zlk1vY7XXdINSUh+MJzv5AMBSOUF6isSvc4olkKi1SZrK5O8AjLyKEOaFQLJUrT3hVJTNUq8sNofmGT6uNKTu8gtVu72v0B2YXi5hDqeFoPJk6txR5NuclbBOpyh8/ou0enbQh1QcAAAAASUVORK5CYII=',
            width: 15,
            height: 22
        },
        other: {
            src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABEAAAAXCAYAAADtNKTnAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAjnRFWHRDb21tZW50AGNIUk0gY2h1bmtsZW4gMzIgaWdub3JlZA1BU0NJSTogLi56JS4uLi4uLi4lLi4uLi4ubV8uLi5sLi48Li4uLlgNSEVYOiAwMDAwN0EyNTAwMDA4MDgzMDAwMEY0MjUwMDAwODREMTAwMDA2RDVGMDAwMEU4NkMwMDAwM0M4QjAwMDAxQjU4GN773QAAAgFJREFUeJyUlEtLAlEUx0cd7YFagUkvxKIgiB4USEREUNAqWgvtatEnaNVnaVWrNrVoEURFT6JCxBDDIpKScGG5EATR2/9MZ6ZrjjJe+MHMmXt+c+65c0cRQihEuVy2lUolO0HXetwKil31valN3SFFUVygFTQDJ7CBhiSHYA45ncAHvI2INMlH+lNAcgRWkDMI+kCbVZEmwYVg0SlYRc7of5EliSS6AGtIHLMqqpBIoiuwblVUJZFE12Yis+03leBbEanUu2VRlYQExWJRFAoF8fzyWlMkL61CIgvy+bzI5XIiHk/UFdH2GxIzQTabFZlMRkQiUTPR3wdJknqCdDqN/qTE7e2dwNwrJM2AEdDFx8SuSWTB01PSEODZjcQ1uGQJVRMAHuDQJLLA1ezL7ezuaRVw4pbb27OEyfNgGkyAIdAN3IZEEnyDDcQepSXEMHEBzIJxEOSD6uGT/7scFnyBMIJziJ3s7x+KZDJJkmOwyRJaRi8LnJqAd+cIyVmwiNthMIVYGEQTiYQ4OzsnUZTk9KyiF3y69aHy3tPWDThcPX1IPCBBLBYjyT1XEuJ+dHBOxaCymvgN7WikG4kB8AC2wTLik9zUfn5hlUQXqQyValNdfjugb8HPDQ3ydavRD31N8rpMBklb+O1eFlDM+OOZ/2RqV+mQK9Dn/wAAAP//AwCGMlcrSCX+UAAAAABJRU5ErkJggg==',
            width: 17,
            height: 23
        }
    };

    function VirtualCursor() {
        let type = window.navigator.platform.indexOf('Mac') > -1 ? 'mac' : 'win';
        if (window.devicePixelRatio > 1) {
            type += '_retina';
        }
        let config = CursorAssets[type] || CursorAssets.other;

        let node = document.createElement('img');
        node.src = config.src;
        node.style.width = config.width + 'px'
        node.style.height = config.height + 'px';
        node.style.position = 'fixed';
        node.style.display = 'none';
        node.style.pointerEvents = 'none';
        node.style.zIndex = VIRTUAL_CURSOR_ZINDEX;
        body.appendChild(node);

        this.show = () => {
            html.classList.add(VIRTUAL_CURSOR_CLASSNAME);
            node.style.display = "inline-block";
        }

        this.hide = () => {
            html.classList.remove(VIRTUAL_CURSOR_CLASSNAME);
            node.style.display = "none";
        }

        this.moveTo = (x, y) => {
            node.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
        }

        this.isVisible = () => {
            return node.style.display !== "none";
        }
    }

    function calculateForces(cursor, forces) {
        let force = {
            x: 0,
            y: 0
        };
        var wsz = Math.min(window.innerHeight, window.innerWidth) / 2;
        forces.forEach(obj => {
            // Calculating object rectangle is more expensive, but simpler since we do not have to keep track 
            // of object's position and window resizing.

            var rect = obj.node.getBoundingClientRect();
            var dx = cursor.x - (rect.left + rect.width / 2);
            var dy = cursor.y - (rect.top + rect.height / 2);
            var d = Math.sqrt(dx * dx + dy * dy);

            var weight = Math.pow(1 - Math.min(1, Math.max(d / wsz, 0)), 2);
            if (weight > 0.001) {
                if (obj.direction == 1) {
                    // REPEL
                    var angle = Math.atan2(dy, dx);
                    d = obj.radius * obj.direction * weight / Math.SQRT2;
                    force.x += Math.cos(angle) * d;
                    force.y += Math.sin(angle) * d;
                } else  if (obj.direction == -1) {
                    // ATTRACT
                    if (d <= obj.radius) {
                        weight = Math.pow(1 - d / obj.radius, 0.5);
                        d = weight * obj.direction;
                        force.x += dx * d;
                        force.y += dy * d;
                    }
                }
            }
        })
        return force;
    }

    function createCursorStyles() {
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = `
        .${VIRTUAL_CURSOR_CLASSNAME},
        .${VIRTUAL_CURSOR_CLASSNAME} * {
            cursor: none;
            -moz-user-select: none;
            user-select: none;
            -webkit-user-select: none;
        }
        `;
        body.appendChild(style);
    }

    function bindEvents() {
        function onNextFrame(callback) {
            window.requestAnimationFrame(() => {
                return callback();
            });
        }

        function onMouseOut(e) {
            // If relatedTarget is null, that means the mouse has left the page
            if (!e.relatedTarget) {
                cursor.hide();
            }
        }

        function onBlur() {
            onNextFrame(() => {
                cursor.hide();
            });
        }

        function onFocus() {
            if (!forces.length) {
                return;
            }
            onNextFrame(() => {
                cursor.show();
            });
        }

        function onMouseMove(evt) {
            if (!forces.length) {
                return;
            }
            onNextFrame(() => {
                cursor.show();

                let mouse = {
                    x: evt.clientX,
                    y: evt.clientY,
                }

                let force = calculateForces(mouse, forces);
                cursor.moveTo(mouse.x + force.x, mouse.y + force.y);
            });
        }

        document.addEventListener('mouseout', onMouseOut);
        document.addEventListener('mousemove', onMouseMove);
        window.addEventListener('focus', onFocus);
        window.addEventListener('blur', onBlur);
    }

    function addForceElement(element, radius, direction) {
        forces.push({
            node: element, 
            radius: radius || 100,
            direction: direction,
        });
    }

    function attract(element, radius) {
        addForceElement(element, radius, -1);
        return this;
    }

    function repel(element, radius) {
        addForceElement(element, radius, 1);
        return this;
    }

    function remove(element) {
        if (element) {
            forces = forces.filter(item => item.node !== element);
        } else {
            forces = [];
            cursor.hide();
        }
        return this;
    }

    function init() {
        forces = [];
        cursor = new VirtualCursor();

        createCursorStyles();
        bindEvents();

        const controller = {};
        controller.repel = repel.bind(controller);
        controller.attract = attract.bind(controller);
        controller.remove = remove.bind(controller);
        return controller;
    }

    return init();
})();

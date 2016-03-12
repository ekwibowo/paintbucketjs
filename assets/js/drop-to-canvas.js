/*
 * Based on http://jsfiddle.net/KJW4E/2/
 */
document.onkeydown = function (e) {
    return on_keyboard_action(e);
};
document.onkeyup = function (e) {
    return on_keyboardup_action(e);
};

var canvas = document.getElementById("test-canvas");
var ctx = canvas.getContext("2d");
var imageUrl;
var ctrl_pressed = false;

var pasteCatcher;

function on_keyboard_action(event) {
    k = event.keyCode;
    //ctrl
    if (k == 17) {
        if (ctrl_pressed == false)
            ctrl_pressed = true;
        if (!window.Clipboard)
            pasteCatcher.focus();
    }
}

function on_keyboardup_action(event) {
    k = event.keyCode;
    //ctrl
    if (k == 17)
        ctrl_pressed = false;
}

//=== Clipboard ================================================================

//firefox
if (!window.Clipboard){
    pasteCatcher = document.createElement("div");
    pasteCatcher.setAttribute("id", "paste_ff");
    pasteCatcher.setAttribute("contenteditable", "");
    pasteCatcher.style.cssText = 'opacity:0;position:fixed;top:0px;left:0px;';
    pasteCatcher.style.marginLeft = "-20px";
    document.body.appendChild(pasteCatcher);
    pasteCatcher.focus();
    document.addEventListener("click", function(){
        //pasteCatcher.focus();
    });
    document.getElementById('paste_ff').addEventListener('DOMSubtreeModified',function(){
        if(pasteCatcher.children.length == 1){
            img = pasteCatcher.firstElementChild.src;

            var pastedImage = new Image();
            pastedImage.onload = function(){
                var fitDimension = getFitDimension(pastedImage.width, pastedImage.height, canvas.width, canvas.height);
                ctx.drawImage(pastedImage, 0, 0, fitDimension.width, fitDimension.height);
            };
            pastedImage.src = img;
            pasteCatcher.innerHTML = '';
        }
    },false);
}

//chrome
window.addEventListener("paste", pasteHandler);
function pasteHandler(e) {
    if (e.clipboardData) {
        var items = e.clipboardData.items;
        if (items) {
            for (var i = 0; i < items.length; i++) {
                if (items[i].type.indexOf("image") !== -1) {
                    var blob = items[i].getAsFile();
                    var URLObj = window.URL || window.webkitURL;
                    var source = URLObj.createObjectURL(blob);
                    paste_createImage(source);
                }
            }
        }
    }
    else {
        setTimeout(paste_check_input, 1);
    }
}
function paste_check_input() {
    var child = pasteCatcher.childNodes[0];
    pasteCatcher.innerHTML = "";
    if (child) {
        if (child.tagName === "IMG") {
            paste_createImage(child.src);
        }
    }
}

function paste_createImage(source) {
    var pastedImage = new Image();
    pastedImage.onload = function () {
        // Resize canvas to image dimension
        //canvas.width = pastedImage.width;
        //canvas.height = pastedImage.height;
        //ctx.drawImage(pastedImage, 0, 0, pastedImage.width, pastedImage.height);

        // Fit image to canvas dimension
        var fitDimension = getFitDimension(pastedImage.width, pastedImage.height, canvas.width, canvas.height);
        ctx.drawImage(pastedImage, 0, 0, fitDimension.width, fitDimension.height);
    };
    pastedImage.src = source;
    imageUrl = source;
}

//=== /Clipboard ===============================================================

function getFitDimension(imageWidth, imageHeight, containerWidth, containerHeight) {
    var w = 0, h = 0;
    if (imageWidth <= containerWidth && imageHeight <= containerHeight) {
        w = imageWidth;
        h = imageHeight;
    } else {
        var imageAspectRatio = imageWidth / imageHeight;
        if (imageWidth >= containerWidth) {
            w = containerWidth;
            h = w / imageAspectRatio;
            if (h > containerHeight) {
                h = containerHeight;
                w = imageAspectRatio * h;
            }
        } else {
            h = containerHeight;
            w = imageAspectRatio * h;
        }
    }
    return {
        'width': w,
        'height': h
    }
}
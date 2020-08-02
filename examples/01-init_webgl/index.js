window.addEventListener("load",()=>{
    var canvas=document.createElement('canvas');
    canvas.width=document.body.clientWidth;
    canvas.height=document.body.clientHeight;
    document.body.appendChild(canvas);
    init(canvas);
});

function init(canvas){
    let gl=getWebGLContext(canvas);
    if(!gl){
        return;
    }

    gl.clearColor(0.0,0.0,0.0,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
}
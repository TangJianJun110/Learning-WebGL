window.addEventListener("load",()=>{
    init("ctx");
});

function init(id){
    let gl=getWebGLContext(id);
    if(!gl){
        return;
    }

    gl.clearColor(0.0,0.0,0.0,1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);
}
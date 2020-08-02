window.addEventListener("load", function () {
  var canvas=document.createElement('canvas');
  canvas.width=document.body.clientWidth;
  canvas.height=document.body.clientHeight;
  document.body.appendChild(canvas);
  init(canvas);
});

function init(canvas) {
  let gl = getWebGLContext(canvas);
  if (!gl) {
    return;
  }
  let vs_source = null;
  let fs_source = null;
  ajax({
    url: "./shader/drawPointVS.glsl",
    success: function (data) {
      if (data) {
        vs_source = data;
        ajax({
          url: "./shader/drawPointFS.glsl",
          success: function (data) {
            if (data) {
              fs_source = data;
              initShader(gl, vs_source, fs_source);
              let a_Postion=gl.getAttribLocation(gl.program,'a_Position');
              if(a_Postion<0){
                console.log('failed to get the storage location of a_Position');
                return;
              }
              
              gl.vertexAttrib3f(a_Postion,0.0,0.5,0.0);
              
              gl.clearColor(0.0, 0.0, 0.0, 1.0);
              gl.clear(gl.COLOR_BUFFER_BIT);
              gl.drawArrays(gl.POINTS, 0, 1);
            }
          },
        });
      }
    },
  });
}

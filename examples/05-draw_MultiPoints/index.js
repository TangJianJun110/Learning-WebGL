window.addEventListener("load", function () {
  var canvas=document.createElement('canvas');
  canvas.width=document.body.clientWidth;
  canvas.height=document.body.clientHeight;
  document.body.appendChild(canvas);
  init(canvas);
  });
  var gl=null;
  var positions=[];
  var colors=[];
  function init(canvas) {
    gl = getWebGLContext(canvas);
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
                let vertices=new Float32Array([
                    0.0,0.0,0.0,0.5,-0.5,-0.5,0.5,-0.5
                ]);
                initShader(gl, vs_source, fs_source);
                let n=initVertexBuffers(vertices);
                gl.clearColor(0.0, 0.0, 0.0, 1.0);
                gl.clear(gl.COLOR_BUFFER_BIT);
                // 1.单独绘制点
                gl.drawArrays(gl.POINTS,0,4);
              }
            },
          });
        }
      },
    });
  }

  // 初始化缓冲区
  function initVertexBuffers(vertices){
    let n=4;
    // 1.创建缓冲区对象
    let vertexBuffer=gl.createBuffer();
    if(!vertexBuffer){
        console.log('Failed to create the buffer object');
        return -1;
    }
    // 2.把缓冲区对象绑定到目标
    gl.bindBuffer(gl.ARRAY_BUFFER,vertexBuffer);
    // 3.把数据写入缓冲区
    gl.bufferData(gl.ARRAY_BUFFER,vertices,gl.STATIC_DRAW);
    // 4.将缓冲区对象分配给一个attribute变量
    let a_Position=gl.getAttribLocation(gl.program,'a_Position');
    gl.vertexAttribPointer(a_Position,2,gl.FLOAT,false,0,0);
    // 5.开启attribute变量
    gl.enableVertexAttribArray(a_Position);

    return n;
  }
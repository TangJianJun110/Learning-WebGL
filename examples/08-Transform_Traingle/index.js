window.addEventListener("load", function () {
  var canvas=document.createElement('canvas');
  canvas.width=document.body.clientWidth;
  canvas.height=document.body.clientHeight;
  document.body.appendChild(canvas);
  init(canvas);
});
var gl = null;
var positions = [];
var colors = [];
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
              initShader(gl, vs_source, fs_source);
              let vertices = new Float32Array([
                -0.5, 0.5, -1.0, 0.0, 0.0, 0.0
              ]);
              let Tx = 0.5, Ty = 0.5, Tz = 0;
              initVertexBuffers(vertices);
              let a_Translate = gl.getAttribLocation(gl.program, 'a_Translate');
              let u_FragColor=gl.getUniformLocation(gl.program,'u_FragColor');

              gl.clearColor(0.0, 0.0, 0.0, 1.0);
              gl.clear(gl.COLOR_BUFFER_BIT);
              // 1.绘制独立三角形
              // gl.POINTS 独立的点
              // gl.LINES 独立线段，两个点一段线，彼此不相连接
              // gl.LINE_STRIP 连续两个点绘制一条线段
              // gl.LINE_LOOP 绘制尾巴相连的线段
              // gl.TRIANGLES 独立三角形，连续三个点绘制一个三角形
              // gl.TRIANGLE_STRIP 绘制条带状三角形
              // gl.TRIANGLE_FAN 绘制三角形，扇形
              // gl.drawArrays(gl.TRIANGLES,0,4);

              // 移动之前的位置
              gl.vertexAttrib4f(a_Translate, 0.0, 0.0, 0.0, 0.0);
              gl.uniform4f(u_FragColor,1.0,0.0,0.0,1.0);
              gl.drawArrays(gl.LINE_LOOP, 0, 3);
              // 移动之后的位置
              gl.vertexAttrib4f(a_Translate, Tx, Ty, Tz, 0.0);
              gl.uniform4f(u_FragColor,1.0,1.0,0.0,1.0);
              gl.drawArrays(gl.TRIANGLES, 0, 3);
            }
          },
        });
      }
    },
  });
}

// 初始化缓冲区
function initVertexBuffers(vertices) {
  // 1.创建缓冲区对象
  let vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
    console.log('Failed to create the buffer object');
    return false;
  }
  // 2.把缓冲区对象绑定到目标
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  // 3.把数据写入缓冲区
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
  // 4.将缓冲区对象分配给一个attribute变量
  let a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);
  // 5.开启attribute变量
  gl.enableVertexAttribArray(a_Position);

  return true;
}
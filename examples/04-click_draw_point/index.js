window.addEventListener("load", function () {
    init("ctx");
  });
  var gl=null;
  var positions=[];
  var colors=[];
  function init(id) {
    gl = getWebGLContext(id);
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

                gl.clearColor(0.0, 0.0, 0.0, 1.0);
                gl.clear(gl.COLOR_BUFFER_BIT);

                let canves=document.getElementById(id);
                canves.addEventListener('click',drawPoint)
              }
            },
          });
        }
      },
    });
  }
  function drawPoint(e){
    let ctxheight=e.currentTarget.clientHeight;
    let ctxwidth=e.currentTarget.clientWidth;
    let x=e.x*2/ctxwidth-1.0;
    let y=1.0-e.y*2/ctxheight;
    positions.push([x,y]);

    // xoy第一象限
    let color=null;
    if(x>0&y>0){
      color={
        r:1.0,
        g:0.0,
        b:0.0
      };
    }else if(x<=0&&y>0){
      color={
        r:0.0,
        g:1.0,
        b:0.0
      };
    }else if(x<=0&&y<=0){
      color={
        r:0.0,
        g:0.0,
        b:1.0
      };
    }else{
      color={
        r:1.0,
        g:0.0,
        b:1.0
      };
    }

    colors.push(color);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    for(let i=0;i<positions.length;i++){
        let a_Postion=gl.getAttribLocation(gl.program,'a_Position');
        let u_FragColor=gl.getUniformLocation(gl.program,'u_FragColor');
        if(a_Postion<0){
          console.log('failed to get the storage location of a_Position');
          return;
        }
        gl.vertexAttrib3f(a_Postion,positions[i][0],positions[i][1],0.0);
        gl.uniform4f(u_FragColor,colors[i].r,colors[i].g,colors[i].b,1.0);
        gl.drawArrays(gl.POINTS, 0, 1);
    }
  }
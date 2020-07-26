function getWebGLContext(id,opt_attribs) {
  let canvas = document.getElementById(id);
  let context = null;
  if(canvas){
    let names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
    for (let ii = 0; ii < names.length; ++ii) {
      try {
        context = canvas.getContext(names[ii], opt_attribs);
      } catch (e) {}
      if (context) {
        break;
      }
    }
  }
  return context;
}


function initShader(gl,vshader,fshader){
  let program=createProgram(gl,vshader,fshader);
  if (!program) {
    console.log('Failed to create program');
    return false;
  }

  gl.useProgram(program);
  gl.program = program;

  return true;
}
function createProgram(gl,vshader,fshader){
  let vertextShader=loadShader(gl,gl.VERTEX_SHADER,vshader);
  let fragmentShader=loadShader(gl,gl.FRAGMENT_SHADER,fshader);
  if(!vertextShader||!fragmentShader){
    return null;
  }

  let program=gl.createProgram();
  if(!program){
    return null;
  }

  gl.attachShader(program,vertextShader);
  gl.attachShader(program,fragmentShader);

  gl.linkProgram(program);

  let linked=gl.getProgramParameter(program,gl.LINK_STATUS);
  if(!linked){
    let err=gl.getProgramInfoLog(program);
    console.log('Failed to link program:'+err);
    gl.deleteProgram(program);
    gl.deleteShader(fragmentShader);
    gl.deleteShader(vertextShader);
    return null;
  }
  return program;
}

function loadShader(gl,type,source){
  let shader=gl.createShader(type);
  if(!shader){
    console.log('unable to create shader');
    return null;
  }

  gl.shaderSource(shader,source);

  gl.compileShader(shader);

  let compiled=gl.getShaderParameter(shader,gl.COMPILE_STATUS);

  if (!compiled) {
    let err = gl.getShaderInfoLog(shader);
    console.log('Failed to compile shader: ' + err);
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}
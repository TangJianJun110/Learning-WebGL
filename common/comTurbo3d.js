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

attribute vec4 a_Position;
attribute vec4 a_Translate;
void main(){
    gl_Position=a_Position+a_Translate;// 平移
    // gl_PointSize=2.0;
}
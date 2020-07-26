window.addEventListener('load',function(){
    console.log("加载完成");
    ajax({
        url:'./datas/content.json',
        success:function(res){
            console.log(res);
            if(res&&res.length>0){
                let leftBar=document.getElementById('left');
                let list=document.createElement('ul');
                list.classList.add('left_list');
                res.forEach(m=>{
                    let item=document.createElement('li');
                    item.classList.add('left_list_item');
                    item.data="./"+m.url;
                    item.textContent=m.title;
                    item.addEventListener('click',function(){
                        document.getElementById('wnd').src=item.data;
                    })
                    list.appendChild(item);
                })
                leftBar.appendChild(list);
            }
        }
    })
  });
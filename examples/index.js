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
                let i=0;
                res.forEach(m=>{
                    let item=document.createElement('li');
                    item.classList.add('left_list_item');
                    item.data="./"+m.url;
                    item.textContent=m.title;
                    item.addEventListener('click',function(){
                        list.childNodes.forEach(item=>{
                            item.classList.remove('selected');
                        })
                        item.classList.add('selected');
                        document.getElementById('wnd').src=item.data;
                    })
                    if(i===0){
                        item.classList.add('selected')
                    }
                    list.appendChild(item);
                    i++;
                })
                list.children[0].click();
                leftBar.appendChild(list);
            }
        }
    })
  });
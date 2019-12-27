
var count=0;
var count1=0;
var Bookcategory=document.getElementsByClassName('BookCategory');
var subcategory=document.getElementsByClassName('SubCategory');
var category=document.getElementsByClassName('category');
function toggle(){
  
  count++;
  if(count%2!=0){
    for(var i=0;i<subcategory.length;i++)
       subcategory[i].style.display='block';
    for(var i=0;i<category.length;i++)
       category[i].style.display='none';
    
  }
  else{
    for(var i=0;i<subcategory.length;i++)
     subcategory[i].style.display='none';
    for(var i=0;i<category.length;i++)
     category[i].style.display='block';
    
  }
  }
function toggle2(){
  count1++;
  if(count1%2!=0){
    for(var i=0;i<Bookcategory.length;i++)
     Bookcategory[i].style.display='block';
    for(var i=0;i<subcategory.length;i++) 
     subcategory[i].style.display='none';
    }
  else{
    for(var i=0;i<Bookcategory.length;i++)
     Bookcategory[i].style.display='none';
    for(var i=0;i<subcategory.length;i++)
     subcategory[i].style.display='block';
    
  }
  }
function openslidemenu(){
  document.getElementById('menu').style.width='250px';
  document.getElementById('open').style.display='none';
  document.getElementById('container').style.paddingLeft='250px';
}
function closeslidemenu(){
  document.getElementById('menu').style.width='0px';
  document.getElementById('open').style.display='block';
  document.getElementById('container').style.paddingLeft='0px';
}

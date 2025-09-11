const KEY='todos';
const setCookie=(k,v,d=365)=>document.cookie=`${k}=${encodeURIComponent(v)}; expires=${new Date(Date.now()+d*864e5).toUTCString()}; path=/`;
const getCookie=k=>document.cookie.split('; ').find(x=>x.startsWith(k+'='))?.split('=')[1]||'';

let todos=[];
const render=()=>{
  const box=$('#ft_list').empty();
  todos.forEach((t,i)=>{
    $('<div>').addClass('todo').text(t).attr('title','Click to remove')
      .on('click',()=>{ if(confirm(`Remove this TODO?\n\n${t}`)){ todos.splice(i,1); setCookie(KEY,JSON.stringify(todos)); render(); }})
      .prependTo(box); // newest on top
  });
};
try{ todos=JSON.parse(decodeURIComponent(getCookie(KEY))||'[]')||[]; }catch{ todos=[]; }
render();

$('#new').on('click',()=>{
  const t=prompt('New TODO:');
  if(t && t.trim()){ todos.push(t.trim()); setCookie(KEY,JSON.stringify(todos)); render(); }
});

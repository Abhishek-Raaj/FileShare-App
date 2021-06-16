let drag=document.querySelector('.logo');
let fileinput=document.querySelector('.fileinput');
let browse=document.querySelector('.browse');
const browseurl=document.querySelector('.urllink');
const progress=document.querySelector('.progress');
const percent=document.querySelector('.percent');
const copy=document.querySelector('.copy');
const urlvalue=document.querySelector('.urlvalue');
const progress_container=document.querySelector('.progress_container');
const url="http://localhost:4000/api/files";
drag.addEventListener('dragover',(e)=>{
    e.preventDefault();
    if(!drag.classList.contains('abc'))
    drag.classList.add('abc');
    
});
drag.addEventListener('dragleave',(e)=>{
    // if(drag.classList.contains('abc'))
    e.preventDefault();
    drag.classList.remove('abc');
    
});
fileinput.addEventListener('change',(e)=>{
    e.preventDefault();
    upload();
})
drag.addEventListener('drop',(e)=>{
    e.preventDefault();
    drag.classList.remove('abc');
    const file=e.dataTransfer.files;
    // console.log(file);
    if(file.length>1)
    {
        fileinput.files=file;
        upload();
    }

    
});
browse.addEventListener('click',(e)=>{
    e.preventDefault();
    fileinput.click();

})

const upload=()=>{
    const files=fileinput.files[0];
    const formdata=new FormData();
    formdata.append("myfile",files); 
    // fetch(url,{method: 'post',
    // mode: 'cors',
    // credentials: 'same-origin',
    // body:formdata,

    // }).
    // then((res)=>{
    //     return res.json();
    // }).
    // then((result)=>{
    //     browseurl.innerText=result.file;
    //     browseurl.style.display="block"
    //      console.log(result.file);
    // }).
    // catch((error)=>{
    //     console.log(error.message);
    // })
    const xhr=new XMLHttpRequest();
    xhr.onreadystatechange=()=>{
        if(xhr.readyState==XMLHttpRequest.DONE)
        {
            progress_container.style.display="none";
             const result=JSON.parse(xhr.response);
             console.log(result);
             urlvalue.value=result.file;
              browseurl.style.display="block" ; 
        }

    }
    xhr.upload.onprogress=updateprogress;
    xhr.open("POST",url);
    // xhr.setRequestHeader("Content-type", "application/form-data");
    xhr.send(formdata);

}

const updateprogress=(e)=>{
    progress_container.style.display="block";
   const per=(e.loaded/e.total)*100;
   percent.innerText=`${per}%`;
    progress.style.width=`${per}%`;
    console.log(e);
}
copy.addEventListener('click',()=>{
    urlvalue.select();
     document.execCommand('copy');
})

let Addbtn = document.getElementById('addBtn')
let TitelInput = document.getElementById('titelInput')
let DesInput = document.getElementById('desInput')
let Tbody = document.getElementById('tbody')
let alertText = document.getElementById('warning')
let audio = document.querySelector('audio')
let Delete = document.getElementById('delete')
let Cancel = document.getElementById('cancel')
let Update = document.getElementById('update')


Cancel.addEventListener('click', ()=>{

        document.getElementById('modify').value = "";
        document.getElementById('textarea').value = "";
    document.getElementById('modifyDiv').classList.add('visually-hidden')


})

Update.addEventListener('click', function(){

    upgradeData()
    
})






Addbtn.addEventListener('click', addedItem)

// simple empty array diclaration

if(!localStorage.getItem('todo')){

    let newarray =[];
    localStorage.setItem('todo', JSON.stringify(newarray))
}





//this fuction just looping hol todoitem

let loopTodo = ()=>{


    // just simple empty innerhtml for duplicating problem
    Tbody.innerHTML = ""

 // serial number initializ stage and get localstorage for working   
let serial = 1
let currentItem = JSON.parse(localStorage.getItem('todo'))

//looping every loacalstroge item for showing danamically     

currentItem.forEach((valu,index)=>{

//new tbody make for every local storage obeject
        Tbody.innerHTML += `<tr id="single" data-itemID="${index}">
        <td scope="row" class="text-dark fw-bolder">${serial}</td>
        <td class="text-light fs-5">${valu.titel}</td>
        <td class="text-light fs-5 f-">${valu.desc}</td>
        <td>
        <button id="editbtn"  class="btn btn-primary me-3 p-2">Edit</button> 
        <button id="deletbtn"  class="btn btn-danger p-2">Delete</button> 
        </td>

      </tr>`

      serial++
  

    })
//deletetod fuction call in looping for every delete buttom get this fuction
    deltetod()
    editbutton()
    

    
   

    

}




// add item button fuction diclaration here and all functionality
function addedItem(){


    //getting all input value whats type by user
    let titelValue = TitelInput.value
    let desValue = DesInput.value

//alert user if input field is blank
    if(titelValue === "" || desValue === ""){
        alert('please add todo')

    }else{

        //value of input storage in object and push them in local storage array
        let myobj = {

            titel:titelValue,
            desc:desValue
        }
        let currentTodo = JSON.parse(localStorage.getItem('todo'))

        currentTodo.push(myobj)
    
        localStorage.setItem('todo',JSON.stringify(currentTodo))

    }

    //local storage is empty checkig this condition and allert a danger massage

    let currentTodos = JSON.parse(localStorage.getItem('todo'))


        // just after input and add button click clear the input field
        TitelInput.value = ""
        DesInput.value=""


     //sound codition apply by its length
   isplaying = false

   if(currentTodos.length === 0 ){
    audio.pause()
 
       alertText.innerText = "Please Insert Your Todo"
   }else{
       audio.currentTime = 0
       audio.play()

       alertText.innerText=""
 

   }
//loop function call here for dynamicall showing localstorage value without refreshing
   
   
    loopTodo()



}

//delete button diclaration and all functionality
function deltetod(){

    //get all delete button id
    let singleTr = document.querySelectorAll('#single')

    //looping into all delete buttom
    singleTr.forEach((value)=>{
        //add eventlistener 
        value.querySelector('#deletbtn').addEventListener('click', ()=>{
            //get item asa object from localstorage from string
             let newdata=JSON.parse(localStorage.getItem('todo'))
    
             //get cliked delete button data-attribute by converting number
           let clickedItem = Number(value.getAttribute('data-itemId'))
    
           //diclar new array using filter method for without deleting item
           let deltearray = newdata.filter((item,index)=>{
                return index !== clickedItem
           })

           //delete sound function just play
           Delete.currentTime = 0 
           Delete.play()
           
           //new array send to localstorage just show without delete clicking item
           localStorage.setItem('todo',JSON.stringify(deltearray))


           //render loop for refresh just html item 
           loopTodo()

          
    
    
        })
    })



}

//all eidt functinality
function editbutton(){



 //get all edit button id
 let tbody = document.querySelectorAll('#single')

 //looping into all delete buttom
 tbody.forEach((value)=>{
     //add eventlistener 
     value.querySelector('#editbtn').addEventListener('click', function(){
         //get item asa object from localstorage from string
          let newdata=JSON.parse(localStorage.getItem('todo'))
 
          //get cliked delete button data-attribute by converting number
        let clickedItem = Number(value.getAttribute('data-itemId'))


        
        
       
        //delete sound function just play
        Delete.currentTime = 0 
        Delete.play()

        //get todo value into input dialog field for edit
        document.getElementById('modify').value = newdata[clickedItem].titel 
        document.getElementById('textarea').value = newdata[clickedItem].desc
        document.getElementById('modifyDiv').classList.remove('visually-hidden')

        document.getElementById('arrayindex').value = clickedItem
        
       
 
 
     })
 })
}


editbutton()


function upgradeData(){

    let newdata=JSON.parse(localStorage.getItem('todo'))

    let editTitel = document.getElementById('modify').value
    let descitem = document.getElementById('textarea').value

    let currrentIndex = document.getElementById('arrayindex').value

    let newobj = {

        titel:editTitel,
        desc:descitem
    }

    newdata[currrentIndex] = newobj


localStorage.setItem('todo', JSON.stringify(newdata))

    document.getElementById('modifyDiv').classList.add('visually-hidden')
    document.getElementById('modify').value = ''
    document.getElementById('textarea').value=''

    loopTodo()


}

loopTodo()
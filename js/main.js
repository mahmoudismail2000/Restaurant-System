/// <reference types="../@types/jquery" />

let nameRegex=/^[a-zA-Z]{0,100}$/;
let emailRegex=/^[a-z][a-zA-Z0-9]{0,100}[#$%&*-_+]?([a-z][a-zA-Z0-9]{0,100})?@(gmail|yahoo).com$/;
let phoneRegex=/^(\+2)?01[0125][0-9]{8}$/;
let ageRegex=/^[1-9][0-9]{0,2}$/;
let passwordRegex=/^[a-zA-Z]{8,100}([0-9]|[!#$%^&*_\-\/*])+$/;




let closeBtn=false
$('#closeNavbar').on('click',function(e){
    $('.links a').slideUp(500)
    if(closeBtn==true){
        $('#navbarId').animate({'left':`-${($('#navbarId').outerWidth(true))-($('#navSideId').outerWidth(true))}`},1000)
        e.target.classList.replace('fa-xmark','fa-bars') 
        $('.links a').slideUp(500)
        closeBtn=false
    }else{
        $('#navbarId').animate({'left':`0px`},1000)
        e.target.classList.replace('fa-bars','fa-xmark')
        $('.links a').slideDown(1000)
        
        closeBtn=true
    }
    
})

$('#categoriesNavId').on('click',function(){
    $('#headerId').hide()
    $('#search').hide()
    $('#mealDetails').hide()
    $('#ingredients').hide()
    $('#area').hide()
    $('#contactUs').hide()
    $('#categories').show()
    $('body').addClass('overflow-hidden')
    $('#loading').removeClass('d-none')
    $('#loading').css('z-index',"8")
    
    setTimeout(function(){ 
        $('body').removeClass('overflow-hidden')
        document.getElementById('loading').classList.replace('d-block',"d-none")
        
    
        },500)
        

})

async function headerData(){
    let data =await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
    let response=await data.json()
    let allResponse=response.meals
    displayMeals(allResponse)
    clearInterval(1)
    $('#mealDetails').hide()
    $('#contactUs').hide()
    $('#categories').hide()
    $('#search').hide()
    $('#area').hide()
    $('#ingredients').hide()
    let imgs=document.querySelectorAll('.boxImg')
    $(imgs).on('click',function(e){
        $('body').addClass('overflow-hidden')
        $('#loading').removeClass('d-none')
        $('#loading').css('z-index',"8")
        
        $('#headerId').hide()
        $('#search').hide()
        $('#mealDetails').show()
        let indexOfBlock=e.target.getAttribute('imgid')
        mealsDetails(allResponse,indexOfBlock)
        setTimeout(function(){ 
            $('body').removeClass('overflow-hidden')
            document.getElementById('loading').classList.replace('d-block',"d-none")
            
        
            },500)
        
        
    })
}

headerData()

async function catSection(){
    let dataCategories=await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    let categoriesResponse=await dataCategories.json()
    let allCategoriesResponse=categoriesResponse.categories
    displayAllCat(allCategoriesResponse)
    let imgsCat=document.querySelectorAll('.boxImgCat')
    $(imgsCat).on('click',async function(e){
        $('body').addClass('overflow-hidden')
        $('#loading').removeClass('d-none')
        $('#loading').css('z-index',"8")
        let dataOfCatFilter=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${e.target.getAttribute('catName')}`)
        let catFilterResponse=await dataOfCatFilter.json()
        displayMeals(catFilterResponse.meals)
        
    $('#search').hide()
    $('#mealDetails').hide()
    $('#ingredients').hide()
    $('#area').hide()
    $('#contactUs').hide()
    $('#categories').hide()
        
        $('#headerId').show()
        setTimeout(function(){ 
            $('body').removeClass('overflow-hidden')
            document.getElementById('loading').classList.replace('d-block',"d-none")
            
        
            },500)
        
        
    
        
        let imgsCatOf=document.querySelectorAll('.boxImg')
        $(imgsCatOf).on('click',async function(e){
            $('body').addClass('overflow-hidden')
        $('#loading').removeClass('d-none')
        $('#loading').css('z-index',"8")
        let nameMeal=e.target.getAttribute('namemeal')
        let dataOfDetailsFilter=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${nameMeal}`)
        let responseOfDetailsFilter=await dataOfDetailsFilter.json()
        let nameResponse=responseOfDetailsFilter.meals
        $('#categories').hide()
        $('#headerId').hide()
        $('#categories').hide()
        $('#area').hide()
        $('#mealDetails').show()
        
        mealsDetails(nameResponse)
        setTimeout(function(){ 
            $('body').removeClass('overflow-hidden')
            document.getElementById('loading').classList.replace('d-block',"d-none")
            
        
            },500)
        
         
    })
        
    })
    
}
catSection()

function displayMeals(dataMeals){
    let cartona=``
    for(let i=0;i<dataMeals.length;i++){
        cartona+=`
        <div class="col-md-3">
                    <div class="boxImg position-relative overflow-hidden" imgid="${i}" namemeal='${dataMeals[i].strMeal}'>
                        <img src="${dataMeals[i].strMealThumb}" alt="" class="w-100" imgid="${i}" namemeal='${dataMeals[i].strMeal}'>
                        <div class="boxStyle d-flex align-items-center ps-2" imgid="${i}" namemeal='${dataMeals[i].strMeal}'>
                            <h3 namemeal='${dataMeals[i].strMeal}' imgid="${i}">${dataMeals[i].strMeal}</h3>
                        </div>
                    </div>
                </div>
        
        `

    }
    document.getElementById('rowId').innerHTML=cartona
}

function mealsDetails(details,i){
    let flagNum=0
    if(i>=0){
        flagNum=i
        console.log(i);

    }else{
        flagNum=0
    }
   
        let cartona=`
        <div class="col-md-4">
                   <div>
                    <img src="${details[flagNum].strMealThumb}" class="w-100" alt="">
                    <h3 class="mt-3">${details[flagNum].strMeal}</h3>
                   </div>
                </div>
                <div class="col-md-8">
                    <h2 class="fw-bold">Instructions</h2>
                    <p>${details[flagNum].strInstructions}</p>
                    <h3>Area : <span>${details[flagNum].strArea}</span></h3>
                    <h3>Category  : <span>${details[flagNum].strCategory}</span></h3>
                    <h3>Recipes :</h3>
                    <ul class="list-unstyled d-flex flex-wrap">
                    
                    ${details[flagNum].strIngredient1!=""?`<li class="alert alert-info"> ${details[flagNum].strIngredient1!=""?details[flagNum].strMeasure1+' '+details[flagNum].strIngredient1:""}</li>`:""}
                    ${details[flagNum].strIngredient2!=""?`<li class="alert alert-info"> ${details[flagNum].strIngredient2!=""?details[flagNum].strMeasure2+' '+details[flagNum].strIngredient2:""}</li>`:""}
                    ${details[flagNum].strIngredient3!=""?`<li class="alert alert-info"> ${details[flagNum].strIngredient3!=""?details[flagNum].strMeasure3+' '+details[flagNum].strIngredient3:""}</li>`:""}
                    ${details[flagNum].strIngredient4!=""?`<li class="alert alert-info"> ${details[flagNum].strIngredient4!=""?details[flagNum].strMeasure4+' '+details[flagNum].strIngredient4:""}</li>`:""}
                    ${details[flagNum].strIngredient5!=""?`<li class="alert alert-info"> ${details[flagNum].strIngredient5!=""?details[flagNum].strMeasure5+' '+details[flagNum].strIngredient5:""}</li>`:""}
                    ${details[flagNum].strIngredient6!=""?`<li class="alert alert-info"> ${details[flagNum].strIngredient6!=""?details[flagNum].strMeasure6+' '+details[flagNum].strIngredient6:""}</li>`:""}
                    ${details[flagNum].strIngredient7!=""?`<li class="alert alert-info"> ${details[flagNum].strIngredient7!=""?details[flagNum].strMeasure7+' '+details[flagNum].strIngredient7:""}</li>`:""}
                    ${details[flagNum].strIngredient8!=""?`<li class="alert alert-info"> ${details[flagNum].strIngredient8!=""?details[flagNum].strMeasure8+' '+details[flagNum].strIngredient8:""}</li>`:""}
                    ${details[flagNum].strIngredient9!=""?`<li class="alert alert-info"> ${details[flagNum].strIngredient9!=""?details[flagNum].strMeasure9+' '+details[flagNum].strIngredient9:""}</li>`:""}
                    ${details[flagNum].strIngredient10!=""?`<li class="alert alert-info"> ${details[flagNum].strIngredient10!=""?details[flagNum].strMeasure10+' '+details[flagNum].strIngredient10:""}</li>`:""}
                    ${details[flagNum].strIngredient11!=""?`<li class="alert alert-info"> ${details[flagNum].strIngredient11!=""?details[flagNum].strMeasure11+' '+details[flagNum].strIngredient11:""}</li>`:""}
                    ${details[flagNum].strIngredient12!=""?`<li class="alert alert-info"> ${details[flagNum].strIngredient12!=""?details[flagNum].strMeasure12+' '+details[flagNum].strIngredient12:""}</li>`:""}
                    ${details[flagNum].strIngredient13!=""?`<li class="alert alert-info"> ${details[flagNum].strIngredient13!=""?details[flagNum].strMeasure13+' '+details[flagNum].strIngredient13:""}</li>`:""}
                    ${details[flagNum].strIngredient14!=""?`<li class="alert alert-info"> ${details[flagNum].strIngredient14!=""?details[flagNum].strMeasure14+' '+details[flagNum].strIngredient14:""}</li>`:""}
                    ${details[flagNum].strIngredient15!=""?`<li class="alert alert-info"> ${details[flagNum].strIngredient15!=""?details[flagNum].strMeasure15+' '+details[flagNum].strIngredient15:""}</li>`:""}
                    ${details[flagNum].strIngredient16!=""?`<li class="alert alert-info"> ${details[flagNum].strIngredient16!=""?details[flagNum].strMeasure16+' '+details[flagNum].strIngredient16:""}</li>`:""}
                    ${details[flagNum].strIngredient17!=""?`<li class="alert alert-info"> ${details[flagNum].strIngredient17!=""?details[flagNum].strMeasure17+' '+details[flagNum].strIngredient17:""}</li>`:""}
                    ${details[flagNum].strIngredient18!=""?`<li class="alert alert-info"> ${details[flagNum].strIngredient18!=""?details[flagNum].strMeasure18+' '+details[flagNum].strIngredient18:""}</li>`:""}
                    ${details[flagNum].strIngredient19!=""?`<li class="alert alert-info"> ${details[flagNum].strIngredient19!=""?details[flagNum].strMeasure19+' '+details[flagNum].strIngredient19:""}</li>`:""}
                    ${details[flagNum].strIngredient20!=""?`<li class="alert alert-info"> ${details[flagNum].strIngredient20!=""?details[flagNum].strMeasure20+' '+details[flagNum].strIngredient20:""}</li>`:""}
                    

                    </ul>
                    <h3>Tags :</h3>
                    <ul class="list-unstyled d-flex flex-wrap">
                    
                    ${details[flagNum].strTags!=null?`<li class="alert alert-danger"> ${details[flagNum].strTags}</li>`:""}
                    </ul>
                    <div>
                        <a class="btn btn-success me-2" target="_blank" href="${details[flagNum].strSource}">Source</a>
                        <a class="btn btn-danger" id="you" target="_blank" href="${details[flagNum].strYoutube}">YouTube</a>
                    </div>
                </div>
        
        `
    document.getElementById('rowDetailsId').innerHTML=cartona 
    
    
}

function displayAllCat(cat){
    let cartona=``
    for(let i=0;i<cat.length;i++){
        cartona+=`
        <div class="col-md-3">
                    <div class="boxImgCat position-relative overflow-hidden" catname="${cat[i].strCategory}">
                        <img src="${cat[i].strCategoryThumb}" alt="" class="w-100" catname="${cat[i].strCategory}">
                        <div class="boxStyleCat d-flex flex-column align-items-center ps-2" catname="${cat[i].strCategory}">
                            <h3 class="mt-3">${cat[i].strCategory}</h3>
                            <p catname="${cat[i].strCategory}">${cat[i].strCategoryDescription.split(' ').slice(0,20).join(' ')}</p>
                        </div>
                    </div>
                </div>
        
        `

    }
    document.getElementById('rowCategoriesId').innerHTML=cartona
}



$('#searchNavID').on('click',function(){
    $('body').addClass('overflow-hidden')
    $('#loading').removeClass('d-none')
    $('#loading').css('z-index',"8")
    $('#headerId').hide()
    $('#mealDetails').hide()
    $('#ingredients').hide()
    $('#area').hide()
    $('#contactUs').hide()
    $('#categories').hide()
    $('#search').removeClass('d-none')
    $('#search').show()
    setTimeout(function(){ 
        $('body').removeClass('overflow-hidden')
        document.getElementById('loading').classList.replace('d-block',"d-none")
        
    
        },500)
})


$('#searchName').on('keyup',async function(){ 
    $('body').addClass('overflow-hidden')
    $('#loading').removeClass('d-none')
    $('#loading').css({'z-index':"8","top":"100px","background-color":"#0D0D0D"})

    
   if($('#searchName').val().length>0){
    let dataSearchName=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${$('#searchName').val()}`)
    let response=await dataSearchName.json()
    displaySearchName(response.meals)
    setTimeout(function(){ 
        $('body').removeClass('overflow-hidden')
        document.getElementById('loading').classList.replace('d-block',"d-none")
        
    
        },500)
    let searchMeals=document.querySelectorAll('.boxImg')
    $(searchMeals).on('click',function(e){
        $('body').addClass('overflow-hidden')
    $('#loading').removeClass('d-none')
    $('#loading').css({'z-index':"8"})
        mealsDetails(response.meals,e.target.getAttribute('imgid'))
        setTimeout(function(){ 
            $('body').removeClass('overflow-hidden')
            document.getElementById('loading').classList.replace('d-block',"d-none")
            
        
            },500)
        

        $('#headerId').hide()
    $('#search').hide()
    $('#ingredients').hide()
    $('#area').hide()
    $('#contactUs').hide()
    $('#categories').hide()
    $('#mealDetails').show()
        
})
   }else{
    $('#rowSearchNameId').html(" ")
}
})

$('#searchFirstLetter').on('keyup',async function(){
    $('body').addClass('overflow-hidden')
    $('#loading').removeClass('d-none')
    $('#loading').css({'z-index':"8","top":"100px","background-color":"#0D0D0D"})
    if($('#searchFirstLetter').val().length>0){
        let dataSearchLetter=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${$('#searchFirstLetter').val()}`)
    let response=await dataSearchLetter.json()
    displaySearchName(response.meals)
    setTimeout(function(){ 
        $('body').removeClass('overflow-hidden')
        document.getElementById('loading').classList.replace('d-block',"d-none")
        
    
        },500)
    let searchMeals=document.querySelectorAll('.boxImg')
    $(searchMeals).on('click',function(e){
        $('body').addClass('overflow-hidden')
    $('#loading').removeClass('d-none')
    $('#loading').css({'z-index':"8"})
        mealsDetails(response.meals,e.target.getAttribute('imgid'))
        setTimeout(function(){ 
            $('body').removeClass('overflow-hidden')
            document.getElementById('loading').classList.replace('d-block',"d-none")
            
        
            },500)
            $('#headerId').hide()
            $('#search').hide()
            $('#ingredients').hide()
            $('#area').hide()
            $('#contactUs').hide()
            $('#categories').hide()
            $('#mealDetails').show()
        
})
    }else{
        $('#rowSearchNameId').html(" ")
    }




})
function displaySearchName(dataSearchMeals){
    let cartona=``
    for(let i=0;i<dataSearchMeals.length;i++){
        cartona+=`
        <div class="col-md-3">
                    <div class="boxImg position-relative overflow-hidden" imgid="${i}" namemeal='${dataSearchMeals[i].strMeal}'>
                        <img src="${dataSearchMeals[i].strMealThumb}" alt="" class="w-100" imgid="${i}" namemeal='${dataSearchMeals[i].strMeal}'>
                        <div class="boxStyle d-flex align-items-center ps-2" imgid="${i}" namemeal='${dataSearchMeals[i].strMeal}'>
                            <h3 namemeal='${dataSearchMeals[i].strMeal}'>${dataSearchMeals[i].strMeal}</h3>
                        </div>
                    </div>
                </div>
        
        `

    }
    document.getElementById('rowSearchNameId').innerHTML=cartona
}


function displayAreaMeals(dataArea){
    cartona=``
    for(let i=0;i<dataArea.length;i++){
        cartona+=`
        <div class="col-md-3">
                    <div class="d-flex py-4 flex-column align-items-center areaClick" area=${dataArea[i].strArea}>
                        <i class="fa-solid fa-house-laptop fa-4x" area=${dataArea[i].strArea}></i>
                        <h3 area=${dataArea[i].strArea}>${dataArea[i].strArea}</h3>
                    </div>
                </div>
        `
        
    }
    document.getElementById('rowAreaId').innerHTML=cartona

}


$('#areaNavId').on('click',async function(){
    $('body').addClass('overflow-hidden')
        $('#loading').removeClass('d-none')
        $('#loading').css('z-index',"8")
    $('#headerId').hide()
    $('#categories').hide()
    $('#search').hide()
    $('#mealDetails').hide()
    $('#contactUs').hide()
    $('#ingredients').hide()
    $('#area').show()
    
   
    
    
    let dataOfArea=await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
    let responseOfArea=await dataOfArea.json()
    displayAreaMeals(responseOfArea.meals)
    setTimeout(function(){ 
        $('body').removeClass('overflow-hidden')
        document.getElementById('loading').classList.replace('d-block',"d-none")
        
    
        },500)
    $('.areaClick').on('click',async function(e){
        $('body').addClass('overflow-hidden')
        $('#loading').removeClass('d-none')
        $('#loading').css('z-index',"8")
        let dataOfAreaMeals=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${e.target.getAttribute('area')}`)
        let responseOfAreaMeals=await dataOfAreaMeals.json()
        console.log(responseOfAreaMeals.meals);
        displayMeals(responseOfAreaMeals.meals)
        $('#area').hide()
        $('#headerId').show()
        setTimeout(function(){ 
            $('body').removeClass('overflow-hidden')
            document.getElementById('loading').classList.replace('d-block',"d-none")
            
        
            },500)
        $('.boxImg').on('click',async function(e){
            $('body').addClass('overflow-hidden')
        $('#loading').removeClass('d-none')
        $('#loading').css('z-index',"8")
            let dataOfChooseMeals=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${e.target.getAttribute('namemeal')}`)
            let responseOfDetailsFilter=await dataOfChooseMeals.json()
            let meal=responseOfDetailsFilter.meals
            mealsDetails(meal)
            $('#headerId').hide()
            $('#mealDetails').show()
            setTimeout(function(){ 
                $('body').removeClass('overflow-hidden')
                document.getElementById('loading').classList.replace('d-block',"d-none")
                
            
                },500)
    
        })
    })
})

$('#ingredientsNavId').on('click',async function(){
    $('body').addClass('overflow-hidden')
    $('#loading').removeClass('d-none')
    $('#loading').css('z-index',"8")
    $('#headerId').hide()
    $('#area').hide()
    $('#mealDetails').hide()
    $('#ingredients').show()
    $('#categories').hide()
    $('#search').hide()
    $('#contactUs').hide()
    setTimeout(function(){ 
        $('body').removeClass('overflow-hidden')
        document.getElementById('loading').classList.replace('d-block',"d-none")
        
    
        },500)
    let ingsBox=document.querySelectorAll('.Ing')
    $(ingsBox).on('click',async function(e){
        $('body').addClass('overflow-hidden')
    $('#loading').removeClass('d-none')
    $('#loading').css('z-index',"8")
        console.log(e.target);
        let dataIngFilter=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${e.target.getAttribute('nameing')}`)
        let responseIngFilter=await dataIngFilter.json()
        console.log(responseIngFilter.meals);
        displayMeals(responseIngFilter.meals)
        $('#ingredients').hide()
        $('#headerId').show()
        setTimeout(function(){ 
            $('body').removeClass('overflow-hidden')
            document.getElementById('loading').classList.replace('d-block',"d-none")
            
        
            },500)
        $('.boxImg').on('click',async function(e){
            $('body').addClass('overflow-hidden')
    $('#loading').removeClass('d-none')
    $('#loading').css('z-index',"8")
            console.log(e.target);
            let dataIngDetails=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${e.target.getAttribute('namemeal')}`)
            let responseIngDetails=await dataIngDetails.json()
            
            mealsDetails(responseIngDetails.meals)
            $('#ingredients').hide()
        $('#headerId').hide()
        $('#mealDetails').show()
        setTimeout(function(){ 
            $('body').removeClass('overflow-hidden')
            document.getElementById('loading').classList.replace('d-block',"d-none")
            
        
            },500)
        

        })

    })
    
    
    
})

async function dataIngredients(){
    let dataIng=await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    let responseIng=await dataIng.json()
    displayIngredients(responseIng.meals.slice(0,20))
}
dataIngredients()
function displayIngredients(data){
    let cartona=``
    for(let i=0;i<data.length;i++){
        cartona+=`
        <div class="col-md-3">
                    <div class="Ing d-flex flex-column align-items-center py-3" nameing=${data[i].strIngredient}>
                        <i class="fa-solid fa-drumstick-bite fa-4x" nameing=${data[i].strIngredient}></i>
                        <h3 nameing=${data[i].strIngredient}>${data[i].strIngredient}</h3>
                        <p class="text-center" nameing=${data[i].strIngredient}>${data[i].strDescription.split(' ').slice(0,20).join(' ')}</p>

                    </div>
                </div>
        
        `

    }
    document.getElementById('rowIngredientsId').innerHTML=cartona
}

let nameUser=document.getElementById('nameUser')
let email=document.getElementById('emailUser')
let phone=document.getElementById('phoneUser')
let age=document.getElementById('ageUser')
let password=document.getElementById('passwordUser')
let rePassword=document.getElementById('repasswordUser')
let nameAlert=document.getElementById('nameAlert')
let emailAlert=document.getElementById('emailAlert')
let phoneAlert=document.getElementById('phoneAlert')
let ageAlert=document.getElementById('ageAlert')
let passwordAlert=document.getElementById('passwordAlert')
let repasswordAlert=document.getElementById('repasswordAlert')
let successBtn=document.getElementById('successBtn')

$('#contactUsNavId').on('click',function(){
    $('body').addClass('overflow-hidden')
    $('#loading').removeClass('d-none')
    $('#loading').css('z-index',"8")
    $('#headerId').hide()
    $('#categories').hide()
    $('#search').hide()
    $('#mealDetails').hide()
    $('#ingredients').hide()
    $('#area').hide()
    $('#contactUs').show()
    setTimeout(function(){ 
        $('body').removeClass('overflow-hidden')
        document.getElementById('loading').classList.replace('d-block',"d-none")
        
    
        },500)
})
nameUser.addEventListener('keyup',function(){
    
    if(nameUser.value.length>0&&nameRegex.test(nameUser.value)){
        nameAlert.classList.replace('d-block','d-none')

    }else{
        nameAlert.classList.replace('d-none','d-block')
    }
})
email.addEventListener('keyup',function(){
 
    if(email.value.length>0&&emailRegex.test(email.value)){
        emailAlert.classList.replace('d-block','d-none')

    }else{
        emailAlert.classList.replace('d-none','d-block')
    }
})
phone.addEventListener('keyup',function(){
   
    if(phone.value.length>0&&phoneRegex.test(phone.value)){
        phoneAlert.classList.replace('d-block','d-none')

    }else{
        phoneAlert.classList.replace('d-none','d-block')
    }
})
age.addEventListener('keyup',function(){
    
    if(age.value.length>0&&ageRegex.test(age.value)){
        ageAlert.classList.replace('d-block','d-none')

    }else{
        ageAlert.classList.replace('d-none','d-block')
    }
})
password.addEventListener('keyup',function(){
    if(password.value.length>0&&passwordRegex.test(password.value)){
        passwordAlert.classList.replace('d-block','d-none')

    }else{
        passwordAlert.classList.replace('d-none','d-block')
    }
})
rePassword.addEventListener('keyup',function(){
    if(rePassword.value===password.value){
        repasswordAlert.classList.replace('d-block','d-none')

    }else{
        repasswordAlert.classList.replace('d-none','d-block')
    }
    
})
$('#contactUs input').on('keyup',function(){
    if(nameRegex.test(nameUser.value)&&emailRegex.test(email.value)&&phoneRegex.test(phone.value)&&ageRegex.test(age.value)&&passwordRegex.test(password.value)&&rePassword.value===password.value){
        $('#btnSubmit').removeClass('disabled')
        $('#btnSubmit').on('click',function(){
            nameUser.value="";
            email.value="";
            phone.value="";
            age.value="";
            password.value="";
            rePassword.value="";
            successBtn.classList.replace('d-none','d-block')
            setTimeout(function(){
                successBtn.classList.replace('d-block','d-none')
            },2000)
            $('#btnSubmit').addClass('disabled')
            
        })
    }else{
        $('#btnSubmit').addClass('disabled')
    }

})


$(function(){
    setInterval(function(){
        $('body').removeClass('overflow-hidden')
        $('#loading').addClass('d-none')
        

    },500)
})
new WOW().init();


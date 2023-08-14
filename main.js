let searchBtn=document.querySelector(".search-part button"),
searchBInput=document.querySelector(".search-part input"),
mealBtns=document.querySelectorAll(".meal-btn"),
Cards=document.getElementsByClassName("card"),
resultContainer=document.querySelector(".result"),
searchPart=document.querySelector(".search-part"),
lightContainer=document.querySelector(".light-container"),
mainBody=document.querySelector(".main"),
lightBall=document.querySelector(".ball");

const getData=()=>{
    if(searchBInput.value===""){
        resultContainer.innerHTML=`<div class="false-data">please Enter food name </div>`
    }
    else{
        resultContainer.innerHTML="";
        let searchBInputValue=searchBInput.value.trim()
        let dataApi=`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchBInputValue}`;
        fetch(dataApi)
        .then((result)=>{
            
                return result.json();
        })
        .then((recipses)=>{
            recipses.meals.forEach((recipse) => {
                
                resultContainer.innerHTML+=`
                <div class="col-lg-3 col-md-6 col-sm-12">
                    <div class="card" >
                        <img src="${recipse.strMealThumb}" alt="image">
                        <div class="meal-discription">
                            <div class="meal-name">
                                ${recipse.strMeal}
                                
                            </div>
                            <button type="button" data-name="${recipse.strMeal}" class="meal-btn" >Details</button>
                        </div>
                    </div>
                </div>`
                
            })
            return recipses;
        })
        .catch((err)=>resultContainer.innerHTML=`<div class="false-data">no data </div>`);
    }

    resultContainer.addEventListener("click",(e)=>{
        if(e.target.classList.contains("meal-btn")){
            let name=e.target.getAttribute("data-name");
            fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
            .then((res)=>{
                return res.json();

            })
            .then((responses)=>{
                responses.meals.forEach((respnse)=>{
                    e.target.parentElement.parentElement.classList.add("active");
                    let detailsContainer=document.createElement("div"),
                    close=document.createElement("div"),
                    detailsP=document.createElement("p"),
                    detailsPText=document.createTextNode(`${respnse.strInstructions}`);
                    closeText=document.createTextNode("x");
                    close.appendChild(closeText);
                    detailsContainer.setAttribute("class","details-container");
                    close.setAttribute("class","close");
                    detailsP.appendChild(detailsPText);
                    detailsContainer.appendChild(detailsP);
                    e.target.parentElement.parentElement.appendChild(detailsContainer);
                    e.target.parentElement.parentElement.appendChild(close);


                    close.onclick=()=>{
                        e.target.parentElement.parentElement.classList.remove("active");
                        detailsContainer.remove();
                        close.remove();
                    }
                })
                
            })
        }
    })
}
searchBtn.addEventListener("click",getData);

searchBInput.onfocus=()=>{

    let styleSheet=document.styleSheets[0];
    for (let i = 0; i < styleSheet.cssRules.length; i++) {
        let rule =styleSheet.cssRules[i];
        if (rule.selectorText === ".search-part") {
            rule.style.animation="go-to-up 1s ease-in-out 1s forwards"
        }
        else if (rule.selectorText === ".main h1") {
            rule.style.animation="disappear 1s ease-in-out forwards"
        }
    }
}

lightBall.onclick=()=>{
    lightContainer.classList.toggle("ball-active");
    if(lightContainer.classList.contains("ball-active")){
        mainBody.classList.add("main-light")
        document.querySelectorAll(".meal-name").forEach((e)=>{
            e.classList.remove("text-light");
            e.classList.add("text-dark");
        });
    }
    else{
        mainBody.classList.remove("main-light");
        document.querySelectorAll(".meal-name").forEach((e)=>{
            e.classList.remove("text-dark");
            e.classList.add("text-light");
        });
    }
}
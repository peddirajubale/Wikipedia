let searchInputEl = document.getElementById("searchInput")
let searchResultsEl = document.getElementById("searchResults")
let spinnerEl = document.getElementById('spinner')

function createAndAppendSearchResults(result){

    // creating result item

    let resultItem = document.createElement("div")
    resultItem.classList.add('result-item')
    searchResultsEl.appendChild(resultItem)

    // craating title 
    let {link, title,description}=result 

    let resultTitleEl = document.createElement('a')
    resultTitleEl.href = link 
    resultTitleEl.target = "_blank"
    resultTitleEl.textContent = title 
    resultTitleEl.classList.add('result-title')
    resultItem.appendChild(resultTitleEl)

    // creating break element

    let titleBreakEl = document.createElement('br')
    resultItem.appendChild(titleBreakEl)

    // creating link 

    
    let urlEl = document.createElement('a')
    urlEl.href = link 
    urlEl.target = "_blank"
    urlEl.textContent = link 
    urlEl.classList.add('result-url')
    resultItem.appendChild(urlEl)

    // creating break element 

    let linkBreakEl = document.createElement('br')
    resultItem.appendChild(linkBreakEl)

    // creating discription element

    let linkDiscription = document.createElement('p')
    linkDiscription.classList.add('link-discription')
    linkDiscription.textContent = description
    resultItem.appendChild(linkDiscription)
}

function displayResults(searchResults){
    // let result = searchResults[0]
    // createAndAppendSearchResults(result)

    spinnerEl.classList.toggle('d-none')

    for (let result of searchResults){
        createAndAppendSearchResults(result)
    }
}

function searchWikipedia(event){
    if(event.key=== "Enter"){
        spinnerEl.classList.toggle('d-none')
        searchResultsEl.textContent = ""
        let searchInputValue = searchInputEl.value 
        let url = "https://apis.ccbp.in/wiki-search?search="+searchInputValue 
        
        let options ={
            method:"GET"
        }

        fetch(url, options)
        .then(function(response){
            return response.json()
        })
        .then(function(jsonData){
            let {search_results} = jsonData 
            displayResults(search_results)
        })
    }
}

searchInputEl.addEventListener('keydown',searchWikipedia)
const search_bars = document.querySelectorAll(".search-bar");
const search_box = document.querySelector(".search-box");

function convertDate(date_structure){
    let date = "";
    let time = "";
    let day = "";
    let month = "";
    let year = "";
    let secs = "";
    let mins = "";
    let hours = "";

    if(date_structure.includes(" ")){
        let [date, time] = date_structure.split(" ");
        let [year, month, day] = date.split("-");
        let [hours, mins, secs] = time.split(":");

        return `${day}/${month}/${year} ${hours}:${mins}`;
    }
    else{
        let [year, month, day] = date_structure.split("-");

        return `${day}/${month}/${year}`;
    }
}

for(let input of search_bars){
    const search_btn = input.parentElement.querySelector(".search-btn");

    search_btn.addEventListener("click", function(){
        const search_text = input.value.trim();

        if(search_text != ""){
            search_box.classList.add("open-search-box");
            
            const search_results = document.querySelector(".search-results");
            
            while(search_results.firstChild) {
                search_results.removeChild(search_results.lastChild);
            }

            const formdata = new FormData;
            formdata.append("search-text", search_text);

            fetch("/backend/search-quiz.php", {
                method: "POST",
                body: formdata
            })
            .then(response => response.json())
            .then(data => {
                if (data.length == 1){
                    search_results.style.justifyContent = "flex-start";
                }
                else{
                    search_results.style.justifyContent = "space-evenly";
                }

                for (let quiz of data){
                    const item_box = document.createElement("div");
                    const feed_item = document.createElement("div");
                    const name_span = document.createElement("span");
                    const quiz_details = document.createElement("span");

                    feed_item.style.backgroundImage = `url(backend/${quiz["banner"]})`;
                    feed_item.setAttribute('quiz-id', quiz["id"]);
                    name_span.textContent = quiz["name"];
                    quiz_details.textContent = `${quiz["user_full_name"]} • ${convertDate(quiz["creation_date"])}`;

                    item_box.classList.add("item-box");
                    feed_item.classList.add("feed-item");
                    name_span.classList.add("name-span");
                    quiz_details.classList.add("quiz-details");

                    item_box.appendChild(feed_item);
                    item_box.appendChild(name_span);
                    item_box.appendChild(quiz_details);

                    search_results.appendChild(item_box);
                }
                
                if(search_results.childElementCount == 0){
                    const search_img = document.createElement("img");
                    search_img.src = "frontend/resources/search-img.svg";
                    search_img.classList.add("search-img");

                    const no_results_text = document.createElement("span");
                    no_results_text.textContent = "Ops! No matches found"
                    no_results_text.classList.add("no-results-text");

                    const no_results = document.createElement("div");
                    no_results.classList.add("no-results");

                    no_results.appendChild(search_img);
                    no_results.appendChild(no_results_text);

                    search_results.appendChild(no_results)
                }

                const quizzes = search_results.querySelectorAll(".feed-item");

                for(let quiz of quizzes){
                    quiz.addEventListener("click", function(event){
                        window.location.href = `frontend/quiz-submission.php?quiz-id=${event.target.getAttribute('quiz-id')}&user-id=${document.querySelector(".search-box").dataset.userId}`;
                    })
                }
            })
        }
    })
}

const close_search_box = document.querySelector("#close-search-box");
if(close_search_box){
    close_search_box.addEventListener("click", function(){
        search_box.classList.remove("open-search-box");
    })
}

search_box.addEventListener("click", function(event) {
    if (event.target === search_box) {
        search_box.classList.remove("open-search-box");
    }
});
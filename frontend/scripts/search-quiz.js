const search_bars = document.querySelectorAll(".search-bar");

for(let input of search_bars){
    const search_btn = input.parentElement.querySelector(".search-btn");

    search_btn.addEventListener("click", function(){
        const search_text = input.value.trim();

        if(search_text != ""){
            const search_box = document.querySelector(".search-box");
            search_box.classList.add("open-search-box");
            
            const search_results = document.querySelector(".search-results");
            
            while(search_results.firstChild) {
                search_results.removeChild(search_results.lastChild);
            }

            const formdata = new FormData;
            formdata.append("search-text", search_text);

            fetch("../backend/search-quiz.php", {
                method: "POST",
                body: formdata
            })
            .then(response => response.json())
            .then(data => {
                for (let quiz of data){
                    const item_box = document.createElement("div");
                    const feed_item = document.createElement("div");
                    const name_span = document.createElement("span");
                    const quiz_details = document.createElement("span");

                    feed_item.style.backgroundImage = `url(../backend/${quiz["banner"]})`;
                    feed_item.setAttribute('quiz-id', quiz["id"]);
                    name_span.textContent = quiz["name"];
                    quiz_details.textContent = `${quiz["user_full_name"]} • ${quiz["creation_date"]}`;

                    item_box.classList.add("item-box");
                    feed_item.classList.add("feed-item");
                    name_span.classList.add("name-span");
                    quiz_details.classList.add("quiz-details");

                    item_box.appendChild(feed_item);
                    item_box.appendChild(name_span);
                    item_box.appendChild(quiz_details);

                    search_results.appendChild(item_box);
                }

                const quizzes = search_results.querySelectorAll(".feed-item");

                for(let quiz of quizzes){
                    quiz.addEventListener("click", function(event){
                        window.location.href = `./quiz-submission.php?quiz-id=${event.target.getAttribute('quiz-id')}&user-id=${document.querySelector(".search-box").dataset.userId}`;
                    })
                }
            })
        }
    })
}

const search = document.querySelector(".search-box");

search.addEventListener("click", function(event) {
    if (event.target === search) {
        search.classList.remove("open-search-box");
    }
});
fetch("../backend/trending-quizzes.php")
.then(response => response.json())
.then(data => {
    for(quiz of data){
        const name = quiz["name"];
        const creation_date = quiz["creation_date"];
        const banner = quiz["banner"];
        const user_full_name = quiz["user_full_name"];

        const feed_wrapper = document.querySelector(".feed-wrapper");
        const item_box = document.createElement("div");
        const feed_item = document.createElement("div");
        const name_span = document.createElement("span");
        const quiz_details = document.createElement("span");

        feed_item.style.backgroundImage = `url(../backend/${banner})`;
        name_span.textContent = name;
        quiz_details.textContent = `${user_full_name} • ${creation_date}`;

        item_box.classList.add("item-box");
        feed_item.classList.add("feed-item");
        name_span.classList.add("name-span");
        quiz_details.classList.add("quiz-details");

        item_box.appendChild(feed_item);
        item_box.appendChild(name_span);
        item_box.appendChild(quiz_details);

        feed_wrapper.appendChild(item_box);
    }
})
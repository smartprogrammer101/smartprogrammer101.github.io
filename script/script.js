(function() {
    $(function() {
        updateItemsCount();
    })
    $("#contain").sortable({containment: "parent"});


    const $listsContainer = $("#contain");
    const todoForm = document.forms[0];
    const newTodoInput = document.getElementById("new-todo");
    const lis = document.querySelectorAll("#list-container li");
    const circles = document.querySelectorAll(".circle");
    const deleteButtons = document.querySelectorAll(".delete");
    const $clearCompleted = $("#clear-completed");
    const filterButtons = document.querySelectorAll("#filter-buttons h5");
    const toggleModeImage = document.querySelector("#todo-title img");

    toggleModeImage.addEventListener("click", changeMode);

    function changeMode() {
        document.body.classList.toggle("lightmode");
        if (document.body.classList.contains("lightmode")) {
            this.src = "./images/icon-moon.svg";
        }
        else {
            this.src = "./images/icon-sun.svg";
        }
    }

    filterButtons.forEach(button => {
        $(button).on("click", filterList);
    });
    
    lis.forEach(li => {
        $(li).on("mousedown", function() {
            $(this).css("cursor", "grabbing");
        })
        $(li).on("mouseup", function() {
            $(this).css("cursor", "grab");
        })
    })

    $(todoForm).on("submit", addTodoItem);

    $clearCompleted.on("click", clearCompletedLists);

    function addTodoItem(e) {
        e.preventDefault();
        const value = newTodoInput.value;
        if (!value) return;
        const $li = createItem(value);
        $listsContainer.prepend($li);
        $li.find(".circle").on("click", markList);
        $li.find(".delete").on("click", removeItem);
        updateItemsCount();
        newTodoInput.value = "";
        // console.log(value);
    }

    function createItem(val) {
        const li = $("<li></li>");
        const html = `
        <div class="wrapper">
            <div class="circle"></div>
            <p>${val}</p>
        </div>
        <button class="delete">
            <img src="./images/icon-cross.svg" alt="">
        </button>`;
        li.html(html);
        // console.log(li);
        return li;
    }

    circles.forEach(circle => {
        $(circle).on("click", markList);
    })
    function markList() {
        $(this).toggleClass("checked");
    }
    deleteButtons.forEach(button => {
        $(button).on("click", removeItem);
    });
    function removeItem() {
        $(this).closest("li").slideUp(function() {
            $(this).remove();
            updateItemsCount();
        });
    }
    function updateItemsCount() {
        const $countDiv = $("#count");
        const $lists = $("li");
        $countDiv.text($lists.length);
    }

    function clearCompletedLists() {
        const completed = document.querySelectorAll(".checked");
        completed.forEach(list => {
            $(list).closest("li").remove();
        });
        updateItemsCount();
    }
    function filterList() {
        $(this).addClass("active");
        $(this).siblings().removeClass("active");
        const lis = document.querySelectorAll("#list-container li");
        const circles = document.querySelectorAll(".circle");
        if (this.id == "all") {
            $(lis).slideDown()
        } else if (this.id == "completed") {
            circles.forEach(circle => {
                const li = $(circle).closest("li");
                if (circle.classList.contains("checked")) {
                    li.slideDown();
                } else {
                    li.slideUp();
                }
            });
        } else { /** if active button */            
            circles.forEach(circle => {
                const li = $(circle).closest("li");
                if (!circle.classList.contains("checked")) {
                    li.slideDown();
                } else {
                    li.slideUp();
                }
            });
        }
    }
}());
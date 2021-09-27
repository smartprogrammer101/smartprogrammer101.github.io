(function() {
    const wrapper = document.querySelector(".wrapper");
    const filtersContainer = document.querySelector(".one");
    const fill = document.getElementById("filter");
    const clearButton = document.getElementById("clear");
    clearButton.addEventListener("click", clearAll);
    let allButtons;
    let containers;
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "../data.json", false);
    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            if (this.response) {
                let data = this.response;
                data = JSON.parse(data);
                populatePage(data);
            }
        }
    }
    xhr.send();

    function populatePage(data) {
        wrapper.innerHTML = "";
        data.forEach(item => {
            // console.log(item);
            const languages = item.languages;
            let buttons = '';
            languages.forEach(language => {
                buttons += "<button>" + language + "</button>";
            });
            // console.log(item);
            let newOrFeatured = '';
            const isNew = item.new;
            const isFeatured = item.featured;
            if (isNew) newOrFeatured += `<span class="new">NEW!</span>`;
            if (isFeatured) newOrFeatured += `<span class="featured">FEATURED</span>`;

            const div = document.createElement("div");
            div.className = "container";
            div.dataset.languages = languages;

            const html = `
                                    <div class="left">
                                        <img src=${item.logo} class="logo" alt="">
                                        <div class="main">
                                            <div class="top">
                                                <span class="company">${item.company}</span>
                                                ${newOrFeatured}
                                            </div>
                                            <h2>${item.position}</h2>
                                            <div class="bottom flex-centered">
                                                <span>${item.postedAt}</span>
                                                <span class="dot"></span>
                                                <span>${item.contract}</span>
                                                <span class="dot"></span>
                                                <span>${item.location}</span>
                                            </div>
                                        </div>
                                        </div>
                                        <div class="filter-buttons">
                                            ${buttons}
                                    </div>
                                `;

            div.innerHTML = html;
            wrapper.appendChild(div);
            const featured = div.querySelector(".featured");
            if (featured) div.classList.add("border-left");
        });
        allButtons = document.querySelectorAll("button");
        containers = document.querySelectorAll(".container");
    }
    allButtons.forEach(button => {
        button.addEventListener("click", filter);
    });
    function filter() {
        fill.classList.remove("hide");
        const text = this.textContent;
        const filters = filtersContainer.dataset.filters;
        if (filters.indexOf(text) == -1) {
            createFilterButton(this.textContent);
            const filtersButtons = filtersContainer.querySelectorAll(".filter-cancelable");
            containers.forEach(container => {
                const buttons = container.querySelectorAll("button");
                const text = this.textContent;
                const languages = container.dataset.languages;
                if (languages.indexOf(text) == -1 || buttons.length < filtersButtons.length) container.classList.add("hide");
                // else container.classList.remove("hide");
            });
        }
    }

    function createFilterButton(text) {
        filtersContainer.dataset.filters += text;
        // console.log(filtersContainer.dataset.filters);
        const div = document.createElement("div");
        div.className = "filter-cancelable";
        const html = `
                                <span>${text}</span>
                                <div class="cancel">
                                    <img src="./images/icon-remove.svg" alt="">
                                </div>
                            `;
        div.innerHTML = html;
        const cancelButton = div.querySelector(".cancel");
        cancelButton.addEventListener("click", removeFilter);
        
        filtersContainer.appendChild(div);
    }

    function clearAll() {
        filtersContainer.innerHTML = '';
        filtersContainer.dataset.filters = '';
        containers.forEach(container => {
            container.classList.remove("hide");
        });
        fill.classList.add("hide");
    }

    function removeFilter() {
        this.parentElement.remove();
        const removedText = this.previousElementSibling.textContent;
        if (filtersContainer.innerHTML == '') fill.classList.add("hide");
        let filterText = filtersContainer.dataset.filters;
        filtersContainer.dataset.filters = filterText.replace(new RegExp(removedText, 'g'), '');

        containers.forEach(container => {                                               /** LOOPING ALL CONTAINERS */
            
            // const languages = container.dataset.languages;
            filterText = filtersContainer.dataset.filters;
            // console.log(filterText);
            if (true) {                                 /** If removed text is NOT in filters text */
                const toArray = container.dataset.languages.split(',');
                let count = 0;
                for (let i = 0; i < toArray.length; i++) {
                    const text = toArray[i];
                    if (filterText.indexOf(text) != -1) {
                        count++;
                    }
                }
                if (count === filtersContainer.childElementCount) {
                    container.classList.remove("hide");
                    // console.log("yeah");
                } else {
                    container.classList.add("hide");
                    // console.log(toArray.length);
                }
            }

        });
    }
}())
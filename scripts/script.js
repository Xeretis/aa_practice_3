// https://apichallenges.eviltester.com/simpleapi/items
let items;

const loading = document.getElementById("loading");

fetch("https://apichallenges.eviltester.com/simpleapi/items").then((res) =>
    res.json().then((data) => {
        items = data.items;

        loading.classList.remove("animate__fadeInUp");
        loading.classList.add("animate__fadeOut");

        loading.style.display = "none";

        const grid = document.getElementById("grid");

        for (let i = 0; i < items.length; i++) {
            /*
                <article>
                    <header>Header</header>
                    Body
                    <footer>Footer</footer>
                </article>
            */

            const item = document.createElement("article");

            const header = document.createElement("header");

            header.innerText = items[i].isbn13;

            item.classList.add("animate__animated");
            item.classList.add("animate__fadeInUp");
            item.classList.add("animate__fast");

            const content = document.createElement("p");

            content.innerText = items[i].type + " - $" + items[i].price;

            const footer = document.createElement("footer");

            footer.innerText = items[i].numberinstock + " db";

            item.appendChild(header);
            item.appendChild(content);
            item.appendChild(footer);
            grid.appendChild(item);
        }
    })
);

const isbn = document.getElementById("isbn");
const price = document.getElementById("price");
const numberinstock = document.getElementById("numberinstock");

// Type
const cd = document.getElementById("cd");
const dvd = document.getElementById("dvd");
const book = document.getElementById("book");
const bluRay = document.getElementById("blu-ray");

const form = document.getElementById("form");

fetch("https://apichallenges.eviltester.com/simpleapi/randomisbn").then((res) =>
    res.text().then((data) => {
        isbn.value = data;
    })
);

form.addEventListener("submit", (e) => {
    e.preventDefault();
    let type;

    if (cd.checked) {
        type = "cd";
    } else if (dvd.checked) {
        type = "dvd";
    } else if (book.checked) {
        type = "book";
    } else if (bluRay.checked) {
        type = "blu-ray";
    }

    fetch("https://apichallenges.eviltester.com/simpleapi/items", {
        method: "POST",
        body: JSON.stringify({
            type: type,
            isbn13: isbn.value,
            price: price.value,
            numberinstock: numberinstock.value,
        }),
        headers: {
            "Content-Type": "application/json",
            accept: "application/json",
        },
    });
});

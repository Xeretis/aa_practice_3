// https://apichallenges.eviltester.com/simpleapi/items
let items;

fetch("https://apichallenges.eviltester.com/simpleapi/items").then((res) =>
    res.json().then((data) => {
        items = data.items;
        console.log(items);
    })
);

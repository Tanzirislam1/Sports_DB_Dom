
const allPlayers = () => {
    document.getElementById("player-container").innerHTML = "";
    const searchValue = document.getElementById("search-box").value;
    // console.log(searchValue);
    // amra api er = por dynamic vabe set korte templete string use kora lage...

    const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${searchValue}`;
    fetch(url)
    .then(res => res.json())
    .then(data => {
        // jodi amra input field e ulta palta kicu jmn avsdsdv ai rokom dei tokhon null show korbe jokhon amra data.player == null der tokhon true show korbe...tai amra akta if condition use korse data.player jodi null hoy tahole spinner tah show korbe r else data tah load hbe and spinner tah chole jabe...
        console.log(data.player == null);
        if (data.player == null) {
            document.getElementById("spinner").style.display = "block";
        }
        else{
            showPlayerDetails(data.player);
            document.getElementById("spinner").style.display = "none";
        }
    })
    // document.getElementById("spinner").style.display = "none";
}


const showPlayerDetails = (players) => {
    // console.log(player);
    const parent = document.getElementById("player-container");
    for(const player of players){
        // console.log(player);
        const div = document.createElement("div");
        div.innerHTML = `
            <div class="card border text-center">
            <div class="card-body">
            <div class="pro-pic">
                <img class="w-75" src="${player.strThumb}" alt="">
            </div>
            <h2>name: ${player.strPlayer}</h2>
            <h5>Country: ${player.strNationality}</h5>
            <p></p>
            <div class="all-button">
                <button class="btn btn-danger">Delete</button>
                <button onclick="details('${player.idPlayer}')" class="btn btn-success">Details</button>
            </div>
        </div>
            </div>
        `
        parent.appendChild(div);
    }
}

const details = (id) => {
    // upore innerHtml er details button er moddhe dynamic vabe player er id number tah call kore rakhse id peramter er value hisabe and aikhane amra sports db website theke lookups er moddhe player id er api k niye ashchi jer = equal er por ${} diye ter moddhe dynamic vabe id perameter k set kore dise karon id perameter k amra upore id value set kore rakhse...
    // console.log(id);
    const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => setDetails(data.players[0])) // data r moddhe player jer 0 num index k call korse
}

const setDetails = (info) => {
    // console.log(info.strGender);

    if(info.strGender == "Male"){
        document.getElementById("Male").style.display = "block";
        document.getElementById("Female").style.display = "none";
    }
    else{
        document.getElementById("Female").style.display = "block";
        document.getElementById("Male").style.display = "none";
    }

    document.getElementById("details-container").innerHTML = `
        <div>
            <img src="" alt="">
            <h1>Team: ${info.strTeam}</h1>
            <h1>name: ${info.strPlayer}</h1>
            <h1>Date of born: ${info.dateBorn}</h1>
            <h1>Birth location: ${info.strBirthLocation}</h1> 
        </div>
    `
}
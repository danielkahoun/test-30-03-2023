class LikedFacts {
    constructor() {
        this.facts = [];
    }
    addFact(fact) {
        this.facts.push(fact);
    }
    renderFacts() {
        let ul = $('<ul></ul>');

        this.facts.forEach((fact) => {
            let li = $("<li></li>").text(fact);
            ul.append(li);
        });

        $("#likedFacts").css('opacity', 0);
        $("#likedFacts").empty();
        $("#likedFacts").append(ul);
        $("#likedFacts").animate({ opacity: '1' });
    }
}

class DislikedFacts {
    constructor() {
        this.facts = [];
    }
    addFact(fact) {
        this.facts.push(fact);
    }
    renderFacts() {
        let ul = $('<ul></ul>');

        this.facts.forEach((fact) => {
            let li = $("<li></li>").text(fact);
            ul.append(li);
        });

        $("#dislikedFacts").css('opacity', 0);
        $("#dislikedFacts").empty();
        $("#dislikedFacts").append(ul);
        $("#dislikedFacts").animate({ opacity: '1' });
    }
}

let likedFacts = new LikedFacts();
let dislikedFacts = new DislikedFacts();

function renderLikedFacts() {
    likedFacts.renderFacts();
}

function renderDislikedFacts() {
    dislikedFacts.renderFacts();
}

let attemps = 0;
function generateFact() {
    $.ajax({
        type: "GET",
        url: "https://dog-api.kinduff.com/api/facts",
        success: function (data, text) {
            if (likedFacts.facts.includes(data.facts[0]) || dislikedFacts.facts.includes(data.facts[0])) {
                if (attemps == 5) {
                    $("#fact-container").empty();
                    $("#fact-container").text("No new dog fact");
                } else {
                    generateFact();
                }
                attemps++;
            } else {
                render(data);
                attemps = 0;
            }
        }
    });
}

function render(data) {
    $("#generateBtn").hide();
    $("#fact-container").empty();

    var fact = $('<p class="col-md-8 fs-4" id="fact"></p>').text(data.facts[0]);
    var btngroup = $('<div class="btn-group" role="group"></div>');
    var like = $('<button type="button" class="btn btn-primary"></button>').text("Like 👍");
    var dislike = $('<button type="button" class="btn btn-primary"></button>').text("Dislike 👎");
    var generate = $('<button type="button" class="btn btn-secondary" style="margin-left:15px;"></button>').text("Generate New");
    btngroup.append(like, dislike);

    like.on("click", function () {
        likedFacts.addFact(data.facts[0]);

        $("#fact-container").animate({ marginLeft: '120px' });
        setTimeout(function () {
            generateFact();
            $("#fact-container").css('marginLeft', '0px');
        }, 500);
    });

    dislike.on("click", function () {
        dislikedFacts.addFact(data.facts[0]);

        $("#fact-container").animate({ marginTop: '100px' });
        setTimeout(function () {
            generateFact();
            $("#fact-container").css('marginTop', '0px');
        }, 500);
    });

    generate.on("click", function () {
        $("#fact-container").css('marginTop', '-80px');
        $("#fact-container").css('opacity', '0');
        $("#fact-container").animate({ marginTop: '0px', opacity: '1' });

        generateFact();
    });

    $("#fact-container").append(fact, btngroup, generate);
}
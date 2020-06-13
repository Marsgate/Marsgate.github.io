teamnumber = document.getElementById("teamnumber");
season = document.getElementById("season");
attendance = document.getElementById("attendance");
result = document.getElementById("result");

var points;

function start(){
    points = 0;
    getAwards();
}

function getAwards(){
    $.getJSON("https://api.vexdb.io/v1/get_awards?&season=" + season.value + "&team=" + teamnumber.value, function(data){
        console.log(data);

        for(i=0;i<data.size;i++){
            if(data.result[i].name.search("Tournament Finalist") != -1){
                points += 20;
            }else if(data.result[i].name.search("Tournament Champions") != -1){
                points += 100;
            }else if(data.result[i].name.search("Skills") != -1){
                points += 50;
            }else{
                points += 75;
            }
        } 
        
        getRankings()

    });
}

function getRankings(){
    $.getJSON("https://api.vexdb.io/v1/get_rankings?&season=" + season.value + "&team=" + teamnumber.value, function(data){
        console.log(data);

        for(i=0;i<data.size;i++){
            if(data.result[i].rank >= 8){
                points += 15;
            }else if(data.result[i].rank > 12){
                points += 10;
            }else if(data.result[i].rank > 16){
                points += 5;
            }
        }
        
        getSkills();
    });
}

function getSkills(){
    $.getJSON("https://api.vexdb.io/v1/get_skills?&season=" + season.value + "&team=" + teamnumber.value, function(data){
        console.log(data);

        for(i=0;i<data.size;i++){
            if(data.result[i].type == 2){
                if(data.result[i].rank == 1){
                    points += 50;
                }else if(data.result[i].rank >= 5){
                    points += 15;
                }
            }else if(data.result[i].type == 1 && data.result[i].attempts > 0){
                points += 5;
            }else if(data.result[i].type == 0 && data.result[i].attempts > 0){
                points += 2.5
            }
        }
        
        getMatches()
    });
}

function getMatches(){
    $.getJSON("https://api.vexdb.io/v1/get_matches?&season=" + season.value + "&team=" + teamnumber.value, function(data){
        console.log(data);

        for(i=0;i<data.size;i++){
            if(data.result[i].round > 2){
                if(data.result[i].redscore < data.result[i].bluescore){
                    if(data.result[i].red1 == teamnumber || data.result[i].red2 == teamnumber){
                        switch(data.result[i].round){
                        case 3:
                            points += 5;
                            break;
                        case 4:
                            points += 10;
                            break;
                        case 5:
                            points += 20;
                        }
                    }
                }else{
                    if(data.result[i].blue1 == teamnumber || data.result[i].blue2 == teamnumber){
                        switch(data.result[i].round){
                        case 3:
                            points += 5;
                            break;
                        case 4:
                            points += 10;
                            break;
                        case 5:
                            points += 20;
                        }
                    }
                }
            }
        }
       
        displayResult();
    });
}

function displayResult(){
    points += attendance.value*3; //add attendance

    console.log(points);

    if(points >= 100){
        result.innerHTML = "Letter Earned, Points: " + points;
    }else{
        result.innerHTML = "Letter NOT Earned, Points: " + points;
    }
}
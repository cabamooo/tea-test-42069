async function simulate() {
    console.log("Loading simulation...");
    let malecheck = mySnails.find(snail => snail.name === document.getElementById("Male").value);
    let femalecheck = mySnails.find(snail => snail.name === document.getElementById("Female").value);
    if (malecheck === undefined) {
        malesnail = document.getElementById("Male").value;
    }
    else {
        malesnail = malecheck.id;
    }
    if (femalecheck === undefined) {
        femalesnail = document.getElementById("Female").value;
    }
    else {
        femalesnail = femalecheck.id;
    }
    await fetch('https://api.snailtrail.art/graphql/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Origin': 'https://api.snailtrail.art/graphql/',
            'withcredentials': 'true'
        },
        body: JSON.stringify({
            query: `query simulate($female: Int!, $male: Int!) {
                simulation_promise(female: $female, male: $male) {
                  ... on Problem {
                    problem
                    __typename
                  }
                  ... on Simulation {
                    family {
                      name
                      p
              
                    }
                    purity {
                      name
                      p
              
                    }
                    klass {
                      name
                      p
              
                    }
                    generation {
                      name
                      p
              
                    }
                  }
                }
              }`,
            variables: {
                male: parseInt(malesnail),
                female: parseInt(femalesnail)
            }
        })
    })
            .then(response => response.json())
            .then(function (response) { 
                response.data.simulation_promise.purity.forEach(function (item) {
                    let purity = parseInt(item.name) - 1;
                    item.name = purity;
                })

               console.log(response); 
            })   
}
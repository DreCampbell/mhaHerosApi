// // document.querySelector(input)
// // alert("Working")

// document.querySelector(('getHero')).addEventListener('click', getHero)

// function getHero(){
//     console.log('Hello World!')
// }


document.querySelector('button').addEventListener('click', apiRequest)

async function apiRequest(){
    const heroName = document.querySelector('input').value
    try{
        const response = await fetch(`https://wandering-cap-fawn.cyclic.app/api/${heroName}`)
        const data = await response.json()

        console.log(data)
        // document.querySelector('h2').innerText = data.birthName
    }catch(error){
        console.log(error)
    }
}
const deleteText = document.querySelectorAll('.fa-trash')
const thumbText = document.querySelectorAll('.fa-thumbs-up')

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteHero)
})

Array.from(thumbText).forEach((element)=>{
    element.addEventListener('click', addLike)
})

async function deleteHero(){
    const hName = this.parentNode.childNodes[1].innerText
    const qName = this.parentNode.childNodes[3].innerText
    try{
        const res = await fetch('deleteHero', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'heroNameS': hName,
                'quirkS': qName,
            })
        })
        const data = await res.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

async function addLike(){
    const hName = this.parentNode.childNodes[1].innerText
    const qName = this.parentNode.childNodes[3].innerText
    const tLikes = Number(this.parentNode.childNodes[5].innerText)
    try{
        const response = await fetch('addOneLike', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'heroNameS': hName,
              'quirkS': qName,
              'likesS': tLikes
            })
          })
        const data = await response.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)
    }
}

// document.querySelector('button').addEventListener
// ('click', apiRequest)

// async function apiRequest(){
//     const heroName = document.querySelector('input').value
//     try{
//         const response = await fetch(`https://wandering-cap-fawn.cyclic.app/api/${heroName}`)
//         const data = await response.json()

//         console.log(data)
//         document.querySelector('#name').innerText = `Hero Name: ${data.heroName}`
//         document.querySelector('#rank').innerText = `Rank: ${data.rank}`
//         document.querySelector('#quirk').innerText = `Quirk: ${data.quirk}`
//     }catch(error){
//         console.log(error)
//     }
// }
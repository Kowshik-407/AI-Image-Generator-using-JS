const API_KEY = ""

const submitButton = document.querySelector("#submit")
const inputPrompt = document.querySelector("input")
const imagesSection = document.querySelector(".images-section")

const generateImages = async () => {
    console.log("clicked")
    try{
        const response = await fetch("https://api.openai.com/v1/images/generations", {
            method: "POST",
            headers:{
                Authorization: `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                prompt: inputPrompt.value,
                n: 4,
                size: "512x512"
            })
        })
        const data = await response.json()

        console.log(data.data)

        while(imagesSection.hasChildNodes()){
            imagesSection.removeChild(imagesSection.firstChild)
        }
        
        data?.data.forEach(image => {
            const imageContainer = document.createElement("div")
            imageContainer.classList.add("image-container")

            const imageElement = document.createElement("img")
            imageElement.setAttribute("src", image.url)

            imageContainer.append(imageElement)
            imagesSection.append(imageContainer)
        })

    } catch(error){
        console.error(error)
    }
}

inputPrompt.addEventListener('keydown', function(event){
    if(event.code == "Enter"){
        generateImages()
    }
})

submitButton.addEventListener("click", generateImages)
export const loadAsyncImages = () => {
  const objects = document.getElementsByClassName("asyncImage")

  console.log("loadAsyncImages::objects", objects)

  Array.from(objects).map(item => {
    // Start loading image
    const img = new Image()
    // @ts-ignore
    img.src = item.dataset.src

    console.log("img", img)

    // Once image is loaded replace the src of the HTML element
    img.onload = () => {
      item.classList.remove("asyncImage")
      if (item.nodeName === "IMG") {
        // @ts-ignore
        return (item.src = item.dataset.src)
      }
      // @ts-ignore
      return (item.style.backgroundImage = `url(${item.dataset.src})`)
    }
  })
}

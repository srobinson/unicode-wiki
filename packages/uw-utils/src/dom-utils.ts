export const loadAsyncImages = () => {
  const objects = document.getElementsByClassName("asyncImage")
  Array.from(objects).map(item => {
    const img = new Image()
    img.src = item["dataset"].src
    img.onload = () => {
      item.classList.remove("asyncImage")
      return item.nodeName === "IMG"
        ? (item["src"] = item["dataset"].src)
        : (item["style"].backgroundImage = `url(${item["dataset"].src})`)
    }
  })
}

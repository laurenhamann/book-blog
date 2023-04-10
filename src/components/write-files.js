export function writeFile(final) {
  const link = document.createElement("a")
  const content = [final]
  const file = new Blob([final], { type: "text/plain" })
  console.log(final)
  // link.href = URL.createObjectURL(file)
  // link.download = "sample.txt"
  // link.click()
  // URL.revokeObjectURL(link.href)
}

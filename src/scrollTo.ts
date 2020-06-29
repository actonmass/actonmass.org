export default function scrollTo(hashName) {
  const elem = document.getElementById(hashName);
  if (elem == null) {
    console.warn(`Enable to scroll to element #${hashName}`);
    return;
  }
  elem.scrollIntoView({ behavior: "smooth" });
}

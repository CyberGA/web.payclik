export default function getDate() {
    const months = [ "Jan", "Feb", "Mar", "April", "May", "Jun", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]
    const date = new Date()
    return `Today ${date.getDate()} ${
      months[date.getMonth()]
    }, ${date.getFullYear()} `;

}
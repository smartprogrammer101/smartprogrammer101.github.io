const toate = new Date("2021/11/31");
const [dayBox, hourBox, minBox, secBox] = [
    document.getElementById("day"),
    document.getElementById("hour"),
    document.getElementById("min"),
    document.getElementById("sec")
];

setInterval(() => {
    const now = new Date();
    const diff = toate - now;
    const sec = 1000;
    const min = (60 * sec);
    const hour = (60 * min);
    const day = (24 * hour);
    
    let remainingDays = Math.floor(diff/day);
    remaining(dayBox, remainingDays);
    let remainingHours = Math.floor((diff%day) / hour);
    remaining(hourBox, remainingHours);
    let remainingMins = Math.floor(((diff%day) % hour) / min);
    remaining(minBox, remainingMins);
    let remainingSecs = Math.floor((((diff%day) % hour) % min) / sec);
    remaining(secBox, remainingSecs);
    // console.log("remainingDays: ", remainingDays);
    // console.log("remainingHours: ", remainingHours);
    // console.log("remainingMins: ", remainingMins);
    // console.log("remainingSecs: ", remainingSecs);
}, 1000);

function remaining(box, val) {
    const former = box.textContent;
    box.textContent = val.toString().length == 2 ? val: "0" + val;
    const latter = box.textContent;

    if (former != box.textContent) {
        box.classList.toggle("rotate360");
    }
}

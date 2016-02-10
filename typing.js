export default class Typing {
    constructor(output)
    {
        this.output = output;
    }
    start (words) {
        if (words) this.word = words.split("");
        this.count = 0;
        var animate = ()=>{
            var text = this.output.innerText;
            if (this.count % 5 == 0) {
                this.output.innerText = text + this.word.shift();
            }
            if (this.word.length > 0) {
                requestAnimationFrame(animate);
            }
            this.count++;
        };
        requestAnimationFrame(animate);
    }
    dooot (callback) {
        this.output.style.textAlign = "left";
        this.count = 0;
        var animate = ()=> {
            var str = new Array(this.count / 3 + 1 >> 0).join(". ");
            this.output.innerText = "请稍候 " + str;
            if (this.count < 50) {
                requestAnimationFrame(animate);
            } else {
                callback()
            }
            this.count++;
        };
        requestAnimationFrame(animate);
    }
}
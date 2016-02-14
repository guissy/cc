export default class Typing {
    constructor(output)
    {
        this.output = output;
    }
    start (words,callback) {
        if("innerText" in this.output) {
            this.word = words?words.split(""):[];
            this.count = 0;
            this.output.innerText = "";
            var animate = ()=>{
                var text = this.output.innerText;
                if (this.count % 5 == 0) {
                    this.output.innerText = text + this.word.shift();
                }
                if (this.word.length > 0) {
                    requestAnimationFrame(animate);
                } else {
                    callback && callback();
                }
                this.count++;
            };
            requestAnimationFrame(animate);
        }
    }
    dooot (callback) {
        this.textAlign = this.output.style.textAlign;
        this.output.style.textAlign = "left";
        this.count = 0;
        this.output.innerText = "";
        var animate = ()=> {
            var str = new Array(this.count / 3 + 1 >> 0).join(". ");
            this.output.innerText = "请稍候 " + str;
            if (this.count < 50) {
                requestAnimationFrame(animate);
            } else {
                this.output.style.textAlign = this.textAlign;
                callback && callback();
            }
            this.count++;
        };
        requestAnimationFrame(animate);
    }
}
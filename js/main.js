'use strict'
window.addEventListener('load', function () {

    let input = document.getElementById('input');

    input.addEventListener('input', function () {
        validate();
    });

    function validate(){
        try{
            tryValidate();
            input.className = "good";
        }catch (err){
            input.className = "err";
        }
    };

    function tryValidate() {
        let rules = {
            '(' : ')',
            '[' : ']',
            '{' : '}',
            '<' : '>'
        };

        let stack = [];
        let line = input.value;

        for (let i = 0; i < line.length; i++) {
            let symbol = line[i];

            if(symbol in rules){                         //If it's opened bracket
                say('Opened bracket: ' + symbol );
                stack.push(symbol);
            }else{                                       //If it's closed bracket or something else
                say('Closed bracket or something else: ' + symbol );
                let last = stack.pop();                  //Get last element
                if(last){
                    if(last in rules){                    //If we can recognized this closed bracket
                        let expected = rules[last];
                        say('Expected: ' + expected + ", but actual: " + symbol);
                        if(expected !== symbol){
                            throw new Error('Validate error');
                        }else{
                            //Good
                        }
                    }else{
                        throw new Error('Validate error');
                    }
                }else{
                    throw new Error('Validate error');
                }
            }
        }
        if(stack.length > 0){
            throw new Error('Validate error');
        }
    }
    function say(message) {
        console.log(message);
    }
});

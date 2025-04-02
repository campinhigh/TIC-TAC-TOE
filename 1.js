let boxes=document.querySelectorAll(".box");
let reset=document.querySelector(".reset");
let newbutton=document.querySelector(".newbutton");
let messagecontainer=document.querySelector(".messagecontainer");
let msg=document.querySelector(".msg");

//This variable will determine which player's turn is next.
let turn1= true;

/* WINNING PATTERNS
0, 1, 2  
3, 4, 5  
6, 7, 8  
0, 3, 6  
1, 4, 7  
2, 5, 8  
0, 4, 8  
2, 4, 6  */

const winPattern=[
    [0, 1, 2],  
[3, 4, 5],  
[6, 7, 8],  
[0, 3, 6], 
[1, 4, 7],
[2, 5, 8],  
[0, 4, 8],  
[2, 4, 6] 
]

boxes.forEach((box) => 
{
    box.addEventListener("click", () => {       //whenever a button will be clicked this event will be activated
        if(turn1)//Turn of Player O
        {
            box.innerText="O";  // when a box will be clicked, this will make O appear on the button
            turn1=false;
        }
        else//Turn of player X
        {
            box.innerText="X";
            turn1=true;
        }
        box.disabled=true;  // this will disable the input once a value is appeared on the button

        checkWinner();
    });
});

//Check for the winning patterns
const checkWinner=() =>{
    for(let pattern of winPattern)
        {
            let position1=boxes[pattern[0]].innerText;
            let position2=boxes[pattern[1]].innerText;
            let position3=boxes[pattern[2]].innerText;
    
            if(position1!=""&&position2!=""&&position3!="")
            {
                if(position1===position2&&position2===position3)
                {
                    showWinner(position1);
                }
            }
        }
}

const showWinner=(winner)=>{
    msg.innerText=`Congratulations, The Winner is ${winner}`;
    disableButton();
}

const disableButton=()=>{
    for(let box of boxes)
    {
        box.disabled=true;
    }
}

const resetGame=()=>{
    turn1=true;
    enableButton();
    messagecontainer.classList.add("hide");
    msg.innerText="";
}

const enableButton=()=>{
    for(let box of boxes)
    {
        box.disabled=false;
        box.innerText="";
    }
}

newbutton.addEventListener("click", resetGame);
reset.addEventListener("click", resetGame);
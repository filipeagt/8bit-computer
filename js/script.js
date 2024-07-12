var acc = 0
var out = document.getElementById('saida')
var led7 = document.getElementById('l7')
var led6 = document.getElementById('l6')
var led5 = document.getElementById('l5')
var led4 = document.getElementById('l4')
var led3 = document.getElementById('l3')
var led2 = document.getElementById('l2')
var led1 = document.getElementById('l1')
var led0 = document.getElementById('l0')


function decimal(binario,binarioH='0000') {
    let res = 0
    res += Number(binarioH[0])*128
    res += Number(binarioH[1])*64
    res += Number(binarioH[2])*32
    res += Number(binarioH[3])*16
    res += Number(binario[0])*8
    res += Number(binario[1])*4
    res += Number(binario[2])*2
    res += Number(binario[3])*1
    
    //alert(res)
    return res
}

function mudaTexto(str) {
    out.innerText = str
}

function liga(led) {
    led.style.backgroundColor = 'yellow'
    led.style.opacity = '100%'
}

function desliga(led) {
    led.style.backgroundColor = 'orange'
    led.style.opacity = '40%'
}

function acendeLeds(binario,binarioH='0000') {
    if(binarioH[0] == '1') {
        liga(led7)
    } else {
        desliga(led7)
    }
    if(binarioH[1] == '1') {
        liga(led6)
    } else {
        desliga(led6)
    }
    if(binarioH[2] == '1') {
        liga(led5)
    } else {
        desliga(led5)
    }
    if(binarioH[3] == '1') {
        liga(led4)
    } else {
        desliga(led4)
    }

    if(binario[0] == '1') {
        liga(led3)
    } else {
        desliga(led3)
    }
    if(binario[1] == '1') {
        liga(led2)
    } else {
        desliga(led2)
    }
    if(binario[2] == '1') {
        liga(led1)
    } else {
        desliga(led1)
    }
    if(binario[3] == '1') {
        liga(led0)
    } else {
        desliga(led0)
    }
    
}


function run() {
    let memoria = document.getElementById('memory')
    let linhas = memoria.value.split('\n')
    let opcode = '0000'
    let operando = '0000'
    let nibbleH = '0000'
    let nibbleL = '0000'
    
    for(let pos=0, loop=0; pos < linhas.length && loop < 200 ; pos++, loop++) {
        opcode = linhas[pos].split(' ')[1]
        operando = linhas[pos].split(' ')[2]
        
        //alert(x.toString(16).toUpperCase())
        
        switch(opcode) {
            case '0000'://LDA
                nibbleH = linhas[decimal(operando)].split(' ')[1]
                nibbleL = linhas[decimal(operando)].split(' ')[2]
                acc = decimal(nibbleL,nibbleH)
                break
            case '0001'://LDI
                nibbleH = '0000'
                nibbleL = operando
                acc = decimal(operando)
                break
            case '0010'://STA
                linhas[decimal(operando)] = `${decimal(operando).toString(16).toUpperCase()} ${nibbleH} ${nibbleL}`
                memoria.value = linhas.toString().replaceAll(',','\n')
                break
            case '0011'://ADD
                nibbleH = linhas[decimal(operando)].split(' ')[1]
                nibbleL = linhas[decimal(operando)].split(' ')[2]
                acc += decimal(nibbleL,nibbleH)
                if(acc>255) acc -= 256
                break
            case '0100'://SUB
                nibbleH = linhas[decimal(operando)].split(' ')[1]
                nibbleL = linhas[decimal(operando)].split(' ')[2]
                acc -= decimal(nibbleL,nibbleH)
                if(acc<0) acc += 256
                break
            case '0101'://AND
                
                break
            case '0110'://OR
                
                break
            case '0111'://XOR
                
                break
            case '1000'://NOT
                
                break
            case '1001'://SHL
                nibbleH = nibbleH.slice(1,4) + nibbleL.slice(0,1)
                nibbleL = nibbleL.slice(1,4)+'0'
                acc *= 2
                break
            case '1010'://SHR
                nibbleH = '0'+ nibbleH.slice(0,3)                
                nibbleL = nibbleH.slice(3,4) + nibbleL.slice(0,3)
                acc = Math.trunc(acc/2)
                break
            case '1011'://JMP
                pos = decimal(operando)-1
                
                break
            case '1100'://JIC
                
                break
            case '1101'://JIM
                
                break
            case '1110'://JNZ
                
                break
            case '1111'://OUT  
                
                setTimeout(mudaTexto, loop*250, acc)
                setTimeout(acendeLeds, loop*250, nibbleL,nibbleH)      
                    
                
                 
                  
                break
        }

        //alert(loop)
        
    }
    
    
}


function teste() {
    for(j=0;j<=100;j++){
        if(j%2==0) {
            setTimeout(liga, j*500, led0)
            setTimeout(mudaTexto, j*500, '1')
            
        } else {
            setTimeout(desliga, j*500, led0)
            setTimeout(mudaTexto, j*500, '0')
            
        }    
    }
}



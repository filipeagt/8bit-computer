var acc = 0
var carry = false
var minus = false
var zero = true
var out = document.getElementById('saida')
var led7 = document.getElementById('l7')
var led6 = document.getElementById('l6')
var led5 = document.getElementById('l5')
var led4 = document.getElementById('l4')
var led3 = document.getElementById('l3')
var led2 = document.getElementById('l2')
var led1 = document.getElementById('l1')
var led0 = document.getElementById('l0')
const maxInst = 1000    //Máximo de instruções a serem executadas em um loop "infinito"

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
    let byte = '00000000'
    
    for(let progCount=0, nInstruct=0; nInstruct < maxInst ; progCount++, nInstruct++) {
        
        if(progCount > 15) progCount = 0 

        opcode = linhas[progCount].split(' ')[1]
        operando = linhas[progCount].split(' ')[2]        
                
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
                
                if(acc>255) {
                    acc -= 256
                    carry = true
                } else {
                    carry = false
                }
                if(acc > 127) {
                    minus = true
                } else {
                    minus = false
                }
                if(acc == 0) zero = true
                else zero = false

                byte = ('0000000'+acc.toString(2)).slice(-8)
                nibbleH = byte.slice(0,4)
                nibbleL = byte.slice(4,8)

                break
            case '0100'://SUB
                nibbleH = linhas[decimal(operando)].split(' ')[1]
                nibbleL = linhas[decimal(operando)].split(' ')[2]

                if(decimal(nibbleL,nibbleH) > acc) carry = false
                else carry = true

                acc -= decimal(nibbleL,nibbleH)
                
                if(acc<0) acc += 256

                if(acc > 127) {
                    minus = true
                } else {
                    minus = false
                }
                if(acc == 0) zero = true
                else zero = false

                byte = ('0000000'+acc.toString(2)).slice(-8)
                nibbleH = byte.slice(0,4)
                nibbleL = byte.slice(4,8)

                break
            case '0101'://AND
                nibbleH = linhas[decimal(operando)].split(' ')[1]
                nibbleL = linhas[decimal(operando)].split(' ')[2]
                acc &= decimal(nibbleL,nibbleH)
                byte = ('0000000'+acc.toString(2)).slice(-8)
                nibbleH = byte.slice(0,4)
                nibbleL = byte.slice(4,8)

                if(acc > 127) {
                    minus = true
                } else {
                    minus = false
                }
                if(acc == 0) zero = true
                else zero = false
                break
            case '0110'://OR
                nibbleH = linhas[decimal(operando)].split(' ')[1]
                nibbleL = linhas[decimal(operando)].split(' ')[2]
                acc |= decimal(nibbleL,nibbleH)
                byte = ('0000000'+acc.toString(2)).slice(-8)
                nibbleH = byte.slice(0,4)
                nibbleL = byte.slice(4,8)

                if(acc > 127) {
                    minus = true
                } else {
                    minus = false
                }
                if(acc == 0) zero = true
                else zero = false
                break
            case '0111'://XOR
                nibbleH = linhas[decimal(operando)].split(' ')[1]
                nibbleL = linhas[decimal(operando)].split(' ')[2]
                acc ^= decimal(nibbleL,nibbleH)
                byte = ('0000000'+acc.toString(2)).slice(-8)
                nibbleH = byte.slice(0,4)
                nibbleL = byte.slice(4,8)

                if(acc > 127) {
                    minus = true
                } else {
                    minus = false
                }
                if(acc == 0) zero = true
                else zero = false
                break
            case '1000'://NOT
                nibbleH = nibbleH.replaceAll('0','x').replaceAll('1','0').replaceAll('x','1')
                nibbleL = nibbleL.replaceAll('0','x').replaceAll('1','0').replaceAll('x','1')
                acc = ~acc
                if(acc<0) acc += 256

                if(acc > 127) {
                    minus = true
                } else {
                    minus = false
                }
                if(acc == 0) zero = true
                else zero = false
                break
            case '1001'://SHL
                acc <<= 1
                if(acc>255) acc -= 256

                byte = ('0000000'+acc.toString(2)).slice(-8)
                nibbleH = byte.slice(0,4)
                nibbleL = byte.slice(4,8)

                if(acc > 127) {
                    minus = true
                } else {
                    minus = false
                }
                if(acc == 0) zero = true
                else zero = false

                break
            case '1010'://SHR                
                acc >>= 1

                byte = ('0000000'+acc.toString(2)).slice(-8)
                nibbleH = byte.slice(0,4)
                nibbleL = byte.slice(4,8)

                if(acc > 127) {
                    minus = true
                } else {
                    minus = false
                }
                if(acc == 0) zero = true
                else zero = false
                break
            case '1011'://JMP
                progCount = decimal(operando)-1
                
                break
            case '1100'://JIC
                if(carry) progCount = decimal(operando)-1
                break
            case '1101'://JIM
                if(minus) progCount = decimal(operando)-1
                break
            case '1110'://JNZ
                if(!zero) progCount = decimal(operando)-1
                break
            case '1111'://OUT  
                
                setTimeout(mudaTexto, nInstruct*250, acc)
                setTimeout(acendeLeds, nInstruct*250, nibbleL,nibbleH) 
                      
                break
        }
               
    }    
    
}



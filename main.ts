input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    bM1 = !(bM1)
    zeigeStatus()
})
input.onButtonEvent(Button.AB, input.buttonEventClick(), function () {
    bMotorPower = !(bMotorPower)
})
function zeigeStatus () {
    if (!(bM1)) {
        basic.showLeds(`
            . . # . .
            . # . # .
            . . # . .
            # # # # #
            # . . . #
            `)
    } else {
        basic.showLeds(`
            # # . . .
            . # . . .
            . # . . .
            . # # # #
            # # # . .
            `)
    }
}
let bM1 = false
let bMotorPower = false
radio.beimStart(239)
bMotorPower = false
bM1 = false
zeigeStatus()
loops.everyInterval(400, function () {
	
})

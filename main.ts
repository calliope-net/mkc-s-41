input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    if (!(bM0) && j > 1) {
        j += -1
        o4digit.show(j)
    }
})
input.onButtonEvent(Button.AB, input.buttonEventClick(), function () {
    bM0 = !(bM0)
    zeigeStatus()
})
function zeigeStatus () {
    if (bM0) {
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
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    if (!(bM0) && j < 31) {
        j += 1
        o4digit.show(j)
    }
})
input.onButtonEvent(Button.A, ButtonEvent.Hold, function () {
    bMotorPower = !(bMotorPower)
})
let j = 0
let bM0 = false
let bMotorPower = false
let o4digit: grove.TM1637 = null
radio.beimStart(239)
o4digit = grove.createDisplay(DigitalPin.C16, DigitalPin.C17)
bMotorPower = false
bM0 = true
j = 16
zeigeStatus()
loops.everyInterval(400, function () {
    if (bMotorPower) {
        basic.setLedColor(0x0000ff)
    } else {
        basic.setLedColor(basic.rgb(7, 0, 0))
    }
    if (radio.joystickQwiic()) {
        if (bM0) {
            radio.comment("fahren")
            radio.fill_sendBuffer19()
            radio.setBetriebsart(radio.radio_sendBuffer19(), radio.e0Betriebsart.p0)
            radio.setByte(radio.radio_sendBuffer19(), radio.eBufferPointer.m0, radio.eBufferOffset.b0_Motor, radio.joystickValue(radio.eJoystickValue.xmotor, 4))
            radio.setByte(radio.radio_sendBuffer19(), radio.eBufferPointer.m0, radio.eBufferOffset.b1_Servo, radio.joystickValue(radio.eJoystickValue.servo16, 6, 10))
            radio.setaktiviert(radio.radio_sendBuffer19(), radio.e3aktiviert.m0, bMotorPower)
            radio.setSchalter(radio.radio_sendBuffer19(), radio.e0Schalter.b0, input.buttonIsPressed(Button.B) && !(input.buttonIsPressed(Button.A)))
            radio.sendData(radio.radio_sendBuffer19())
        } else {
            radio.comment("Gabelstapler")
            radio.fill_sendBuffer19()
            radio.setBetriebsart(radio.radio_sendBuffer19(), radio.e0Betriebsart.p0)
            radio.setByte(radio.radio_sendBuffer19(), radio.eBufferPointer.m0, radio.eBufferOffset.b0_Motor, radio.motorProzent(radio.joystickValue(radio.eJoystickValue.xmotor), 50))
            radio.setByte(radio.radio_sendBuffer19(), radio.eBufferPointer.m0, radio.eBufferOffset.b1_Servo, j)
            radio.setaktiviert(radio.radio_sendBuffer19(), radio.e3aktiviert.m0, bMotorPower)
            radio.setByte(radio.radio_sendBuffer19(), radio.eBufferPointer.m1, radio.eBufferOffset.b0_Motor, radio.joystickValue(radio.eJoystickValue.ymotor, 4))
            radio.setaktiviert(radio.radio_sendBuffer19(), radio.e3aktiviert.m1, bMotorPower)
            radio.sendData(radio.radio_sendBuffer19())
        }
    }
    basic.turnRgbLedOff()
})

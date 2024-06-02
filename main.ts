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
    if (bMotorPower) {
        basic.setLedColor(0x0000ff)
    } else {
        basic.setLedColor(basic.rgb(7, 0, 0))
    }
    if (radiosender.joystickQwiic() && !(bM1)) {
        radio.fill_sendBuffer19()
        radio.setBetriebsart(radio.radio_sendBuffer19(), radio.e0Betriebsart.p0)
        radio.setByte(radio.radio_sendBuffer19(), radio.eBufferPointer.p0, radio.eBufferOffset.b0_Motor, radiosender.joystickValues(radiosender.eJoystickValue.motor))
        radio.setByte(radio.radio_sendBuffer19(), radio.eBufferPointer.p0, radio.eBufferOffset.b1_Servo, radiosender.joystickValues(radiosender.eJoystickValue.servo))
        radio.setaktiviert(radio.radio_sendBuffer19(), radio.e3aktiviert.m0, bMotorPower)
        radio.setSchalter(radio.radio_sendBuffer19(), radio.e0Schalter.b0, input.buttonIsPressed(Button.B) && !(input.buttonIsPressed(Button.A)))
        radio.sendData(radio.radio_sendBuffer19())
    } else if (radiosender.joystickQwiic() && bM1) {
        radio.fill_sendBuffer19()
        radio.setBetriebsart(radio.radio_sendBuffer19(), radio.e0Betriebsart.p0)
        radio.setByte(radio.radio_sendBuffer19(), radio.eBufferPointer.p1, radio.eBufferOffset.b0_Motor, radiosender.joystickValues(radiosender.eJoystickValue.motor))
        radio.sendData(radio.radio_sendBuffer19())
    }
    basic.turnRgbLedOff()
})
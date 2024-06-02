//% color=#007F00 icon="\uf0d1" block="Funk Sender" weight=95

namespace radiosender
/*
// groups='["beim Start","Joystick"]'
*/ {
    const i2cqwiicJoystick_x20 = 0x20

    //export const n_Simulator: boolean = ("€".charCodeAt(0) == 8364) // true, wenn der Code im Simulator läuft
    //let n_Buffer19 = Buffer.create(19) // wird gesendet mit radio.sendBuffer
    export let n_x: number, n_y: number, n_xMotor: number, n_yServo: number
    //let n_xmin = 128, n_xmax = 128, n_ymin = 128, n_ymax = 128


    // ========== group="Joystick"


    export enum eJoystickValue {
        //% block="x 0..128..255"
        x,
        //% block="y 0..128..255"
        y,
        //% block="Motor (1 ↓ 128 ↑ 255)"
        motor,
        //% block="Servo (45° ↖ 90° ↗ 135°)"
        servo90,
        //% block="Servo (1 ↖ 16 ↗ 31)"
        servo16
    }


    //% group="Joystick"
    //% block="Joystick Qwiic einlesen" weight=9
    export function joystickQwiic() {
        if (pins.i2cWriteBuffer(i2cqwiicJoystick_x20, Buffer.fromArray([3]), true) != 0)
            return false
        else {
            let bu = pins.i2cReadBuffer(i2cqwiicJoystick_x20, 3)
            n_x = bu.getUint8(0)
            n_y = bu.getUint8(2)
            // Motor
            if (radio.between(n_x, 124, 132))
                n_xMotor = 128
            else if (n_x == 0)
                n_xMotor = 1
            else
                n_xMotor = n_x
            // Servo
            if (radio.between(n_y, 122, 134)) // geradeaus 90°
                n_yServo = 90
            else if (n_y < 20) // Werte < 20 wie 0 behandeln (max links)
                n_yServo = 45
            else if (n_y > 235) // Werte > 235 wie 255 behandeln (max rechts)
                n_yServo = 135
            else
                n_yServo = Math.round(Math.map(n_y, 20, 235, 46, 134))

            /* 
                        if (radio.between(n_y, 122, 134)) n_yServo = 90 // Ruhestellung soll 128 ist auf 128 = 90° anpassen
                        else if (n_y < 20) n_yServo = 135 // Werte < 20 wie 0 behandeln (max links)
                        else if (n_y > 235) n_yServo = 45 // Werte > 235 wie 255 behandeln (max rechts)
                        else n_yServo = Math.map(n_y, 20, 235, 134, 46) // Werte von 32 bis 991 auf 46° bis 134° verteilen
                        n_yServo = Math.round(n_yServo)
                        //n_yservo = Math.round(n_yservo / 3 - 14) // 0=31 90=16 135=1
            */
            return true
        }
    }


    //% group="Joystick"
    //% block="Joystick %pJoystickValue" weight=8
    export function joystickValues(pJoystickValue: eJoystickValue) {
        switch (pJoystickValue) {
            case eJoystickValue.x: return n_x
            case eJoystickValue.y: return n_y
            case eJoystickValue.motor: return n_xMotor
            case eJoystickValue.servo90: return n_yServo // 45°..90°..135°
            //case eJoystickValue.servo16: return Math.round(n_yServo / 3 - 14)// 45°=1 90°=16 135°=31 
            case eJoystickValue.servo16: return Math.idiv(n_yServo, 3) - 14 // Math.round(n_yServo / 3 - 14)// 45°=1 90°=16 135°=31 
            default: return 0
        }
    }

    //export enum eXY { x, y }

    //% group="Joystick"
    //% block="minmaxZeile %pXY" weight=7
    /* export function minmaxZeile(pXY: eXY) {
        switch (pXY) {
            case eXY.x: {
                if (n_x > 0 && n_x < n_xmin) n_xmin = n_x
                else if (n_x < 255 && n_x > n_xmax) n_xmax = n_x
                return format(n_x, 4, eAlign.right) + format(n_xmin, 4, eAlign.right) + format(n_xmax, 4, eAlign.right) + format(n_xMotor, 4, eAlign.right)
            }
            case eXY.y: {
                if (n_y > 0 && n_y < n_ymin) n_ymin = n_y
                else if (n_y < 255 && n_y > n_ymax) n_ymax = n_y
                return format(n_y, 4, eAlign.right) + format(n_ymin, 4, eAlign.right) + format(n_ymax, 4, eAlign.right) + format(n_yServo, 4, eAlign.right)
            }
            default: return ""
        }
    } */


} // car4sender.ts

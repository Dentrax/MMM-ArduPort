#!/usr/bin/env python
# coding: utf-8

import serial

from threading import Thread

class Arduino(object):

    def __init__(self, portname, baudrate):
        self.arduino = serial.Serial(
            port = portname,
            baudrate = baudrate,
            timeout = 5,
            xonxoff = False,
            rtscts = False,
            dsrdtr = False,
            writeTimeout = 2
        )

        Thread.__init__(self)
        #self.lock = threading.Lock()
        #self.running = True

    def open(self, max_attempt = 3):
        attempt = 0

        while attempt < max_attempt:
            try:
                if not self.arduino.isOpen():
                    self.arduino.open()
                if self.arduino.isOpen():
                    self.arduino.flushInput()
                    self.arduino.flushOutput()
                    return True
                if not self.arduino.isOpen():
                    continue
            except Exception as e:
                attempt = attempt + 1
                if attempt == max_attempt:
                    return False

            time.sleep(1)

    def close(self):
        try:
            if self.arduino.isOpen():
                self.arduino.close()
                return True
        except Exception as e:
            return False


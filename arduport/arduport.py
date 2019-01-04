#!/usr/bin/python
# coding: utf8

import os
import sys
import time
import stat
import json
import threading
import datetime
import re

from serial import Serial

def to_node(type, message):
    try:
        print(json.dumps({type: message}))
    except Exception:
        pass

    sys.stdout.flush()

to_node("debug", 'SerialPort shell started...')

connected = False
serialPortName = '/dev/ttyUSB0'
serialBaudRate = 9600

rgxCase = re.compile("^(^[a-zA-Z]*)$")

to_node("debug", 'Waiting ardunio to connect on /dev/ttyUSB0...')

while not connected:
    connected = os.path.exists("/dev/ttyUSB0")
    if connected:
        break
    time.sleep(1)

ser = Serial(
    port = serialPortName,
    baudrate = serialBaudRate,
    timeout = 5,
    xonxoff = False,
    rtscts = False,
    dsrdtr = False,
    writeTimeout = 2
)

def open_port(serial, max_attempt = 3):
  attempt = 0

  while True:
    try:
        if not ser.isOpen():
            ser.open()
        if ser.isOpen():
            ser.flushInput()
            ser.flushOutput()
            return True
        if not ser.isOpen():
            continue
    except Exception as e:
        attempt = attempt + 1
        if attempt == max_attempt:
            return False

    time.sleep(1)


def on_data_received(data):
    case, name, value = data.split(":")

    if rgxCase.match(case):
        to_node(case.lower(), {"name": name, "data": value})

    #to_node("sensor", {"name": "MQ2", "data": str(datetime.datetime.now().time().second)})

def read_from_port(ser):
    while True:
        try:
            connected = ser.isOpen()
            if (connected):
                if (ser.readable() and ser.in_waiting > 0):
                    incoming = ser.read(ser.in_waiting).decode('ascii')
                    on_data_received(incoming)
            else:
                to_node("status", {"name": "connect", "data": "disconnected"})
                return
        except OSError as e:
            connected = False
            to_node("status", {"name": "connect", "data": "disconnected"})
            break

        time.sleep(0.1)

if open_port(ser, 3):
    connected = True
    to_node("status", {"name": "connect", "data": "connected"})

    time.sleep(1)

    thread = threading.Thread(target=read_from_port, args=(ser,))
    thread.start()

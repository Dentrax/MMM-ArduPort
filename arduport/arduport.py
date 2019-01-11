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
import glob
import serial

import arduino


def to_node(type, message):
    try:
        print(json.dumps({type: message}))
    except Exception:
        pass

    sys.stdout.flush()

to_node("debug", 'SerialPort shell started...')

LF = '\n'
CR = '\r'

rgxCase = re.compile("^(^[a-zA-Z]*)$")

to_node("debug", 'Waiting Ardunio to connect on port...')

# https://stackoverflow.com/a/14224477/5685796
def get_serial_ports():
    if sys.platform.startswith('win'):
        ports = ['COM%s' % (i + 1) for i in range(256)]
    elif sys.platform.startswith('linux') or sys.platform.startswith('cygwin'):
        ports = glob.glob('/dev/tty[A-Za-z]*')
    elif sys.platform.startswith('darwin'):
        ports = glob.glob('/dev/tty.*')
    else:
        raise EnvironmentError('Unsupported platform')

    result = []
    for port in ports:
        try:
            s = serial.Serial(port)
            s.close()
            result.append(port)
        except (OSError, serial.SerialException):
            pass
    return result

def start_scanner():
    con_list = {}

    while True:
        # Scan all ports
        ports = get_serial_ports()

        # If a device connected
        if len(ports) > 0:

            # For-Loop in the scanned ports
            for current in ports:

                # New Arduino is connected
                # Register to con_list
                # Returns False because we don't connect yet
                if current not in con_list:
                    con_list[current] = False

                # Arduino is connected
                if current in con_list and con_list[current] == False:
                    con = arduino.Arduino(current, 9600)
                    if con.open(max_attempt = 5):
                        con_list[current] = True
                        to_node("status", {"name": "connect", "data": "connected"})

                # Arduino in con_list, nothing to do
                elif current in con_list and con_list[current] == True:
                    continue


        # Any Arduino connected, set them all False
        # We are not goint to clean the list because we will check if it is connected again
        elif len(con_list) > 0:
            for con in con_list:
                if con_list[con] == True:
                    con_list[con] = False
                    to_node("status", {"name": "connect", "data": "disconnected"})

        time.sleep(1)

scanner = threading.Thread(target = start_scanner)
scanner.start()

def on_data_received(data):
    #Get string between '[' and ']' for safe parsing using Regex
    count = re.search('\[(.*?)\]', data)
    if count:
        res = count.group(1)
        if res:
            case, name, value = res.split(":")

            if rgxCase.match(case):
                to_node(case.lower(), {"name": name, "data": value})

def read_from_port(ser):
    while True:
        try:
            connected = ser.isOpen()
            if (connected):
                if (ser.readable() and ser.in_waiting > 0):
                    incoming = ser.readline(ser.in_waiting).decode('ascii').replace('\r', '').replace('\n', '')
                    on_data_received(incoming)
            else:
                to_node("status", {"name": "connect", "data": "disconnected"})
                return
        except OSError as e:
            connected = False
            to_node("status", {"name": "connect", "data": "disconnected"})
            break

        time.sleep(0.1)


#    thread = threading.Thread(target=read_from_port, args=(ser,))
 #   thread.start()

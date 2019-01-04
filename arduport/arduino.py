#!/usr/bin/env python
# coding: utf-8

from threading import Thread

class Arduino(object):

    def __init__(self, arduino_id = 0):
        Thread.__init__(self)
        self.lock = threading.Lock()
        self.running = True


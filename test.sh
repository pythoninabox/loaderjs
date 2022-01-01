#!/usr/bin/env bash

DIRVENV=nwvenv
status=0 
SERIALPORT=$1
FIRMWARE=$2

if [[ -d $DIRVENV ]]
then
    echo "$DIRVENV exists on your filesystem."
else
    echo "==> CREATING PYTHON VIRTUAL ENV"
    status=1
    python3 -m venv nwvenv
fi
source nwvenv/bin/activate

if [ $status -eq 1 ]
then
    echo "==> INSTALLING DEPENDENCIES"
    pip install --upgrade pip 
    pip install --upgrade esptool
fi
#python3 -c "from datetime import date; print('today is', date.today())"
#python3 -c "import sys; print('executable:', sys.executable)"
#which esptool.py
echo "==> ERASING FLASH" 
esptool.py --chip esp32 --port $SERIALPORT erase_flash
echo "==> UPDATING FLASH"
esptool.py --chip esp32 --port $SERIALPORT --baud 460800 write_flash -z 0x1000 $FIRMWARE
echo "==> DONE"

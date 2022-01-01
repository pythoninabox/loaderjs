#!/usr/bin/env bash

DIRVENV=nwvenv
status=0 

if [[ -d $DIRVENV ]]
then
    echo "$DIRVENV exists on your filesystem."
else
    echo "==> CREATING PYTHON VIRTUAL ENV"
    status=1
    python3 -m venv nwvenv
fi
echo "==> GO FORWARD"
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
sleep 2
echo "==> UPDATING FLASH"
sleep 2
echo "==> DONE"

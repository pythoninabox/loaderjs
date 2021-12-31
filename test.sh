#!/usr/bin/env bash

echo "==> VERIFYNG PYTHON VIRTUAL ENV"
if [[ -d nwvenv ]]
then
    echo "nwvenv exists on your filesystem."
else
    echo "creating nwvenv"
    python3 -m venv nwvenv
fi
echo "==> GO FORWARD"
source nwvenv/bin/activate
pip install --upgrade pip 
pip install --upgrade esptool
python3 -c "from datetime import date; print('today is', date.today())"
python3 -c "import sys; print('executable:', sys.executable)"
which esptool.py 

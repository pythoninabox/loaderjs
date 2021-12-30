// loading on esp32

/*
    1.  installing components: esptool, pyserial
    2.  erasing flash with esptool.py
    3.  updating flash with esptool.py

    shell commands:

    python3.9 -m venv venv
    source venv/bin/activate
    cd venv
    pip install esptool
*/

module.exports = {
    PYTHON: 'python3',
    VENV: ['-m', 'venv', 'venv'],
    ESPTOOL: 'sleep',
    ERASE_ARGS: ['2'],
    UPDATE_ARGS: ['4']
        //"python3.9", ['-m', 'venv', 'venv']
}
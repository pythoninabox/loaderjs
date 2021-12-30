const win = nw.Window.get()
const { spawn } = require('child_process')
const py = global.pyloader

win.width = 600
win.height = 480

let serial_ports = []

const data = {
    firmwarePath: null,
    serialPath: null
}

const button_uploading = `
<div class='col-4 text-center'>
    <button class="btn btn-primary" type="button" disabled>
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        Loading...
    </button>
</div>`

const button_pre_upload = `
<div class='col-4 text-center'>
    <button id="upload_but" type="button" class="btn btn-primary disabled">
        Upload
    </button>
</div>`

const enable_loader_button = () => {
    $("#upload_but")
}

$('#mainbutton').click(event => {
    serial_ports = []
    chrome.serial.getDevices((ports) => {
        ports.forEach(p => {
            if (p.displayName)
                serial_ports.push(p)
        })
    })
})

$('#logports').click(event => {
    console.log(serial_ports)
})


$('#upload_but').click((o) => {
    $("#asveduma").empty()
    $("#asveduma").append(button_uploading)

    //const child = spawn(py.ESPTOOL, py.ERASE_ARGS)
    const child = spawn("pip3.9", ['install', '--upgrade', 'pip'])
    child.on('exit', (code, signal) => {
        console.log('child process exited with ' +
            `code ${code} and signal ${signal}`)
    })

    child.stdout.on('data', (data) => {
        console.log(`child stdout:\n${data}`)
    })
})

$('#serial_port_button').click(o => {
    flashop()
    $('#model-items').empty()
    const list_group = $("#model-items").append(`<ul class="list-group"></ul>`)

    chrome.serial.getDevices((ports) => {
        let index = 0
        ports.forEach((p) => {
            console.log(p)
            if (p.displayName) {
                serial_ports.push(p)

                list_group.append(`
                    <li class="list-group-item">
                    <button type="button" data-bs-dismiss="modal" class="btn btn-primary" onclick="serial_activate(${index})">
                        ${p.path} 
                    </button>
                    </li>
                `)
                index++
            }
        })
        if (!serial_ports.length) {
            list_group.append(`
                    <li class="list-group-item"> 
                        <p class='fw-bolder'>No Devices Available</p> 
                        <p>please connect a device</p>  
                    </li>
                `)
        }
    })
})

$('#firmware_path').change(() => {
    const filepath = document.getElementById('firmware_path').value
    data.firmwarePath = filepath
    console.log("calling check")
    check_all_data()
})

const serial_activate = (n) => {
    const index = parseInt(n)
    console.log(`choosed port num ${index}`)
    console.log("lista seriali:", serial_ports[0])
    data.serialPath = serial_ports[index].path
    console.log("appena popolato:", data.serialPath)
}

const check_all_data = () => {
    console.log("checked")
    console.log(serial_ports)
    if (data.serialPath && data.firmwarePath) {
        const but = $('#upload_but') //document.getElementById('upload_but') 
        but.removeAttr('disabled')
        but.attr('enabled', '')
        console.log(but[0])
    }
}

const flashop = () => {
    const child = spawn("python3.9", ['-m', 'venv', 'venv'])

    const message = $('#message')
    message.text("creating python env...")

    child.on('exit', (code, signal) => {
        if (code == 0) {
            const child2 = spawn('venv/bin/pip', ['install', 'esptool'])
            message.text("install esptool...")

            child2.on('exit', (code2, signal2) => {
                if (code2 == 0) {

                    const child3 = spawn('venv/bin/python', ['-m', 'esptool', '-h'])
                    message.text("erasing flash...")
                    console.log("DONE")
                }
            })
        }
    })
}
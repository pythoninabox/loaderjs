const win = nw.Window.get()
const { spawn } = require('child_process')

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

    const child = spawn('sleep', ['2'])

    console.log(child)

    child.on('exit', (code, signal) => {
        console.log('child process exited with ' +
            `code ${code} and signal ${signal}`)
    })

    child.stdout.on('data', (data) => {
        console.log(`child stdout:\n${data}`)
    })
})

$('#serial_port_button').click(o => {

    $('#model-items').empty()
    const list_group = $("#model-items").append(`<ul class="list-group"></ul>`)

    chrome.serial.getDevices((ports) => {
        ports.forEach((p, index) => {
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
    console.log($(this))
    const filepath = document.getElementById('firmware_path').value
    data.firmwarePath = filepath
})

const serial_activate = (n) => {
    const index = parseInt(n)
    console.log(`choosed port num ${index}`)
    data.serialPath = serial_ports[index]
}
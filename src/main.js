let serial_ports = []
    //const os = require('os')

//var fileinput = $('#button-addon1')
//var path = fileinput.value

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
})
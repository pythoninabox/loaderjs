const win = nw.Window.get();
const { spawn } = require("child_process");
const py = global.pyloader;
const helpwindow = global.helpwindow;

win.width = 800;
win.height = 600;
win.setResizable(false);

var your_menu = new nw.Menu({ type: "menubar" });
var submenu = new nw.Menu();
submenu.append(new nw.MenuItem({ label: "Item A" }));
submenu.append(new nw.MenuItem({ label: "Item B" }));

// the menu item appended should have a submenu
your_menu.append(
    new nw.MenuItem({
        label: "Help",
        submenu: submenu,
    })
);

win.menu = your_menu;

let serial_ports = [];

const data = {
    firmwarePath: null,
    serialPath: null,
};

const button_uploading = `
<div class='col-4 text-center'>
    <button class="btn btn-primary" type="button" disabled>
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        Loading...
    </button>
</div>`;

const button_pre_upload = `
<div class='col-4 text-center'>
    <button id="upload_but" type="button" class="btn btn-primary disabled">
        Upload
    </button>
</div>`;

const enable_loader_button = () => {
    $("#upload_but");
};

$("#mainbutton").click((event) => {
    serial_ports = [];
    chrome.serial.getDevices((ports) => {
        ports.forEach((p) => {
            if (p.displayName) serial_ports.push(p);
        });
    });
});

$("#logports").click((event) => {
    console.log(serial_ports);
});

$("#upload_but").click((o) => {
    $("#asveduma").empty();
    $("#asveduma").append(button_uploading);

    //const child = spawn(py.ESPTOOL, py.ERASE_ARGS)
    const child = spawn("pip3.9", ["install", "--upgrade", "pip"]);
    child.on("exit", (code, signal) => {
        console.log(
            "child process exited with " + `code ${code} and signal ${signal}`
        );
    });

    child.stdout.on("data", (data) => {
        console.log(`child stdout:\n${data}`);
    });
});

$("#serial_port_button").click((o) => {
    //helpwindow.create_help();
    flashop();
    /*
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
                            <p class='fw-bolder'>No Device Available</p> 
                            <p>please connect one</p>  
                        </li>
                    `)
            }
        })
        */
});

$("#firmware_path").change(() => {
    const filepath = document.getElementById("firmware_path").value;
    data.firmwarePath = filepath;
    console.log("calling check");
    check_all_data();
});

const serial_activate = (n) => {
    const index = parseInt(n);
    console.log(`choosed port num ${index}`);
    console.log("lista seriali:", serial_ports[0]);
    data.serialPath = serial_ports[index].path;
    console.log("appena popolato:", data.serialPath);
};

const check_all_data = () => {
    console.log("checked");
    console.log(serial_ports);
    if (data.serialPath && data.firmwarePath) {
        const but = $("#upload_but"); //document.getElementById('upload_but')
        but.removeAttr("disabled");
        but.attr("enabled", "");
        console.log(but[0]);
    }
};

const flashop = () => {
    const re = /^==>/;

    const child = spawn("./test.sh");
    const message = $("#message");

    child.stdout.on("data", (data) => {
        console.log(`${data}`);
        const d = `${data}`;
        if (re.test(d)) message.text(d);
    });

    child.on("exit", (code, signal) => {
        console.log(
            "child process exited with " + `code ${code} and signal ${signal}`
        );
    });
};

/*
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
*/

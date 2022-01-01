exports.create_help = () => {
    nw.Window.open("help.html", {}, function (new_win) {
        // And listen to new window's focus event
        new_win.on("focus", () => {
            console.log("New window is focused");
        });

        new_win.width = 200;
        new_win.height = 200;
        new_win.moveBy(200, 200);
    });
};

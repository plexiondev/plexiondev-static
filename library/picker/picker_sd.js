// Picker


// reading images
function urlToPromise(url) {
    return new Promise(function(resolve, reject) {
        JSZipUtils.getBinaryContent(url, function (err, data) {
            if(err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

function compile() {
    // init
    var zip = new JSZip();

    // grab version
    var version = $('#version').val();

    // generate folders
    var gui = zip.folder("assets/minecraft/textures/gui");

    // pack.mcmeta
    zip.file("pack.mcmeta", `{\n"pack": {\n"description": "A custom dark theme        \u00A7bplexion.dev",\n"pack_format": ${version}\n}\n}`);
    // pack.png
    zip.file("pack.png", urlToPromise("pack.png"), {binary: true, compression: "DEFLATE"});


    // Classic Hotbar
    if (document.body.classList.contains("classichotbar")) {
        gui.file("widgets.png", urlToPromise("classichotbar.png"), {binary: true, compression: "DEFLATE"});
    }
    // Hearts
    if (document.body.classList.contains("hearts")) {
        gui.file("icons.png", urlToPromise("hearts.png"), {binary: true, compression: "DEFLATE"});
    } else if (document.body.classList.contains("nohearts")) { // No Hearts
        gui.file("icons.png", urlToPromise("nohearts.png"), {binary: true, compression: "DEFLATE"});
    }
    // No Recipe Book
    if (document.body.classList.contains("nobook")) {
        gui.file("recipe_button.png", urlToPromise("nobook.png"), {binary: true, compression: "DEFLATE"});
    }


    // save as file
    zip.generateAsync({type:"blob"})
    .then(function(content) {
        saveAs(content, "Simple-Dark-Custom.zip");
    });
}